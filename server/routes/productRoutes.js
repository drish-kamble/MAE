import express from "express";
import {
  getAllProducts,
  getProductById
} from "../controllers/productController.js";

const router = express.Router();

// GET all products
router.get("/", getAllProducts);

// GET single product by ID
router.get("/:id", getProductById);

export default router;
