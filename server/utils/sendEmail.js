import nodemailer from "nodemailer";
import { EMAIL_CONFIG } from "../config/emailConfig.js";

export const sendQuoteEmail = async (quote) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_CONFIG.user,
      pass: EMAIL_CONFIG.pass,
    },
  });

  const mailOptions = {
    from: EMAIL_CONFIG.user,
    to: EMAIL_CONFIG.staff,
    subject: "New Quote Request - MAE Electricals",
    html: `
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${quote.name}</p>
      <p><strong>Email:</strong> ${quote.email}</p>
      <p><strong>Company:</strong> ${quote.company}</p>
      <p><strong>Message:</strong> ${quote.message}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
