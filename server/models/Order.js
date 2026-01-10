import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: String,
  partNumber: String,
  quantity: Number,
  unitPrice: Number,
  lineTotal: Number,
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    customer: {
      name: String,
      email: String,
      phone: String,
    },

    items: [orderItemSchema],

    subtotal: Number,
    tax: Number,
    total: Number, // ✅ INR (source of truth)

    paymentGateway: String,
    paymentId: String,

    currency: {
      type: String,
      default: "INR",
    },

    baseCurrency: {
      type: String,
      default: "INR",
    },

    exchangeRate: {
      type: Number,
    },

    convertedTotal: {
      type: Number,
    },

    status: {
      type: String,
      enum: ["created", "reviewed", "priced", "confirmed", "paid"],
      default: "created",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
