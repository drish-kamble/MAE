import express from "express";
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  getOrderById,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE ORDER
router.post("/", protect, createOrder);

// 👈 FIX: SPECIFIC ROUTES FIRST
router.get("/my", protect, getMyOrders);

// 👈 THEN dynamic route
router.get("/:id", protect, getOrderById);

// ADMIN
router.get("/", protect, getAllOrders);

export default router;
