export const EMAIL_CONFIG = {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
  staff: process.env.STAFF_EMAILS
    ? process.env.STAFF_EMAILS.split(",")
    : [],
};
