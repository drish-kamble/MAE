import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOrderById } from "../services/api";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    fetchOrderById(id)
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch(() => {
        setOrder(null);
        setLoading(false);
      });
  }, [id]);

  const handlePayNow = async () => {
  try {
    setPaying(true);

    const res = await fetch(
      "http://localhost:5000/api/payments/initiate",
      {
        method: "POST",
        credentials: "include", // 🔥 VERY IMPORTANT
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order._id,
          currency: order.currency || "INR",
        }),
      }
    );

    const data = await res.json();

    // 🟣 RAZORPAY FLOW
    if (data.gateway === "razorpay") {
      const options = {
        key: data.key,
        amount: data.amount,
        currency: "INR",
        order_id: data.orderId,
        name: "MAE Electricals",
        description: `Order ${order.orderNumber}`,

        handler: async (response) => {
          await fetch(
            "http://localhost:5000/api/payments/razorpay/verify",
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...response,
                orderId: order._id,
              }),
            }
          );

          window.location.reload(); // refresh after payment
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }

    // 🌍 STRIPE FLOW
    if (data.gateway === "stripe") {
      window.location.href = data.checkoutUrl;
    }

  } catch (err) {
    console.error(err);
    alert("Payment failed");
  } finally {
    setPaying(false);
  }
};

  if (loading) return <p className="p-6">Loading...</p>;
  if (!order) return <p className="p-6">Order not found</p>;

  return (
    <div className="pt-28 p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">

        {/* HEADER */}
        <h1 className="text-2xl font-bold mb-6">
          Order #{order.orderNumber}
        </h1>

        {/* ITEMS */}
        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item.productId}
              className="flex justify-between items-start border-b pb-3"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {item.name} × {item.quantity}
                </p>
                <p className="text-xs text-gray-400">
                  Part No: {item.partNumber || "N/A"}
                </p>
              </div>

              <span className="font-medium">
                ₹ {item.lineTotal}
              </span>
            </div>
          ))}
        </div>

        {/* TOTAL */}
        <div className="border-t mt-5 pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹ {order.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>GST</span>
            <span>₹ {order.tax}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹ {order.total}</span>
          </div>
        </div>

        {/* ACTION */}
        {order.status === "created" && (
          <button
            onClick={handlePayNow}
            disabled={paying}
            className="mt-6 w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition"
          >
            {paying ? "Processing..." : "Pay Now"}
          </button>
        )}

        {order.status === "paid" && (
          <p className="mt-4 text-green-600 text-center font-medium">
            ✅ Payment Successful
          </p>
        )}
      </div>
    </div>
  );
}

export default OrderDetails;