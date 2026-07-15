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

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => navigate("/"), 5000);
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
    } catch {
      alert("Failed to submit quote");
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ SUCCESS
  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center pt-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="bg-white shadow-xl rounded-3xl p-10 text-center max-w-md border border-gray-100">
          <h2 className="text-3xl font-bold text-green-600 mb-3">
            Quote Submitted 🎉
          </h2>
          <p className="text-gray-600">
            Our team will contact you shortly.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Redirecting in 5 seconds...
          </p>
        </div>
      </div>
    );
  }

  // 🛑 EMPTY
  if (quoteItems.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center pt-28 bg-gradient-to-b from-gray-50 to-white">
        <h2 className="text-2xl font-semibold mb-2">
          Your Quote is Empty
        </h2>
        <p className="text-gray-500 mb-4">
          Add products to request a quote
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-purple-700 text-white px-6 py-3 rounded-xl hover:opacity-90"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen pt-28 pb-12 px-4">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Request a Quote
        </h1>
        <p className="text-gray-500 mt-1">
          Review your selected products and submit your request
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start">

        {/* LEFT */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-4">
            Selected Products
          </h2>

          <div className="space-y-4">
            {quoteItems.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between items-center border border-gray-100 rounded-xl p-4 hover:shadow-md hover:-translate-y-[2px] transition-all"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Part No: {item.partNumber}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                    Qty: {item.quantity}
                  </span>

                  <button
                    onClick={() => removeFromQuote(item.productId)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-400 mt-4">
            Total Items: {quoteItems.length}
          </p>
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-4">
            Your Details
          </h2>

          <div className="space-y-4">

            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white outline-none transition"
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white outline-none transition"
            />

            <input
              name="company"
              placeholder="Company Name"
              value={form.company}
              onChange={handleChange}
              className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white outline-none transition"
            />

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-xl font-medium hover:shadow-lg transition disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Quote"}
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Quote;