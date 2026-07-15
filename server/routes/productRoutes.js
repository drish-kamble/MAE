import express from "express";
import {
  getAllProducts,
  getProductById,
  getProductTypes
} from "../controllers/productController.js";

const router = express.Router();

// ✅ ALWAYS FIRST
router.get("/types", getProductTypes);

// GET all products
router.get("/", getAllProducts);

// ✅ ALWAYS LAST
router.get("/:id", getProductById);

export default router;