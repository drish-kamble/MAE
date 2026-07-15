import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");
  const [currency, setCurrency] = useState("INR");

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const placeOrder = async () => {
    try {
      setPlacingOrder(true);
      setError("");

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          customer,
          currency,
          items: cartItems.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      clearCart();
      navigate("/order-success", { state: { order: data } });
    } catch (err) {
      setError(err.message);
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
      {/* FORM */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">Shipping Details</h2>

        <div className="grid gap-4">
          <input
            placeholder="Full Name"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-purple-500"
            value={customer.name}
            onChange={(e) =>
              setCustomer({ ...customer, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-purple-500"
            value={customer.email}
            onChange={(e) =>
              setCustomer({ ...customer, email: e.target.value })
            }
          />

          <input
            placeholder="Phone"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-purple-500"
            value={customer.phone}
            onChange={(e) =>
              setCustomer({ ...customer, phone: e.target.value })
            }
          />

          <textarea
            placeholder="Address"
            rows="3"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-purple-500"
            value={customer.address}
            onChange={(e) =>
              setCustomer({ ...customer, address: e.target.value })
            }
          />
        </div>
      </div>

      {/* SUMMARY */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        {cartItems.map((item) => (
          <div key={item._id} className="mb-3">
            <div className="flex justify-between text-sm">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>
                ₹ {(item.price * item.quantity).toLocaleString("en-IN")}
              </span>
            </div>

            {/* PART NUMBER */}
            <p className="text-xs text-gray-400">
              Part No: {item.partNumber || "N/A"}
            </p>
          </div>
        ))}

        <div className="border-t my-4"></div>

        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="border p-2 rounded-lg w-full mb-4"
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="SGD">SGD</option>
        </select>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <button
          onClick={placeOrder}
          disabled={placingOrder}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-xl shadow hover:scale-[1.02] transition"
        >
          {placingOrder ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}

export default Checkout;