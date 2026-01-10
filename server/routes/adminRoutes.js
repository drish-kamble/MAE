import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/authMiddleware.js";
import Order from "../models/Order.js";
import Quote from "../models/Quote.js";

const router = express.Router();

// GET ALL ORDERS
router.get("/orders", protect, adminOnly, async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// GET ALL QUOTES
router.get("/quotes", protect, adminOnly, async (req, res) => {
  const quotes = await Quote.find().sort({ createdAt: -1 });
  res.json(quotes);
});

export default router;
