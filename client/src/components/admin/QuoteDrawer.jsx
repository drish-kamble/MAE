import { useEffect, useMemo, useState } from "react";
import {
  X,
  Mail,
  Phone,
  Building2,
  User,
  Package,
  FileText,
  Eye,
  Download,
} from "lucide-react";

function QuoteDrawer({ quote, onClose, onStatusSave }) {
  const [status, setStatus] = useState("submitted");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
  if (quote) {
    setStatus(quote.status || "submitted");
  }
}, [quote]);

const fileName = useMemo(() => {
  if (!quote?.attachment) return "";

  return decodeURIComponent(
    quote.attachment.split("/").pop()
  );
}, [quote]);

if (!quote) return null;

const statusStyles = {
  submitted: "bg-yellow-100 text-yellow-700",
  reviewing: "bg-blue-100 text-blue-700",
  quoted: "bg-purple-100 text-purple-700",
  won: "bg-green-100 text-green-700",
  lost: "bg-red-100 text-red-700",
  closed: "bg-gray-200 text-gray-700",
};
  const handleSave = async () => {
    if (!onStatusSave) return;

    try {
      setSaving(true);

      await onStatusSave(quote._id, status);

    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      />

      {/* Drawer */}

      <div className="fixed top-0 right-0 w-[560px] max-w-full h-screen bg-white shadow-2xl z-50 flex flex-col">

        {/* Header */}

        <div className="sticky top-0 bg-white border-b px-7 py-6 z-20">

          <div className="flex justify-between items-start">

            <div>

              <h2 className="text-3xl font-bold">
                {quote.customer?.name}
              </h2>

              <p className="text-gray-500 mt-1">
                {quote.customer?.company || "No Company"}
              </p>

            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-gray-100"
            >
              <X size={24} />
            </button>

          </div>

          <div className="mt-5">

            <span
              className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold capitalize ${
                statusStyles[status]
              }`}
            >
              {status}
            </span>

          </div>

        </div>

        {/* Scroll Area */}

        <div className="flex-1 overflow-y-auto p-7 space-y-8">

          {/* Customer */}

          <section>

            <h3 className="text-xl font-bold mb-5">
              Customer Information
            </h3>

            <div className="grid grid-cols-2 gap-4">

              <InfoCard
                icon={<User size={18} />}
                title="Customer"
                value={quote.customer?.name}
              />

              <InfoCard
                icon={<Building2 size={18} />}
                title="Company"
                value={quote.customer?.company || "-"}
              />

              <InfoCard
                icon={<Mail size={18} />}
                title="Email"
                value={quote.customer?.email}
              />

              <InfoCard
                icon={<Phone size={18} />}
                title="Phone"
                value={quote.customer?.phone}
              />

            </div>

          </section>

          {/* Message */}

          <section>

            <h3 className="text-xl font-bold mb-4">
              Customer Message
            </h3>

            <div className="rounded-2xl bg-gray-50 p-5">

              {quote.message ? (
                <p>{quote.message}</p>
              ) : (
                <p className="italic text-gray-400">
                  No message provided.
                </p>
              )}

            </div>

          </section>

          {/* Products */}

          <section>

            <h3 className="text-xl font-bold mb-4">
              Requested Products
            </h3>

            <div className="space-y-4">

              {quote.items.map((item, index) => (

                <div
                  key={index}
                  className="border rounded-2xl p-5"
                >

                  <div className="flex items-center gap-3">

                    <Package
                      className="text-primary"
                      size={20}
                    />

                    <h4 className="font-semibold text-lg">

                      {item.name}

                    </h4>

                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">

                    <div>

                      <p className="text-xs uppercase text-gray-500">
                        Part Number
                      </p>

                      <p>{item.partNumber}</p>

                    </div>

                    <div>

                      <p className="text-xs uppercase text-gray-500">
                        Quantity
                      </p>

                      <p>{item.quantity}</p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </section>
                    {/* Attachment */}

          <section>

            <h3 className="text-xl font-bold mb-4">
              Customer Attachment
            </h3>

            {quote.attachment ? (

              <div className="border rounded-2xl p-5">

                <div className="flex items-center gap-3">

                  <FileText
                    size={22}
                    className="text-primary"
                  />

                  <div className="flex-1">

                    <p className="font-semibold truncate">
                      {fileName}
                    </p>

                    <p className="text-sm text-gray-500">
                      Customer uploaded a document.
                    </p>

                  </div>

                </div>

                <div className="flex gap-3 mt-5">

                  <a
                    href={quote.attachment}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-white font-medium hover:opacity-90 transition"
                  >
                    <Eye size={18} />
                    Preview
                  </a>

                  <a
                    href={quote.attachment}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-primary py-3 text-primary font-medium hover:bg-primary hover:text-white transition"
                  >
                    <Download size={18} />
                    Download
                  </a>

                </div>

              </div>

            ) : (

              <div className="rounded-2xl bg-gray-100 p-5 text-center text-gray-500">

                No attachment uploaded.

              </div>

            )}

          </section>

        </div>

        {/* Sticky Footer */}

        <div className="sticky bottom-0 border-t bg-white p-6">

          <label className="block text-sm font-semibold mb-2">
            Quote Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="submitted">Submitted</option>
            <option value="reviewing">Reviewing</option>
            <option value="quoted">Quoted</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
            <option value="closed">Closed</option>
          </select>

          <div className="flex gap-3 mt-5">

            <button
              onClick={onClose}
              className="flex-1 rounded-xl border py-3 font-medium hover:bg-gray-100 transition"
            >
              Close
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 rounded-xl bg-primary py-3 text-white font-medium hover:opacity-90 disabled:opacity-50 transition"
            >
              {saving ? "Saving..." : "Save Status"}
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

/* ---------------- Info Card ---------------- */

function InfoCard({ icon, title, value }) {
  return (
    <div className="rounded-2xl border bg-gray-50 p-4">

      <div className="flex items-center gap-2 text-primary mb-2">
        {icon}
        <p className="text-xs uppercase tracking-wide text-gray-500">
          {title}
        </p>
      </div>

      <p className="font-semibold break-all">
        {value || "-"}
      </p>

    </div>
  );
}

export default QuoteDrawer;