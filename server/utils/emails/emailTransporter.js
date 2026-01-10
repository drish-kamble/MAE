import nodemailer from "nodemailer";
import { EMAIL_CONFIG } from "../../config/emailConfig.js";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_CONFIG.user,
    pass: EMAIL_CONFIG.pass,
  },
});
