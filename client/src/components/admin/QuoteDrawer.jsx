import { X } from "lucide-react";

function QuoteDrawer({ quote, onClose }) {
  if (!quote) return null;

  return (
    <>

      {/* Background */}

      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40"
      />

      {/* Drawer */}

      <div className="fixed top-0 right-0 w-[520px] h-screen bg-white shadow-2xl z-50 overflow-y-auto">

        {/* Header */}

<div className="sticky top-0 bg-white border-b px-6 py-5 z-10">

  <div className="flex justify-between items-start">

    <div>

      <h2 className="text-2xl font-bold">
        {quote.customer?.name}
      </h2>

      <p className="text-gray-500 mt-1">
        {quote.customer?.company || "No Company"}
      </p>

    </div>

    <button
      onClick={onClose}
      className="hover:bg-gray-100 p-2 rounded-lg"
    >
      <X />
    </button>

  </div>

  <div className="mt-5">

    <span
      className={`px-4 py-2 rounded-full text-sm font-semibold ${
        quote.status === "submitted"
          ? "bg-yellow-100 text-yellow-700"
          : quote.status === "reviewing"
          ? "bg-blue-100 text-blue-700"
          : quote.status === "quoted"
          ? "bg-purple-100 text-purple-700"
          : quote.status === "won"
          ? "bg-green-100 text-green-700"
          : quote.status === "lost"
          ? "bg-red-100 text-red-700"
          : "bg-gray-200 text-gray-700"
      }`}
    >
      {quote.status.toUpperCase()}
    </span>

  </div>

</div>

        {/* Customer */}

        <div className="p-6 space-y-8">

          <section>

  <h3 className="text-lg font-bold mb-4">
    Customer Information
  </h3>

  <div className="grid grid-cols-2 gap-4">

    <div className="bg-gray-50 rounded-xl p-4">

      <p className="text-xs uppercase tracking-wide text-gray-500">
        Customer
      </p>

      <p className="font-semibold mt-1">
        {quote.customer?.name}
      </p>

    </div>

    <div className="bg-gray-50 rounded-xl p-4">

      <p className="text-xs uppercase tracking-wide text-gray-500">
        Company
      </p>

      <p className="font-semibold mt-1">
        {quote.customer?.company || "-"}
      </p>

    </div>

    <div className="bg-gray-50 rounded-xl p-4">

      <p className="text-xs uppercase tracking-wide text-gray-500">
        Email
      </p>

      <p className="font-semibold mt-1 break-all">
        {quote.customer?.email}
      </p>

    </div>

    <div className="bg-gray-50 rounded-xl p-4">

      <p className="text-xs uppercase tracking-wide text-gray-500">
        Phone
      </p>

      <p className="font-semibold mt-1">
        {quote.customer?.phone}
      </p>

    </div>

  </div>

</section>

          <section>

            <h3 className="font-bold text-lg mb-4">
              Customer Message
            </h3>

            <div className="bg-gray-100 rounded-xl p-4">

              {quote.message || "No Message"}

            </div>

          </section>

          <section>

            <h3 className="font-bold text-lg mb-4">
              Requested Products
            </h3>

            <div className="space-y-3">

              {quote.items.map((item, index) => (

                <div
                  key={index}
                  className="border rounded-xl p-4"
                >

                  <p className="font-semibold">

                    {item.name}

                  </p>

                  <p>

                    Part No: {item.partNumber}

                  </p>

                  <p>

                    Qty: {item.quantity}

                  </p>

                </div>

              ))}

            </div>

          </section>

          <section>

  <h3 className="text-lg font-bold mb-4">
    Customer Attachment
  </h3>

  {quote.attachment ? (

    <div className="bg-gray-50 rounded-xl p-5">

      <p className="text-sm text-gray-500 mb-4">

        Customer uploaded a supporting document.

      </p>

      <div className="flex gap-3">

        {/* Preview */}

        <a
          href={quote.attachment}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-primary text-white text-center py-3 rounded-xl hover:opacity-90 transition"
        >
          👁 Preview
        </a>

        {/* Download */}

        <a
          href={quote.attachment}
          download
          className="flex-1 border border-primary text-primary text-center py-3 rounded-xl hover:bg-primary hover:text-white transition"
        >
          ⬇ Download
        </a>

      </div>

    </div>

  ) : (

    <div className="bg-gray-100 rounded-xl p-5 text-gray-500 text-center">

      No attachment uploaded.

    </div>

  )}

</section>

          <section>

            <h3 className="font-bold text-lg mb-4">
              Status
            </h3>

            <select
              defaultValue={quote.status}
              className="w-full border rounded-xl p-3"
            >

              <option value="submitted">
                Submitted
              </option>

              <option value="reviewing">
                Reviewing
              </option>

              <option value="quoted">
                Quoted
              </option>

              <option value="won">
                Won
              </option>

              <option value="lost">
                Lost
              </option>

              <option value="closed">
                Closed
              </option>

            </select>

          </section>

        </div>

      </div>

    </>
  );
}

export default QuoteDrawer;