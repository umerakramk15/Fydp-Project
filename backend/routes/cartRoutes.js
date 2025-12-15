import { Router } from "express";
const router = Router();
import cartController from "../controllers/cartController.js";
import { isLoggedIn, isBuyer } from "../middlewares/authMiddleware.js";

// Note: Changed isUser to isBuyer for clarity
router.post("/", isLoggedIn, isBuyer, cartController.addItemToCart);
router.get("/", isLoggedIn, isBuyer, cartController.getCart);
router.delete("/empty-cart", isLoggedIn, isBuyer, cartController.emptyCart);

export default router;
