import Quote from "../models/Quote.js";
import { sendQuoteEmail } from "../utils/sendEmail.js";

export const createQuote = async (req, res) => {
  try {
    // 1. Save quote (MAIN BUSINESS LOGIC)
    const quote = new Quote(req.body);
    await quote.save();

    // 2. Try to send email (OPTIONAL SIDE EFFECT)
    try {
      await sendQuoteEmail(quote);
    } catch (emailError) {
      console.error("Email failed:", emailError.message);
    }

    // 3. ALWAYS respond success if quote saved
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
