import { useEffect, useState } from "react";
import {
  Package,
  ClipboardList,
  FileText,
  Users,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

const API_BASE = "https://macroelectricals.onrender.com/api";

function DashboardCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500">{title}</p>

          <h2 className="text-4xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div
          className={`${color} h-16 w-16 rounded-2xl flex items-center justify-center text-white`}
        >
          <Icon size={32} />
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    quotes: 0,
    customers: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [recentQuotes, setRecentQuotes] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API_BASE}/admin/dashboard`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success) {
        setStats(data.stats);
        setRecentOrders(data.recentOrders);
        setRecentQuotes(data.recentQuotes);
      }
    } catch (err) {
      console.error("Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const dashboardCards = [
    {
      title: "Products",
      value: stats.products,
      icon: Package,
      color: "bg-blue-500",
    },
    {
      title: "Orders",
      value: stats.orders,
      icon: ClipboardList,
      color: "bg-green-500",
    },
    {
      title: "Quotes",
      value: stats.quotes,
      icon: FileText,
      color: "bg-purple-600",
    },
    {
      title: "Customers",
      value: stats.customers,
      icon: Users,
      color: "bg-orange-500",
    },
  ];

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div>

      {/* Header */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back 👋 Here's what's happening today.
        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {dashboardCards.map((card) => (
          <DashboardCard
            key={card.title}
            {...card}
          />
        ))}

      </div>

      {/* Bottom */}

      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        {/* Recent Orders */}

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-xl font-semibold">
              Recent Orders
            </h2>

            <TrendingUp className="text-green-500" />

          </div>

          <div className="space-y-4">

            {recentOrders.length === 0 ? (

              <p className="text-gray-500">
                No Orders Found
              </p>

            ) : (

              recentOrders.map((order) => (

                <div
                  key={order._id}
                  className="flex justify-between border-b pb-3"
                >

                  <div>

                    <p className="font-medium">
                      {order.orderNumber}
                    </p>

                    <p className="text-sm text-gray-500">
                      {order.customer?.name}
                    </p>

                  </div>

                  <span className="text-green-600 font-semibold">
                    ₹{order.total}
                  </span>

                </div>

              ))

            )}

          </div>

        </div>

        {/* Recent Quotes */}

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-xl font-semibold">
              Recent Quotes
            </h2>

            <AlertTriangle className="text-yellow-500" />

          </div>

          <div className="space-y-4">

            {recentQuotes.length === 0 ? (

              <p className="text-gray-500">
                No Quotes Found
              </p>

            ) : (

              recentQuotes.map((quote) => (

                <div
                  key={quote._id}
                  className="border-l-4 border-primary bg-gray-50 p-4 rounded"
                >

                  <p className="font-semibold">
                    {quote.customer?.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {quote.customer?.company || "No Company"}
                  </p>

                  <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full capitalize">
                    {quote.status}
                  </span>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;