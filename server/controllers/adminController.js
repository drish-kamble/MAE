import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Quote from "../models/Quote.js";
import User from "../models/User.js";

export const getDashboard = async (req, res) => {
  try {

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const [
      products,
      orders,
      quotes,
      customers,
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

    res.json({
      success: true,

      stats: {
        products,
        orders,
        quotes,
        customers,
      },

      recentOrders,

      recentQuotes,

    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
    });

  }
};