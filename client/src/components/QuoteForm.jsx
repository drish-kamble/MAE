import { useState } from "react";

function QuoteForm({ productName = "", productId = "" }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    yourReference: "", // ✅ NEW
    message: productName
      ? `Product: ${productName}\n\n`
      : "",
  });

  const [file, setFile] = useState(null); // ✅ NEW

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // ✅ SEND JSON AS STRING
      formData.append(
        "data",
        JSON.stringify({
          customer: {
            name: form.name,
            email: form.email,
            company: form.company,
          },
          yourReference: form.yourReference, // ✅ INCLUDED
          message: form.message,
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
        })
      );

      // ✅ FILE ATTACH
      if (file) {
        formData.append("attachment", file);
      }

      await fetch("http://localhost:5000/api/quotes", {
        method: "POST",
        body: formData, // ❗ no JSON headers
      });

      alert("Quote request submitted successfully!");

      setForm({
        name: "",
        email: "",
        company: "",
        yourReference: "",
        message: "",
      });
      setFile(null);

    } catch (err) {
      console.error(err);
      alert("Failed to submit quote");
    }
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

      {/* ✅ NEW FIELD */}
      <input
        name="yourReference"
        placeholder="Your Reference"
        value={form.yourReference}
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

      {/* 📎 FILE UPLOAD */}
<div
  onDragOver={(e) => e.preventDefault()}
  onDrop={(e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  }}
  className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
>
  <p className="text-sm text-gray-500">
    Drag & drop file here or click to upload
  </p>

  <input
    type="file"
    onChange={(e) => setFile(e.target.files[0])}
    className="hidden"
    id="fileUpload"
  />

  <label
    htmlFor="fileUpload"
    className="text-primary text-sm underline cursor-pointer"
  >
    Browse File
  </label>

  {/* ✅ SHOW FILE NAME */}
  {file && (
    <p className="mt-2 text-green-600 text-sm">
      Selected: {file.name}
    </p>
  )}
</div>

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