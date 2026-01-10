import { transporter } from "./emailTransporter.js";
import { EMAIL_CONFIG } from "../../config/emailConfig.js";

/* ================= HELPERS ================= */
const formatOrderAmount = (order) => {
  if (
    order.paymentGateway === "stripe" &&
    order.convertedTotal &&
    order.currency
  ) {
    return `${order.currency} ${order.convertedTotal.toFixed(2)}`;
  }

  return `₹${order.total.toFixed(2)}`;
};

/* ================= CLIENT: QUOTE ================= */
export const sendClientQuoteEmail = async (quote) => {
  const hasMessage = Boolean(quote.message);
  const hasItems = Array.isArray(quote.items) && quote.items.length > 0;

  const itemsHtml = hasItems
    ? quote.items
        .map(
          (item) => `
          <tr>
            <td style="padding:8px;border-bottom:1px solid #e5e7eb;">${item.name}</td>
            <td style="padding:8px;border-bottom:1px solid #e5e7eb;">${item.partNumber || "—"}</td>
            <td style="padding:8px;border-bottom:1px solid #e5e7eb;text-align:center;">${item.quantity}</td>
          </tr>
        `
        )
        .join("")
    : "";

  await transporter.sendMail({
    from: `"MAE Electricals" <${EMAIL_CONFIG.user}>`,
    to: quote.customer?.email,
    subject: `Quote Request Received — ${quote.customer?.name || "Customer"}`,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;background:#f4f6f8;padding:24px;">
        <div style="max-width:720px;margin:auto;background:#ffffff;padding:24px;border-radius:6px;border:1px solid #e5e7eb;">

          <h2 style="color:#6b21a8;">Quote Request Received</h2>

          <p>Hi ${quote.customer?.name || "there"},</p>

          <p>We’ve received your quote request. Here are the details:</p>

          ${
            hasMessage
              ? `
                <h3>Your Requirement</h3>
                <pre style="background:#f9fafb;padding:14px;border-radius:6px;border:1px solid #e5e7eb;white-space:pre-wrap;">
${quote.message}
                </pre>
              `
              : hasItems
              ? `
                <table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:16px;">
                  <thead>
                    <tr style="background:#f9fafb;">
                      <th style="padding:8px;border-bottom:1px solid #e5e7eb;">Product</th>
                      <th style="padding:8px;border-bottom:1px solid #e5e7eb;">Part No</th>
                      <th style="padding:8px;border-bottom:1px solid #e5e7eb;">Qty</th>
                    </tr>
                  </thead>
                  <tbody>${itemsHtml}</tbody>
                </table>
              `
              : `<p style="margin-top:16px;color:#6b7280;">No product details provided.</p>`
          }

          <p style="margin-top:20px;">
            Our team will contact you shortly with pricing and availability.
          </p>

          <p>
            Regards,<br />
            <strong>MAE Electricals</strong>
          </p>
        </div>
      </div>
    `,
  });
};

/* ================= CLIENT: ORDER ================= */
export const sendClientOrderEmail = async (order) => {
  const itemsHtml = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding:6px 0;">${item.name}</td>
          <td style="padding:6px 0;">${item.partNumber || "—"}</td>
          <td style="padding:6px 0;text-align:center;">${item.quantity}</td>
          <td style="padding:6px 0;text-align:right;">₹${item.lineTotal.toFixed(2)}</td>
        </tr>
      `
    )
    .join("");

  await transporter.sendMail({
    from: `"MAE Electricals" <${EMAIL_CONFIG.user}>`,
    to: order.customer.email,
    subject: `Order Confirmation — ${order.orderNumber}`,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;background:#f4f6f8;padding:24px;">
        <div style="max-width:720px;margin:auto;background:#ffffff;padding:24px;border-radius:6px;border:1px solid #e5e7eb;">

          <h2 style="color:#6b21a8;">Order Confirmed</h2>

          <p>Hi ${order.customer.name},</p>

          <p>Your order has been successfully placed.</p>

          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <thead>
              <tr style="background:#f9fafb;">
                <th>Product</th>
                <th>Part No</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>

          <p style="margin-top:16px;">
            <strong>Total Amount:</strong> ${formatOrderAmount(order)}
          </p>

          <p>
            Regards,<br />
            <strong>MAE Electricals</strong>
          </p>
        </div>
      </div>
    `,
  });
};

export const sendClientPaymentEmail = async (order) => {
  await transporter.sendMail({
    from: `"MAE Electricals" <${EMAIL_CONFIG.user}>`,
    to: order.customer.email,
    subject: `✅ Payment Successful — ${order.orderNumber}`,
    html: `
      <h2>Payment Successful</h2>
      <p>Hi ${order.customer.name},</p>
      <p>We have received your payment.</p>
      <p><strong>Order:</strong> ${order.orderNumber}</p>
      <p><strong>Amount Paid:</strong> ${formatOrderAmount(order)}</p>
      <p>We’ll start processing your order shortly.</p>
    `,
  });
};
