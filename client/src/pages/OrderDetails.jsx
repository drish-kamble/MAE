import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOrderById, getAuthHeaders } from "../services/api";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    fetchOrderById(id).then((data) => {
      setOrder(data);
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
          headers: getAuthHeaders(),
          body: JSON.stringify({
            orderId: order._id,
            currency: order.currency, // ✅ IMPORTANT
          }),
        }
      );

      const data = await res.json();

      // 🇮🇳 Razorpay
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
                headers: getAuthHeaders(),
                body: JSON.stringify({
                  ...response,
                  orderId: order._id,
                }),
              }
            );
            window.location.reload();
          },
        };

        new window.Razorpay(options).open();
      }

      // 🌍 Stripe
      if (data.gateway === "stripe") {
        window.location.href = data.checkoutUrl;
      }
    } catch (err) {
      alert("Payment failed. Try again.");
    } finally {
      setPaying(false);
    }
  };

  if (loading) return <p className="p-6">Loading order...</p>;
  if (!order) return <p className="p-6">Order not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Order #{order.orderNumber}
      </h1>

      <div className="border rounded p-4 mb-6">
        {order.items.map((item) => (
          <div key={item.productId} className="flex justify-between">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>₹ {item.lineTotal}</span>
          </div>
        ))}

        <div className="border-t mt-3 pt-3">
          <p>Subtotal: ₹{order.subtotal}</p>
          <p>GST: ₹{order.tax}</p>
          <p className="font-semibold">Total: ₹{order.total}</p>
        </div>
      </div>

      {order.status === "created" && (
        <button
          onClick={handlePayNow}
          disabled={paying}
          className="w-full bg-purple-700 text-white py-3 rounded"
        >
          {paying ? "Processing..." : "Pay Now"}
        </button>
      )}

      {order.status === "paid" && (
        <p className="text-green-600 text-center">
          ✅ Payment successful
        </p>
      )}
    </div>
  );
}

export default OrderDetails;
