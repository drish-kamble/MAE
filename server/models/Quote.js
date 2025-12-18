import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    company: String,
    message: String,
  },
  { timestamps: true }
);

export default mongoose.model("Quote", quoteSchema);
