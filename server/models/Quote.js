import mongoose from "mongoose";

const quoteItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: String,
  partNumber: String,
  quantity: {
    type: Number,
    required: true,
  },
});

const quoteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    customer: {
      name: String,
      email: String,
      company: String,
      phone: String,
    },

    message: {
      type: String, // ✅ ADD THIS
    },

    items: [quoteItemSchema],

    status: {
      type: String,
      enum: ["submitted", "responded", "closed"],
      default: "submitted",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Quote", quoteSchema);
