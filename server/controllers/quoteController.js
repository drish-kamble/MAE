import Quote from "../models/Quote.js";
import { sendAdminQuoteEmail } from "../utils/emails/adminEmails.js";
import { sendClientQuoteEmail } from "../utils/emails/clientEmails.js";

/* ================= CREATE QUOTE ================= */
export const createQuote = async (req, res) => {
  try {
    // 🧠 FormData sends strings → parse JSON
    const data =
  req.body.data
    ? JSON.parse(req.body.data) // FormData request
    : req.body;                 // JSON request

    const quote = new Quote({
      ...data,
      // 📎 save file path if uploaded
      attachment: req.file ? req.file.path : null,
    });

    await quote.save();

    // 🔔 EMAILS (NON-BLOCKING)
    sendAdminQuoteEmail(quote).catch(console.error);
    sendClientQuoteEmail(quote).catch(console.error);

    res.status(201).json({
      message: "Quote submitted successfully",
    });
  } catch (error) {
    console.error("Quote save failed:", error);
    res.status(500).json({
      message: "Failed to submit quote",
    });
  }
};

/* ================= ADMIN: GET ALL QUOTES ================= */
export const getAllQuotes = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch quotes",
    });
  }
};