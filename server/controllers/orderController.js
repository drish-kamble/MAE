import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { sendAdminOrderEmail } from "../utils/emails/adminEmails.js";
import { sendClientOrderEmail } from "../utils/emails/clientEmails.js";

/* ================= CREATE ORDER ================= */
export const createOrder = async (req, res) => {
  try {
    const { items, customer, currency } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Order must contain at least one item",
      });
    }

    // Fetch products
    const productIds = items.map((item) => item.productId);
    const products = await Product.find({
      _id: { $in: productIds },
      pricingType: "FIXED",
    });

    if (products.length !== items.length) {
      return res.status(400).json({
        message: "One or more products are invalid",
      });
    }

    // Build order items (INR prices only)
    let subtotal = 0;

    const orderItems = items.map((item) => {
      const product = products.find(
        (p) => p._id.toString() === item.productId
      );

      const lineTotal = product.price * item.quantity;
      subtotal += lineTotal;

      return {
        productId: product._id,
        name: product.name,
        partNumber: product.partNumber,
        quantity: item.quantity,
        unitPrice: product.price,
        lineTotal,
      };
    });

    const tax = subtotal * 0.18;
    const total = subtotal + tax;

    // 🔥 Currency comes from checkout (NOT product)
    const selectedCurrency = currency || "INR";

    const order = await Order.create({
      orderNumber: `ORD-${Date.now()}`,
      user: req.user._id,
      customer,
      items: orderItems,
      subtotal,
      tax,
      total, // INR (source of truth)
      currency: selectedCurrency,
      status: "created",
    });

    // 🔔 Emails (non-blocking)
    sendAdminOrderEmail(order).catch(console.error);
    sendClientOrderEmail(order).catch(console.error);

    res.status(201).json(order);
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({
      message: "Failed to create order",
    });
  }
};

/* ================= USER: GET MY ORDERS ================= */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    console.error("Fetch my orders error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

/* ================= USER / ADMIN: GET ORDER BY ID ================= */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (
      req.user.role !== "admin" &&
      order.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(order);
  } catch (error) {
    console.error("Fetch order error:", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

/* ================= ADMIN: GET ALL ORDERS ================= */
export const getAllOrders = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
