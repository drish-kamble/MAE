import { useState } from "react";

function QuoteForm({ productName = "", productId = "" }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: productName
      ? `Product: ${productName}\n\n`
      : "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
  customer: {
    name: form.name,
    email: form.email,
    company: form.company,
  },
  message: form.message, // ✅ ADD THIS
  items: productId
    ? [
        {
          productId,
          name: productName,
          partNumber: "—",
          quantity: 1,
        },
      ]
    : [],
}),


    });

    alert("Quote request submitted successfully!");
    setForm({ name: "", email: "", company: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {productName && (
        <p className="text-sm text-gray-600">
          Requesting quote for:{" "}
          <span className="font-semibold">{productName}</span>
        </p>
      )}

      <input
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        required
      />

      <input
        name="company"
        placeholder="Company Name"
        value={form.company}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      />

      <textarea
        name="message"
        placeholder="Your Requirement"
        rows="4"
        value={form.message}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      />

      <button
        type="submit"
        className="w-full bg-purple-700 text-white py-3 rounded hover:opacity-90"
      >
        Submit Request
      </button>
    </form>
  );
}

export default QuoteForm;
