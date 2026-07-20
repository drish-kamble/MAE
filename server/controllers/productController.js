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

    // 📄 Pagination + Sorting
    const products = await Product.find(query)
      .sort({ sequence: 1})
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      products,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
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
    res.status(400).json({ message: "Invalid product ID" });
  }
};

export const getProductTypes = async (req, res) => {
  try {
    const types = await Product.distinct("productType");

    res.json(types.filter(Boolean)); // remove null/empty

  } catch (error) {
    res.status(500).json({ message: "Error fetching product types" });
  }
};