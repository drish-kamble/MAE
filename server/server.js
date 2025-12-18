import "./config/env.js"; // MUST be first import

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

console.log(
  Object.keys(process.env)
    .filter(k => k.toLowerCase().includes("email"))
    .map(k => JSON.stringify(k))
);


const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// connect database
connectDB();

// routes
app.use("/api/products", productRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/orders", orderRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
