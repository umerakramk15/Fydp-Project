import express from "express";
import orderController from "../controllers/orderController.js";
import {
  isLoggedIn,
  isBuyer,
  isSeller,
  isAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Buyer routes
router.post("/", isLoggedIn, isBuyer, orderController.createOrder);
router.get("/my-orders", isLoggedIn, isBuyer, orderController.getUserOrders);
router.get("/:id", isLoggedIn, orderController.getOrderById);
router.put("/:id/cancel", isLoggedIn, isBuyer, orderController.cancelOrder);

// Seller routes
router.get(
  "/seller/orders",
  isLoggedIn,
  isSeller,
  orderController.getSellerOrders
);
router.put(
  "/seller/orders/:id/status",
  isLoggedIn,
  isSeller,
  orderController.updateOrderStatus
);

// Admin routes
router.get("/admin/all", isLoggedIn, isAdmin, orderController.getAllOrders);
router.put(
  "/admin/orders/:id/status",
  isLoggedIn,
  isAdmin,
  orderController.updateOrderStatus
);

export default router;
