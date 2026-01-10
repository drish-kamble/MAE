import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuote } from "../context/QuoteContext";

function Quote() {
  const { quoteItems, removeFromQuote, clearQuote } = useQuote();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // 🔁 Redirect to home after success (5 seconds)
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      alert("Please enter name and email");
      return;
    }

    setSubmitting(true);

    try {
      await fetch("http://localhost:5000/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: form.name,
            email: form.email,
            company: form.company,
          },
          items: quoteItems,
        }),
      });

      clearQuote();
      setSuccess(true);
    } catch (err) {
      alert("Failed to submit quote");
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ SUCCESS SCREEN
  if (success) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold mb-2">
          ✅ Quote Submitted
        </h2>
        <p className="text-gray-600">
          Our team will contact you shortly.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Redirecting to home page in 5 seconds...
        </p>
      </div>
    );
  }

  // 🛑 EMPTY QUOTE
  if (quoteItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">
          Quote is empty
        </h2>
        <p className="text-gray-500">
          Add products to request a quote
        </p>
      </div>
    );
  }

  // 🧾 MAIN QUOTE PAGE
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Request a Quote
      </h1>

      {/* QUOTE ITEMS */}
      <div className="border rounded-lg p-4 mb-6">
        {quoteItems.map((item) => (
          <div
            key={item.productId}
            className="flex justify-between items-center border-b py-3"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                Part No: {item.partNumber}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span>Qty: {item.quantity}</span>
              <button
                onClick={() => removeFromQuote(item.productId)}
                className="text-red-600 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CUSTOMER DETAILS */}
      <div className="border rounded-lg p-4 mb-6 space-y-4">
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
      </div>

      {/* SUBMIT BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full bg-purple-700 text-white py-3 rounded hover:opacity-90 disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit Quote"}
      </button>
    </div>
  );
}

export default Quote;
