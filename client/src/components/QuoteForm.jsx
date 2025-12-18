import { useState } from "react";

function QuoteForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Quote request submitted successfully!");
    setForm({ name: "", email: "", company: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
