import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import QuoteCard from "../../components/admin/QuoteCard";
import QuoteDrawer from "../../components/admin/QuoteDrawer";

const API_BASE = "https://macroelectricals.onrender.com/api";

function AdminQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [selectedQuote, setSelectedQuote] = useState(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  useEffect(() => {
    filterQuotes();
  }, [quotes, search, statusFilter]);

  const fetchQuotes = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/quotes`, {
        credentials: "include",
      });

      const data = await res.json();

      setQuotes(data.quotes || []);
    } catch (err) {
      console.error("Failed to fetch quotes:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterQuotes = () => {
    let list = [...quotes];

    if (statusFilter !== "ALL") {
      list = list.filter((quote) => quote.status === statusFilter);
    }

    if (search) {
      const value = search.toLowerCase();

      list = list.filter(
        (quote) =>
          quote.customer?.name?.toLowerCase().includes(value) ||
          quote.customer?.email?.toLowerCase().includes(value) ||
          quote.customer?.company?.toLowerCase().includes(value)
      );
    }

    setFilteredQuotes(list);
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold">
          Quote Management
        </h1>

        <p className="text-gray-500 mt-2">
          View and manage all customer quote requests.
        </p>
      </div>

      {/* Search + Filter */}

      <div className="flex gap-4">

        <div className="flex-1 bg-white rounded-xl shadow p-4 flex items-center gap-3">

          <Search className="text-primary" />

          <input
            type="text"
            placeholder="Search customer..."
            className="w-full outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white rounded-xl shadow px-5"
        >
          <option value="ALL">All Status</option>
          <option value="submitted">Submitted</option>
          <option value="reviewing">Reviewing</option>
          <option value="quoted">Quoted</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
          <option value="closed">Closed</option>
        </select>

      </div>

      {/* Quote Count */}

      <div>
        <p className="text-gray-600">
          Showing{" "}
          <span className="font-bold text-primary">
            {filteredQuotes.length}
          </span>{" "}
          quote requests
        </p>
      </div>

      {/* Quotes */}

      {loading ? (

        <div className="text-center py-20">
          Loading Quotes...
        </div>

      ) : filteredQuotes.length === 0 ? (

        <div className="bg-white rounded-xl shadow p-16 text-center text-gray-500">
          No Quote Requests Found
        </div>

      ) : (

        <div className="grid gap-6">

          {filteredQuotes.map((quote) => (

            <QuoteCard
              key={quote._id}
              quote={quote}
              onOpen={setSelectedQuote}
            />

          ))}

        </div>

      )}

      {/* Quote Drawer */}

      <QuoteDrawer
        quote={selectedQuote}
        onClose={() => setSelectedQuote(null)}
      />

    </div>
  );
}

export default AdminQuotes;