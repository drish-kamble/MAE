import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Quote from "../models/Quote.js";
import User from "../models/User.js";

const router = express.Router();

/* ===========================================================
   DASHBOARD
=========================================================== */

router.get("/dashboard", protect, adminOnly, async (req, res) => {
  try {
    const [
      totalProducts,
      totalOrders,
      totalQuotes,
      totalCustomers,
      recentOrders,
      recentQuotes,
    ] = await Promise.all([
      Product.countDocuments(),

      Order.countDocuments(),

      Quote.countDocuments(),

      User.countDocuments({
        role: "customer",
      }),

      Order.find()
        .sort({ createdAt: -1 })
        .limit(5),

      Quote.find()
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    res.status(200).json({
      success: true,

      stats: {
        products: totalProducts,
        orders: totalOrders,
        quotes: totalQuotes,
        customers: totalCustomers,
      },

      recentOrders,
      recentQuotes,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard data.",
    });
  }
});

/* ===========================================================
   ORDERS
=========================================================== */

router.get("/orders", protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Orders Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders.",
    });
  }
});

/* ===========================================================
   QUOTES
=========================================================== */

router.get("/quotes", protect, adminOnly, async (req, res) => {
  try {
    const quotes = await Quote.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      quotes,
    });
  } catch (error) {
    console.error("Quotes Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch quotes.",
    });
  }
});

export default router;