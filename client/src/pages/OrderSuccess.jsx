import { useLocation, useNavigate } from "react-router-dom";

function OrderSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;

  if (!order) {
    return (
      <div className="p-6 text-center">
        <p>Order not found.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-purple-700 text-white rounded"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">
        🎉 Order Placed Successfully
      </h1>

      <p className="mb-2">
        <strong>Order Number:</strong> {order.orderNumber}
      </p>

      <p className="mb-6 text-gray-600">
        We’ve received your order and will contact you shortly.
      </p>

      <div className="border rounded-lg p-4 text-left">
        <h2 className="font-semibold mb-2">Order Summary</h2>

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
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 bg-purple-700 text-white rounded"
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default OrderSuccess;
