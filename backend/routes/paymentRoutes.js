import express from "express";
import { isLoggedIn, isBuyer, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Placeholder routes - will be implemented with real payment gateway
router.post("/initiate", isLoggedIn, isBuyer, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Payment system will be integrated in production",
    note: "Currently only COD is available. Payment gateway integration will be added before launch.",
  });
});

router.post("/webhook", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Payment webhook endpoint ready",
  });
});

router.get("/methods", (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      methods: [
        {
          id: "cod",
          name: "Cash on Delivery",
          description: "Pay when you receive the product",
          available: true,
        },
        {
          id: "card",
          name: "Credit/Debit Card",
          description: "Pay securely with your card",
          available: false,
          comingSoon: true,
        },
        {
          id: "upi",
          name: "UPI",
          description: "Instant UPI payment",
          available: false,
          comingSoon: true,
        },
      ],
    },
  });
});

export default router;
