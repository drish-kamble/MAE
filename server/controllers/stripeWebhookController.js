import Stripe from "stripe";
import Order from "../models/Order.js";
import { sendAdminPaymentEmail } from "../utils/emails/adminEmails.js";
import { sendClientPaymentEmail } from "../utils/emails/clientEmails.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY);
console.log("STRIPE_WEBHOOK_SECRET:", process.env.STRIPE_WEBHOOK_SECRET);

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    console.error("❌ Missing Stripe signature");
    return res.status(400).send("Missing signature");
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Stripe signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      return res.json({ received: true });
    }

    try {
      const order = await Order.findById(orderId);

      // 🔒 IDEMPOTENCY GUARD
      if (!order || order.status === "paid") {
        return res.json({ received: true });
      }

      order.status = "paid";
      order.paymentGateway = "stripe";
      order.paymentId = session.payment_intent;
      await order.save();

      // 🔔 PAYMENT EMAILS (NON-BLOCKING)
      console.log("📧 Triggering payment emails for order:", order.orderNumber);

sendAdminPaymentEmail(order)
  .then(() => console.log("✅ Admin payment email sent"))
  .catch((err) => console.error("❌ Admin payment email failed:", err));

sendClientPaymentEmail(order)
  .then(() => console.log("✅ Client payment email sent"))
  .catch((err) => console.error("❌ Client payment email failed:", err));

      console.log("✅ Stripe payment processed for order:", order.orderNumber);
    } catch (err) {
      console.error("❌ Stripe webhook DB error:", err);
      return res.status(500).json({ received: false });
    }
  }

  res.json({ received: true });
};
