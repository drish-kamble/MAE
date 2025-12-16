function QuoteForm({ highlighted }) {
  return (
    <form
      className={`space-y-4 p-6 rounded ${
        highlighted ? "ring-2 ring-orange-500 bg-white" : ""
      }`}
    >
      <input
        type="text"
        placeholder="Your Name"
        className="w-full border p-3 rounded"
        required
      />

      <input
        type="email"
        placeholder="Your Email"
        className="w-full border p-3 rounded"
        required
      />

      <input
        type="text"
        placeholder="Company Name"
        className="w-full border p-3 rounded"
      />

      <textarea
        placeholder="Product / Requirement Details"
        rows="4"
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
