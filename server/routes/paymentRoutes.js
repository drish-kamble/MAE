import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  initiatePayment,
  verifyRazorpayPayment,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/initiate", protect, initiatePayment);
router.post("/razorpay/verify", protect, verifyRazorpayPayment);

export default router;
