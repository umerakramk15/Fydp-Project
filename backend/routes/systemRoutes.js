import express from "express";
import systemController from "../controllers/systemController.js";

const router = express.Router();

router.get("/health", systemController.getSystemStatus);
router.get("/endpoints", systemController.getApiEndpoints);

export default router;
