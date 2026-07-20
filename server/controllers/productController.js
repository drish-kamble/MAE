import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  try {
    const {
      search = "",
      type = "ALL",
      page = 1,
      limit = 9,
    } = req.query;

    const query = {};

    // ==========================
    // 🔍 DEBUG LOGS
    // ==========================
    console.log("========== PRODUCT DEBUG ==========");
    console.log("Database:", Product.db.name);
    console.log("Collection:", Product.collection.name);

    const totalProducts = await Product.countDocuments({});
    console.log("Total Products in Collection:", totalProducts);

    const firstProduct = await Product.findOne({});
    console.log("First Product:", firstProduct);

    console.log("===================================");

    // 🔍 Search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ];
    }

    // 🏷️ Filter
    if (type !== "ALL") {
      query.productType = type;
    }

    console.log("Query:", query);

    // 📄 Pagination + Sorting
    const products = await Product.find(query)
      .sort({ sequence: 1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    console.log("Products Returned:", products.length);

    const total = await Product.countDocuments(query);

    console.log("Filtered Count:", total);

    res.json({
      products,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    });

  } catch (error) {
    console.error("❌ Product Controller Error:", error);
    res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid product ID" });
  }
};

export const getProductTypes = async (req, res) => {
  try {
    const types = await Product.distinct("productType");

    res.json(types.filter(Boolean));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching product types" });
  }
};