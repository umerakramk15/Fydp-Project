import Order from "../models/orderModel.js";
import Cart from "../models/AddToCartModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

const orderController = {
  // Create order from cart
  async createOrder(req, res) {
    try {
      const userId = req.user.id;
      const { shippingAddress, billingAddress, paymentMethod, notes } =
        req.body;

      // Validate required fields
      if (!shippingAddress) {
        return res.status(400).json({
          success: false,
          message: "Shipping address is required",
        });
      }

      if (!paymentMethod) {
        return res.status(400).json({
          success: false,
          message: "Payment method is required",
        });
      }

      // 1. Get user's cart
      const cart = await Cart.findOne({ user: userId }).populate(
        "items.productId",
        "name price stock seller store images"
      );

      if (!cart || cart.items.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Cart is empty",
        });
      }

      // 2. Validate stock and prepare order items
      const orderItems = [];
      let subtotal = 0;

      for (const cartItem of cart.items) {
        const product = cartItem.productId;

        if (!product) {
          return res.status(400).json({
            success: false,
            message: "Product not found",
          });
        }

        // Check stock
        if (product.stock < cartItem.quantity) {
          return res.status(400).json({
            success: false,
            message: `Product "${product.name}" has only ${product.stock} items in stock`,
          });
        }

        const itemTotal = product.price * cartItem.quantity;
        subtotal += itemTotal;

        orderItems.push({
          product: product._id,
          quantity: cartItem.quantity,
          price: product.price,
          total: itemTotal,
          seller: product.seller,
          store: product.store,
        });
      }

      // 3. Calculate totals
      const shipping = subtotal > 50 ? 0 : 5.99;
      const tax = subtotal * 0.08;
      const total = subtotal + shipping + tax;

      // 4. Calculate commission and earnings
      const commissionRate = 10;
      const commissionAmount = (subtotal * commissionRate) / 100;
      const sellerEarnings = subtotal - commissionAmount;

      // 5. Generate order number
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");

      // Count today's orders
      const todayStart = new Date(
        year,
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
        0
      );
      const todayEnd = new Date(
        year,
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59,
        999
      );

      const orderCount = await Order.countDocuments({
        createdAt: { $gte: todayStart, $lte: todayEnd },
      });

      const orderNumber = `ORD-${year}${month}${day}-${String(
        orderCount + 1
      ).padStart(4, "0")}`;

      // 6. Create order
      const order = new Order({
        orderNumber,
        user: userId,
        items: orderItems,
        subtotal,
        shipping,
        tax,
        total,
        shippingAddress,
        billingAddress: billingAddress || shippingAddress,
        paymentMethod,
        paymentStatus: paymentMethod === "cod" ? "pending" : "pending",
        notes: notes || "",
        commissionRate,
        commissionAmount,
        sellerEarnings,
      });

      // After creating order, for COD:
      if (paymentMethod === "cod") {
        order.paymentStatus = "pending";
        order.paymentGateway = "cod";

        // Send order confirmation (will implement email later)
        console.log(`COD order created: ${order.orderNumber}`);
      }

      // 7. Reserve stock (deduct from inventory)
      for (const item of orderItems) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity },
        });
      }

      // 8. Save order
      await order.save();

      // 9. Clear cart
      await Cart.findOneAndDelete({ user: userId });

      // 10. Get populated order
      const populatedOrder = await Order.findById(order._id)
        .populate("user", "firstName lastName email")
        .populate("items.product", "name price images")
        .populate("items.seller", "firstName lastName email");

      res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: populatedOrder,
      });
    } catch (error) {
      console.error("Create order error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  },
  // Get user's orders
  async getUserOrders(req, res) {
    try {
      const userId = req.user.id;
      const { page = 1, limit = 10, status } = req.query;

      const filter = { user: userId };
      if (status) filter.status = status;

      const skip = (page - 1) * limit;

      const orders = await Order.find(filter)
        .populate("items.product", "name price images")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const totalOrders = await Order.countDocuments(filter);

      res.status(200).json({
        success: true,
        data: orders,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalOrders / limit),
          totalOrders,
        },
      });
    } catch (error) {
      console.error("Get user orders error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  },

  // Get order by ID
  async getOrderById(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const order = await Order.findById(id)
        .populate("user", "firstName lastName email phone")
        .populate("items.product", "name price images description")
        .populate("items.seller", "firstName lastName email")
        .populate("items.store", "name slug logo");

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      // Check authorization (user, seller, or admin)
      const isOwner = order.user._id.toString() === userId;
      const isSeller = order.items.some(
        (item) => item.seller._id.toString() === userId
      );
      const isAdmin = req.user.role === "admin";

      if (!isOwner && !isSeller && !isAdmin) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }

      res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error) {
      console.error("Get order error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  },

  // Update order status (admin/seller)
  async updateOrderStatus(req, res) {
    try {
      const { id } = req.params;
      const { status, notes } = req.body;
      const userId = req.user.id;
      const userRole = req.user.role;

      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      // Authorization check
      const isAdmin = userRole === "admin";
      const isSeller = order.items.some(
        (item) => item.seller.toString() === userId
      );

      if (!isAdmin && !isSeller) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }

      // Update status
      order.status = status;
      if (notes) order.notes = notes;

      // Set timestamps based on status
      const now = new Date();
      if (status === "shipped" && !order.shippedAt) {
        order.shippedAt = now;
      } else if (status === "delivered" && !order.deliveredAt) {
        order.deliveredAt = now;
      } else if (status === "cancelled" && !order.cancelledAt) {
        order.cancelledAt = now;

        // Restore stock if cancelled
        for (const item of order.items) {
          await Product.findByIdAndUpdate(item.product, {
            $inc: { stock: item.quantity },
          });
        }
      }

      await order.save();

      res.status(200).json({
        success: true,
        message: `Order status updated to ${status}`,
        data: order,
      });
    } catch (error) {
      console.error("Update order error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  },

  // Get seller's orders
  async getSellerOrders(req, res) {
    try {
      const sellerId = req.user.id;
      const { page = 1, limit = 10, status } = req.query;

      // Find orders where seller has items
      const filter = { "items.seller": sellerId };
      if (status) filter.status = status;

      const skip = (page - 1) * limit;

      const orders = await Order.find(filter)
        .populate("user", "firstName lastName email")
        .populate("items.product", "name price images")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const totalOrders = await Order.countDocuments(filter);

      res.status(200).json({
        success: true,
        data: orders,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalOrders / limit),
          totalOrders,
        },
      });
    } catch (error) {
      console.error("Get seller orders error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  },

  // Get all orders (admin)
  async getAllOrders(req, res) {
    try {
      const {
        page = 1,
        limit = 20,
        status,
        sellerId,
        startDate,
        endDate,
      } = req.query;

      const filter = {};
      if (status) filter.status = status;
      if (sellerId) filter["items.seller"] = sellerId;

      // Date filter
      if (startDate || endDate) {
        filter.createdAt = {};
        if (startDate) filter.createdAt.$gte = new Date(startDate);
        if (endDate) filter.createdAt.$lte = new Date(endDate);
      }

      const skip = (page - 1) * limit;

      const orders = await Order.find(filter)
        .populate("user", "firstName lastName email")
        .populate("items.product", "name price")
        .populate("items.seller", "firstName lastName email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const totalOrders = await Order.countDocuments(filter);

      // Calculate stats
      const stats = await Order.aggregate([
        { $match: filter },
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            totalRevenue: { $sum: "$total" },
            totalCommission: { $sum: "$commissionAmount" },
          },
        },
      ]);

      res.status(200).json({
        success: true,
        data: orders,
        stats: stats[0] || {
          totalOrders: 0,
          totalRevenue: 0,
          totalCommission: 0,
        },
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalOrders / limit),
          totalOrders,
        },
      });
    } catch (error) {
      console.error("Get all orders error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  },

  // Cancel order (user)
  async cancelOrder(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const { reason } = req.body;

      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      // Check if user owns the order
      if (order.user.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }

      // Check if order can be cancelled
      if (!["pending", "confirmed"].includes(order.status)) {
        return res.status(400).json({
          success: false,
          message: `Order cannot be cancelled in ${order.status} status`,
        });
      }

      // Update order
      order.status = "cancelled";
      order.cancellationReason = reason;
      order.cancelledAt = new Date();

      // Restore stock
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: item.quantity },
        });
      }

      await order.save();

      res.status(200).json({
        success: true,
        message: "Order cancelled successfully",
        data: order,
      });
    } catch (error) {
      console.error("Cancel order error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  },
};

export default orderController;
