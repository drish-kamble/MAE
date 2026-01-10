import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import stripe from "../config/stripe.js";
import Order from "../models/Order.js";
import { convertFromINR } from "../utils/currency.js";
import { sendAdminPaymentEmail } from "../utils/emails/adminEmails.js";
import { sendClientPaymentEmail } from "../utils/emails/clientEmails.js";

/* ================= INITIATE PAYMENT ================= */
export const initiatePayment = async (req, res) => {
  try {
    const { orderId, currency } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 🔒 Prevent double payment
    if (order.status === "paid") {
      return res.status(400).json({ message: "Order already paid" });
    }

    /* ================= INR → RAZORPAY ================= */
    if (currency === "INR") {
      const rpOrder = await razorpay.orders.create({
        amount: Math.round(order.total * 100),
        currency: "INR",
        receipt: order.orderNumber,
      });

      order.paymentGateway = "razorpay";
      order.currency = "INR";
      await order.save();

      return res.json({
        gateway: "razorpay",
        key: process.env.RAZORPAY_KEY_ID,
        orderId: rpOrder.id,
        amount: rpOrder.amount,
      });
    }

    /* ================= NON-INR → STRIPE ================= */
    const { convertedAmount, rate } = await convertFromINR(
      order.total,
      currency
    );

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: `Order ${order.orderNumber}`,
            },
            unit_amount: Math.round(convertedAmount * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/orders/${order._id}?success=true`,
      cancel_url: `${process.env.CLIENT_URL}/orders/${order._id}?cancel=true`,
      metadata: {
        orderId: order._id.toString(),
      },
    });

    order.paymentGateway = "stripe";
    order.currency = currency;
    order.exchangeRate = rate;
    order.convertedTotal = convertedAmount;
    await order.save();

    return res.json({
      gateway: "stripe",
      checkoutUrl: session.url,
    });
  } catch (error) {
    console.error("❌ Initiate payment error:", error);
    return res.status(500).json({ message: "Payment initiation failed" });
  }
};

/* ================= VERIFY RAZORPAY ================= */
export const verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const sign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (sign !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 🔒 IDEMPOTENCY GUARD
    if (order.status === "paid") {
      return res.json({ success: true });
    }

    order.status = "paid";
    order.paymentGateway = "razorpay";
    order.paymentId = razorpay_payment_id;
    await order.save();

    // 🔔 PAYMENT EMAILS
    console.log("📧 Triggering Razorpay payment emails for order:", order.orderNumber);
    sendAdminPaymentEmail(order).catch(console.error);
    sendClientPaymentEmail(order).catch(console.error);

    return res.json({ success: true });
  } catch (error) {
    console.error("❌ Razorpay verification failed:", error);
    return res.status(500).json({ message: "Payment verification failed" });
  }
};
