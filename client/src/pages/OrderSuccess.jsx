import { useLocation, useNavigate } from "react-router-dom";

function OrderSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;

  if (!order) {
    return (
      <div className="pt-28 text-center">
        <p>Order not found</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-5 py-2 bg-purple-600 text-white rounded-xl"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 p-6 max-w-3xl mx-auto">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center border border-gray-100">

        <h1 className="text-3xl font-bold mb-3 text-green-600">
          🎉 Order Confirmed
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you! Your order has been placed successfully.
        </p>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
          <p className="font-semibold mb-2">
            Order #{order.orderNumber}
          </p>

          {order.items.map((item) => (
            <div
              key={item.productId}
              className="flex justify-between text-sm"
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹ {item.lineTotal}</span>
            </div>
          ))}

          <div className="border-t mt-3 pt-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹ {order.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>GST</span>
              <span>₹ {order.tax}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹ {order.total}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate("/orders")}
          className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition"
        >
          View My Orders
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;