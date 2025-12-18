import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Checkout() {
  const { cartItems, clearCart  } = useCart();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
  name: "",
  email: "",
  phone: "",
  address: "",
});


  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <p>Your cart is empty.</p>
      </div>
    );
  }
  const placeOrder = async () => {
  try {
    const orderData = {
      customer,
      items: cartItems.map((item) => ({
        productId: item._id,
        name: item.name,
        brand: item.brand,
        quantity: item.quantity,
      })),
    };

    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) {
      throw new Error("Order failed");
    }

    clearCart();
    alert("Order placed successfully!");
    navigate("/");

  } catch (error) {
    console.error(error);
    alert("Failed to place order. Please try again.");
  }
};


  return (
    <div className="p-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* CUSTOMER DETAILS */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">
          Customer Details
        </h2>

        <form className="space-y-4">
          <input
  type="text"
  placeholder="Full Name"
  className="w-full border p-2 rounded"
  value={customer.name}
  onChange={(e) =>
    setCustomer({ ...customer, name: e.target.value })
  }
  required
/>


          <input
  type="email"
  placeholder="Email"
  className="w-full border p-2 rounded"
  value={customer.email}
  onChange={(e) =>
    setCustomer({ ...customer, email: e.target.value })
  }
  required
/>


          <input
  type="text"
  placeholder="Phone Number"
  className="w-full border p-2 rounded"
  value={customer.phone}
  onChange={(e) =>
    setCustomer({ ...customer, phone: e.target.value })
  }
/>


          <textarea
  placeholder="Delivery Address"
  rows="4"
  className="w-full border p-2 rounded"
  value={customer.address}
  onChange={(e) =>
    setCustomer({ ...customer, address: e.target.value })
  }
/>

        </form>
      </div>

      {/* ORDER SUMMARY */}
      <div className="border rounded-lg p-6 bg-gray-50">
        <h2 className="text-xl font-bold mb-4">
          Order Summary
        </h2>

        <ul className="space-y-2 mb-4">
          {cartItems.map((item) => (
            <li
              key={item._id}
              className="flex justify-between text-sm"
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>
                ₹ {item.price * item.quantity}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex justify-between font-semibold text-lg border-t pt-4">
          <span>Total</span>
          <span>₹ {cartTotal}</span>
        </div>

        <button
          onClick={placeOrder}
          className="w-full mt-6 bg-purple-700 text-white py-2 rounded hover:opacity-90"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;
