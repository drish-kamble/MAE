import nodemailer from "nodemailer";
import { EMAIL_CONFIG } from "../../config/emailConfig.js";

export const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 2525,
  secure: false,
  auth: {
    user: EMAIL_CONFIG.user,
    pass: EMAIL_CONFIG.pass,
  },
});