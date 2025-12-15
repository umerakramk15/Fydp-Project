import express from "express";
import { isLoggedIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  getAllSellers,
  getSellerById,
  updateSellerStatus,
  getAllStores,
  updateStoreStatus,
  getPlatformStats,
  getAllUsers,
  updateUserRole,
} from "../controllers/adminController.js";

const router = express.Router();

// User management
router.get("/users", isLoggedIn, isAdmin, getAllUsers);
router.put("/users/:id/role", isLoggedIn, isAdmin, updateUserRole);

// Seller management
router.get("/sellers", isLoggedIn, isAdmin, getAllSellers);
router.get("/sellers/:id", isLoggedIn, isAdmin, getSellerById);
router.put("/sellers/:id/status", isLoggedIn, isAdmin, updateSellerStatus);

// Store management
router.get("/stores", isLoggedIn, isAdmin, getAllStores);
router.put("/stores/:id/status", isLoggedIn, isAdmin, updateStoreStatus);

// Platform analytics
router.get("/stats", isLoggedIn, isAdmin, getPlatformStats);

export default router;
