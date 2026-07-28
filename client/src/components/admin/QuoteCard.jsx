import {
  User,
  Building2,
  Mail,
  Phone,
  Paperclip,
  ChevronRight,
} from "lucide-react";

function QuoteCard({ quote, onOpen }) {
  const statusColors = {
    submitted: "bg-yellow-100 text-yellow-700",
    reviewing: "bg-blue-100 text-blue-700",
    quoted: "bg-purple-100 text-purple-700",
    won: "bg-green-100 text-green-700",
    lost: "bg-red-100 text-red-700",
    closed: "bg-gray-200 text-gray-700",
  };

  return (
    <div
      onClick={() => onOpen(quote)}
      className="bg-white rounded-2xl shadow hover:shadow-xl transition cursor-pointer p-6"
    >
      <div className="flex justify-between">

        <div>

          <h2 className="text-xl font-bold flex items-center gap-2">

            <User size={20} />

            {quote.customer?.name}

          </h2>

          <p className="flex items-center gap-2 text-gray-600 mt-2">

            <Building2 size={17} />

            {quote.customer?.company || "No Company"}

          </p>

          <p className="flex items-center gap-2 text-gray-600">

            <Mail size={17} />

            {quote.customer?.email}

          </p>

          <p className="flex items-center gap-2 text-gray-600">

            <Phone size={17} />

            {quote.customer?.phone}

          </p>

        </div>

        <span
          className={`h-fit px-4 py-2 rounded-full text-sm font-semibold ${
            statusColors[quote.status]
          }`}
        >
          {quote.status.toUpperCase()}
        </span>

      </div>

      <div className="grid grid-cols-3 gap-5 mt-6">

        <div>

          <p className="text-gray-500 text-sm">
            Products
          </p>

          <h3 className="font-bold">

            {quote.items.length}

          </h3>

        </div>

        <div>

          <p className="text-gray-500 text-sm">
            Reference
          </p>

          <h3 className="font-bold">

            {quote.yourReference || "-"}

          </h3>

        </div>

        <div>

          <p className="text-gray-500 text-sm">
            Attachment
          </p>

          <h3 className="font-bold flex items-center gap-2">

            <Paperclip size={16} />

            {quote.attachment ? "Yes" : "No"}

          </h3>

        </div>

      </div>

      <div className="flex justify-between items-center mt-6">

        <span className="text-gray-500 text-sm">

          {new Date(quote.createdAt).toLocaleDateString()}

        </span>

        <button className="text-primary flex items-center gap-2 font-semibold">

          Open

          <ChevronRight size={18} />

        </button>

      </div>

    </div>
  );
}

export default QuoteCard;