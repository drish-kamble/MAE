import { useEffect, useState } from "react";
import { fetchMyOrders } from "../services/api";
import { Link } from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="p-6">Loading orders...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              to={`/orders/${order._id}`}
              key={order._id}
              className="block border rounded p-4 hover:shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">
                    Order #{order.orderNumber}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">₹ {order.total}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      order.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;
