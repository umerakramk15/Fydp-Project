import { Router } from "express";
const router = Router();
import productController from "../controllers/productController.js";
import validateProduct from "../middlewares/validateProduct.js";
import {
  isLoggedIn,
  isAdmin,
  isSeller,
  isSellerOrAdmin,
} from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

// ===== PUBLIC ROUTES (No authentication required) =====

// Get all published products (public)
router.get("/public", productController.getAllProducts);

// Get published products by store (public)
router.get("/store/:storeSlug", productController.getProductsByStore);

// Get single product by ID or slug (public)
router.get("/:id", productController.getProductById);

// Get published products (public)
router.get("/published/all", productController.getPublishedProduct);

// ===== PROTECTED ROUTES (Authentication required) =====

// Get all products with filters (protected - for logged in users)
router.get("/", isLoggedIn, productController.getAllProducts);

// Get total products by category
router.get(
  "/stats/total-by-category",
  isLoggedIn,
  productController.getTotalProductByCategory
);

// ===== ADMIN ROUTES =====

// Admin creates product (can assign to any seller/store)
router.post(
  "/admin/create",
  isLoggedIn,
  isAdmin,
  upload.array("images", 10),
  productController.createProduct
);

// Admin updates any product
router.put("/admin/:id", isLoggedIn, isAdmin, productController.updateProduct);

// Admin deletes any product
router.delete(
  "/admin/:id",
  isLoggedIn,
  isAdmin,
  productController.deleteProduct
);

// ===== SELLER ROUTES =====

// Seller creates product in their own store
router.post(
  "/seller/create",
  isLoggedIn,
  isSeller,
  upload.array("images", 10),
  productController.createSellerProduct
);

// Seller gets their own products
router.get(
  "/seller/my-products",
  isLoggedIn,
  isSeller,
  productController.getSellerProducts
);

// Seller updates their own product
router.put(
  "/seller/:id",
  isLoggedIn,
  isSeller,
  productController.updateProduct
);

// Seller deletes their own product (soft delete)
router.delete(
  "/seller/:id",
  isLoggedIn,
  isSeller,
  productController.deleteProduct
);

// Seller bulk update product status
router.put(
  "/seller/bulk/status",
  isLoggedIn,
  isSeller,
  productController.bulkUpdateProducts
);

// ===== COMMON ROUTES (Admin or Seller) =====

// Update product (works for both admin and seller based on ownership)
router.put("/:id", isLoggedIn, productController.updateProduct);

// Delete product (works for both admin and seller based on ownership)
router.delete("/:id", isLoggedIn, productController.deleteProduct);

export default router;
