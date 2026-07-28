import nodemailer from "nodemailer";
import { EMAIL_CONFIG } from "../../config/emailConfig.js";

export const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: EMAIL_CONFIG.user,
    pass: EMAIL_CONFIG.pass,
  },
});

transporter.verify((err) => {
  if (err) {
    console.error("SMTP Error:", err);
  } else {
    console.log("✅ Brevo SMTP Ready");
  }
});
console.log("EMAIL_USER:", EMAIL_CONFIG.user);
console.log("SMTP HOST: smtp-relay.brevo.com");