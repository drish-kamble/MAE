import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    modelNumber: String,
    brand: String,
    productType: String,

    description: String,

    pricingType: {
  type: String,
  enum: ["FIXED", "QUOTE"],
  required: true,
  default: "QUOTE",
},

price: {
  type: Number,
  default: null,
},

currency: {
  type: String,
  default: "INR",
},

partNumber: {
  type: String,
  required: true,
  unique: true,
},

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
