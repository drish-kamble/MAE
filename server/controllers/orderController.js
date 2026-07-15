import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { sendAdminOrderEmail } from "../utils/emails/adminEmails.js";
import { sendClientOrderEmail } from "../utils/emails/clientEmails.js";
import Counter from "../models/Counter.js";

/* ================= CREATE ORDER ================= */
export const createOrder = async (req, res) => {
  try {
    const { items, customer, currency } = req.body;

    // ✅ Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Order must contain at least one item",
      });
    }

    // ✅ Extract product IDs
    const productIds = items.map((item) => item.productId);

    // ✅ Fetch valid FIXED products
    const products = await Product.find({
      _id: { $in: productIds },
      pricingType: "FIXED",
    });

    if (products.length !== items.length) {
      return res.status(400).json({
        message: "One or more products are invalid",
      });
    }

    // ✅ Optimize lookup (O(1))
    const productMap = new Map(
      products.map((p) => [p._id.toString(), p])
    );

    let subtotal = 0;

    const orderItems = items.map((item) => {
      const product = productMap.get(item.productId);

      if (!product) {
        throw new Error("Product not found");
      }

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

    // ✅ Pricing (rounded)
    const tax = Math.round(subtotal * 0.18);
    const total = Math.round(subtotal + tax);

    const selectedCurrency = currency || "INR";

    // ✅ Better order number
    // ✅ NEW LOGIC (YEAR + MONTH + SEQUENCE)

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, "0");

// unique counter per month
const counterName = `order-${year}-${month}`;

const counter = await Counter.findOneAndUpdate(
  { name: counterName },
  { $inc: { value: 1 } },
  { new: true, upsert: true }
);

// sequence padded
const sequence = String(counter.value).padStart(6, "0");

const orderNumber = `ORD-${year}-${month}-${sequence}`;

    const order = await Order.create({
      orderNumber,
      user: req.user._id,
      customer,
      items: orderItems,
      subtotal,
      tax,
      total,
      currency: selectedCurrency,
      status: "created",
    });

    // ✅ Non-blocking emails
    sendAdminOrderEmail(order).catch(console.error);
    sendClientOrderEmail(order).catch(console.error);

    res.status(201).json(order);
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({
      message: error.message || "Failed to create order",
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
    console.error("Fetch all orders error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};