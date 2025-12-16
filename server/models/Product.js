import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    modelNumber: String,
    brand: String,
    productType: String,

    description: String,

    price: Number,
    currency: String,

    stockStatus: String,

    datasheet: String,
    image: String,

    hsnCode: String,
    gstRate: Number
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
