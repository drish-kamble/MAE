import express from "express";
import {
  createQuote,
  getAllQuotes,
} from "../controllers/quoteController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// USER
router.post("/", upload.single("attachment"), createQuote);

// ADMIN
router.get("/", protect, getAllQuotes);

export default router;