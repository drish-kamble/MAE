import express from "express";
import {
  createQuote,
  getAllQuotes,
  updateQuoteStatus,
} from "../controllers/quoteController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// USER
router.post("/", upload.single("attachment"), createQuote);

// ADMIN
router.get("/", protect, getAllQuotes);
router.patch("/:id/status", protect, updateQuoteStatus);

export default router;