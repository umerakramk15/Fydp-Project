import express from "express";
import {
  userRegisterController,
  userLoginController,
  userLogoutControllers,
  requestResetController,
  verifyCodeController,
  changePasswordController,
  getCurrentUser,
  updateUserProfile
} from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", userRegisterController);
router.post("/login", userLoginController);
router.post("/logout", userLogoutControllers);
router.post("/request-reset", requestResetController);
router.post("/verify-code", verifyCodeController);
router.post("/change-password", changePasswordController);

// Protected routes
router.get("/me", isLoggedIn, getCurrentUser);
router.put("/profile", isLoggedIn, updateUserProfile);

export default router;