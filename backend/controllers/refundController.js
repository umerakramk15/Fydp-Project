import Order from "../models/orderModel.js";

const refundController = {
  async requestRefund(req, res) {
    try {
      const { orderId, reason } = req.body;
      const userId = req.user.id;

      const order = await Order.findById(orderId);
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

      // Check if order can be refunded
      if (!["delivered", "paid"].includes(order.status)) {
        return res.status(400).json({
          success: false,
          message: `Order in ${order.status} status cannot be refunded`,
        });
      }

      // Check if within refund period (30 days)
      const deliveredDate = order.deliveredAt || order.updatedAt;
      const daysSinceDelivery = Math.floor(
        (new Date() - new Date(deliveredDate)) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceDelivery > 30) {
        return res.status(400).json({
          success: false,
          message: "Refund period (30 days) has expired",
        });
      }

      // Mark refund as requested
      order.refundStatus = "requested";
      order.refundReason = reason;
      await order.save();

      res.status(200).json({
        success: true,
        message: "Refund request submitted",
        data: {
          orderId: order._id,
          orderNumber: order.orderNumber,
          refundStatus: "requested",
          note: "Admin will process your refund within 3-5 business days",
        },
      });
    } catch (error) {
      console.error("Refund request error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  },

  async processRefund(req, res) {
    try {
      const { orderId } = req.params;
      const { refundAmount, notes } = req.body;

      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      // Process refund logic
      order.refundStatus = "processed";
      order.refundAmount = refundAmount || order.total;
      order.refundNotes = notes;
      order.refundProcessedAt = new Date();
      order.refundProcessedBy = req.user.id;

      await order.save();

      res.status(200).json({
        success: true,
        message: "Refund processed successfully",
        data: {
          orderId: order._id,
          orderNumber: order.orderNumber,
          refundAmount: order.refundAmount,
          refundStatus: "processed",
          processedAt: order.refundProcessedAt,
        },
      });
    } catch (error) {
      console.error("Process refund error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  },

  async getRefundRequests(req, res) {
    try {
      const { status, page = 1, limit = 20 } = req.query;

      const filter = { refundStatus: "requested" };
      if (status) filter.refundStatus = status;

      const skip = (page - 1) * limit;

      const refunds = await Order.find(filter)
        .populate("user", "firstName lastName email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const totalRefunds = await Order.countDocuments(filter);

      res.status(200).json({
        success: true,
        data: refunds,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalRefunds / limit),
          totalRefunds,
        },
      });
    } catch (error) {
      console.error("Get refunds error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  },
};

export default refundController;
