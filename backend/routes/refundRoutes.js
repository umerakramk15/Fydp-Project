import express from "express";
import refundController from "../controllers/refundController.js";
import { isLoggedIn, isBuyer, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// User requests refund
router.post("/request", isLoggedIn, isBuyer, refundController.requestRefund);

// Admin manages refunds
router.get(
  "/admin/requests",
  isLoggedIn,
  isAdmin,
  refundController.getRefundRequests
);
router.post(
  "/admin/process/:orderId",
  isLoggedIn,
  isAdmin,
  refundController.processRefund
);

export default router;
