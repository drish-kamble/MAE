import express from "express";
import { stripeWebhook } from "../controllers/stripeWebhookController.js";

const router = express.Router();

/**
 * Stripe webhook endpoint
 * FINAL URL: /api/webhooks/stripe
 */
router.post("/stripe", stripeWebhook);

export default router;
