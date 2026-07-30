import Quote from "../models/Quote.js";
import { sendAdminQuoteEmail } from "../utils/emails/adminEmails.js";
import { sendClientQuoteEmail } from "../utils/emails/clientEmails.js";

/* ================= CREATE QUOTE ================= */
export const createQuote = async (req, res) => {
  try {
    // Parse FormData or JSON
    const data = req.body.data
      ? JSON.parse(req.body.data)
      : req.body;

    // Debug Cloudinary upload (remove after testing)
    console.log("Cloudinary File:", req.file);

    const quote = new Quote({
      ...data,
      attachment: req.file
        ? (req.file.secure_url || req.file.path)
        : null,
    });

    await quote.save();

    // Send emails without blocking the response
    sendAdminQuoteEmail(quote).catch((err) =>
      console.error("Admin email failed:", err)
    );

    sendClientQuoteEmail(quote).catch((err) =>
      console.error("Client email failed:", err)
    );

    res.status(201).json({
      success: true,
      message: "Quote submitted successfully",
      quote,
    });

  } catch (error) {
    console.error("Quote save failed:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit quote",
      error: error.message,
    });
  }
};

/* ================= ADMIN: GET ALL QUOTES ================= */
export const getAllQuotes = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const quotes = await Quote.find()
      .populate("items.productId", "name partNumber image")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: quotes.length,
      quotes,
    });

  } catch (error) {
    console.error("Fetch quotes failed:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch quotes",
      error: error.message,
    });
  }
};