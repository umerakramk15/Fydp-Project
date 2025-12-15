import express from "express";
import {
  registerAsSeller,
  getSellerDashboard,
  updateSellerProfile,
  getSellerProducts,
} from "../controllers/sellerController.js";
import {
  createStore,
  getSellerStores,
  getStoreById,
  updateStore,
  deleteStore,
} from "../controllers/storeController.js";
import productController from "../controllers/productController.js";
import { isLoggedIn, isSeller } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

// Seller registration & profile
router.post("/register", isLoggedIn, registerAsSeller);
router.get("/dashboard", isLoggedIn, isSeller, getSellerDashboard);
router.put("/profile", isLoggedIn, isSeller, updateSellerProfile);

// Store management
router.post(
  "/stores",
  isLoggedIn,
  isSeller,
  upload.single("logo"),
  createStore
);
router.get("/stores", isLoggedIn, isSeller, getSellerStores);
router.get("/stores/:id", isLoggedIn, isSeller, getStoreById);
router.put(
  "/stores/:id",
  isLoggedIn,
  isSeller,
  upload.single("logo"),
  updateStore
);
router.delete("/stores/:id", isLoggedIn, isSeller, deleteStore);

// Product management
router.get(
  "/products",
  isLoggedIn,
  isSeller,
  productController.getSellerProducts
);
router.post(
  "/products",
  isLoggedIn,
  isSeller,
  upload.array("images", 10),
  productController.createSellerProduct
);
router.put(
  "/products/bulk-status",
  isLoggedIn,
  isSeller,
  productController.bulkUpdateProducts
);

export default router;
