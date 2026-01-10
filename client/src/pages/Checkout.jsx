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

  if (cartItems.length === 0) {
    return <p className="p-6 text-center">Your cart is empty.</p>;
  }

  const isFormValid = () =>
    customer.name &&
    customer.email &&
    customer.phone &&
    customer.address;

  const placeOrder = async () => {
    if (!isFormValid()) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setPlacingOrder(true);
      setError("");

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          customer,
          currency,
          items: cartItems.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
        }),
      });

      const order = await res.json();
      if (!res.ok) throw new Error(order.message || "Order failed");

      clearCart();
      navigate("/order-success", { state: { order } });
    } catch (err) {
      setError(err.message || "Order failed");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-6">Checkout</h2>

      {/* CUSTOMER FORM */}
      <div className="grid gap-4 mb-6">
        <input
          placeholder="Full Name"
          className="border p-3 rounded"
          value={customer.name}
          onChange={(e) =>
            setCustomer({ ...customer, name: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email Address"
          className="border p-3 rounded"
          value={customer.email}
          onChange={(e) =>
            setCustomer({ ...customer, email: e.target.value })
          }
        />
        <input
          placeholder="Phone Number"
          className="border p-3 rounded"
          value={customer.phone}
          onChange={(e) =>
            setCustomer({ ...customer, phone: e.target.value })
          }
        />
        <textarea
          placeholder="Delivery Address"
          className="border p-3 rounded"
          rows="3"
          value={customer.address}
          onChange={(e) =>
            setCustomer({ ...customer, address: e.target.value })
          }
        />
      </div>

      {/* CURRENCY */}
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="border p-3 rounded w-full mb-4"
      >
        <option value="INR">INR – India</option>
        <option value="USD">USD – USA</option>
        <option value="EUR">EUR – Europe</option>
        <option value="GBP">GBP – UK</option>
        <option value="SGD">SGD – Singapore</option>
      </select>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <button
        onClick={placeOrder}
        disabled={placingOrder || !isFormValid()}
        className="w-full bg-purple-700 text-white py-3 rounded"
      >
        {placingOrder ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}

export default Checkout;
