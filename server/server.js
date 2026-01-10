import "./config/env.js";

import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db.js";

import webhookRoutes from "./routes/webhookRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

/* =====================================================
   🔥 STRIPE WEBHOOK — RAW BODY (MUST BE FIRST)
   ===================================================== */
app.use(
  "/api/webhooks",
  express.raw({ type: "application/json" })
);

/* =====================================================
   🌍 NORMAL MIDDLEWARE
   ===================================================== */
app.use(cors());
app.use(express.json());

/* =====================================================
   🚦 RATE LIMITING (AUTH + PAYMENTS)
   ===================================================== */
const sensitiveLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // requests per IP
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/auth", sensitiveLimiter);
app.use("/api/payments", sensitiveLimiter);

/* =====================================================
   🗄️ DATABASE
   ===================================================== */
connectDB();

/* =====================================================
   🚏 ROUTES
   ===================================================== */
app.use("/api/webhooks", webhookRoutes);
app.use("/api/products", productRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentRoutes);

/* =====================================================
   🏠 ROOT
   ===================================================== */
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

/* =====================================================
   🚀 START SERVER
   ===================================================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
