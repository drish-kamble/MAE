import { useEffect, useState } from "react";
import { fetchMyOrders } from "../services/api";
import { Link } from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyOrders()
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setOrders([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="pt-28 p-6 max-w-6xl mx-auto space-y-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-100 h-32 rounded-2xl"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="pt-28 p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-10">📦 My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-24 bg-gray-50 rounded-2xl">
          <p className="text-gray-500 mb-6 text-lg">
            You haven’t placed any orders yet
          </p>
          <Link
            to="/products"
            className="bg-purple-600 text-white px-6 py-3 rounded-xl shadow hover:shadow-lg hover:scale-105 transition"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Link
              to={`/orders/${order._id}`}
              key={order._id}
              className="block bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition"
            >
              {/* HEADER */}
              <div className="flex justify-between flex-wrap gap-4">
                <div>
                  <p className="font-semibold text-lg">
                    Order #{order.orderNumber}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-gray-800">
                    ₹ {order.total.toLocaleString("en-IN")}
                  </p>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      order.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : order.status === "confirmed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* ITEMS */}
              <div className="mt-5 border-t pt-4 text-sm text-gray-600 space-y-2">
                {order.items.slice(0, 2).map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-start"
                  >
                    <div>
                      <p>
                        • {item.name} × {item.quantity}
                      </p>
                      <p className="text-xs text-gray-400">
                        Part No: {item.partNumber || "N/A"}
                      </p>
                    </div>
                  </div>
                ))}

                {order.items.length > 2 && (
                  <p className="text-xs text-gray-400 mt-1">
                    + {order.items.length - 2} more items
                  </p>
                )}
              </div>

              {/* FOOTER */}
              <div className="mt-4 flex justify-between items-center text-sm">
                <span className="text-gray-500">
                  {order.items.length} items
                </span>
                <span className="text-purple-600 font-semibold">
                  View Details →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;