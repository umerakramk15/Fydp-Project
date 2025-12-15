import Cart from "../models/AddToCartModel.js";
import Product from "../models/productModel.js";

const cartController = {
  async addItemToCart(req, res) {
    try {
      const { productId, quantity = 1 } = req.body;
      const userId = req.user.id;

      if (!productId) {
        return res.status(400).json({
          success: false,
          message: "Product ID is required",
        });
      }

      // Find or create cart for user
      let cart = await Cart.findOne({ user: userId });

      // Check product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      if (!cart) {
        // Create new cart
        cart = new Cart({
          user: userId,
          items: [
            {
              productId: productId,
              quantity: quantity,
              price: product.price,
              total: product.price * quantity,
            },
          ],
          subTotal: product.price * quantity,
        });
      } else {
        // Check if product already in cart
        const itemIndex = cart.items.findIndex(
          (item) => item.productId.toString() === productId
        );

        if (itemIndex > -1) {
          // Update existing item
          cart.items[itemIndex].quantity += quantity;
          cart.items[itemIndex].total =
            cart.items[itemIndex].quantity * product.price;
        } else {
          // Add new item
          cart.items.push({
            productId: productId,
            quantity: quantity,
            price: product.price,
            total: product.price * quantity,
          });
        }

        // Recalculate subtotal
        cart.subTotal = cart.items.reduce((sum, item) => sum + item.total, 0);
      }

      await cart.save();

      // Populate product details
      await cart.populate("items.productId", "name price images");

      res.status(200).json({
        success: true,
        message: "Item added to cart",
        data: cart,
      });
    } catch (error) {
      console.error("Add to cart error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  },

  async getCart(req, res) {
    try {
      const userId = req.user.id;

      const cart = await Cart.findOne({ user: userId }).populate(
        "items.productId",
        "name price images stock"
      );

      if (!cart) {
        return res.status(200).json({
          success: true,
          message: "Cart is empty",
          data: {
            items: [],
            subTotal: 0,
          },
        });
      }

      res.status(200).json({
        success: true,
        data: cart,
      });
    } catch (error) {
      console.error("Get cart error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  },

  async emptyCart(req, res) {
    try {
      const userId = req.user.id;

      const cart = await Cart.findOne({ user: userId });

      if (cart) {
        cart.items = [];
        cart.subTotal = 0;
        await cart.save();
      }

      res.status(200).json({
        success: true,
        message: "Cart emptied successfully",
      });
    } catch (error) {
      console.error("Empty cart error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  },
};

export default cartController;
