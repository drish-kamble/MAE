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

        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">

          <h2 className="text-2xl font-bold">
            Quote Details
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        {/* Customer */}

        <div className="p-6 space-y-8">

          <section>

            <h3 className="font-bold text-lg mb-4">
              Customer Information
            </h3>

            <div className="space-y-2">

              <p>
                <strong>Name:</strong>{" "}
                {quote.customer?.name}
              </p>

              <p>
                <strong>Company:</strong>{" "}
                {quote.customer?.company}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {quote.customer?.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {quote.customer?.phone}
              </p>

            </div>

          </section>

          <section>

            <h3 className="font-bold text-lg mb-4">
              Customer Reference
            </h3>

            <p>
              {quote.yourReference || "-"}
            </p>

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

            <h3 className="font-bold text-lg mb-4">
              Attachment
            </h3>

            {quote.attachment ? (

              <a
                href={quote.attachment}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                View Attachment
              </a>

            ) : (

              <p>No Attachment</p>

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