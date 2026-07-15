import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // 🧠 Fake loading for skeleton demo
  useEffect(() => {
    setTimeout(() => setLoading(false), 600);
  }, []);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // 💀 Skeleton UI
  if (loading) {
    return (
      <div className="pt-24 p-6 max-w-6xl mx-auto space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-200 h-24 rounded-xl"
          ></div>
        ))}
      </div>
    );
  }

  // EMPTY
  if (cartItems.length === 0) {
    return (
      <div className="pt-24 h-[60vh] flex flex-col justify-center items-center">
        <h2 className="text-3xl mb-4">Cart is empty 🛒</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-purple-700 text-white px-6 py-3 rounded-xl hover:scale-105 transition"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 p-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
      {/* ITEMS */}
      <div className="md:col-span-2 space-y-5">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-lg rounded-2xl p-5 flex justify-between items-center hover:scale-[1.01] transition"
          >
            <div className="flex gap-5">
              <img
                src={item.image}
                className="w-24 h-24 object-contain"
              />

              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.brand}</p>
                <p className="text-xs text-gray-400">
                  Part No: {item.partNumber || "N/A"}
                </p>

                <div className="flex gap-2 mt-2">
                  <button onClick={() => decreaseQty(item._id)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item._id)}>+</button>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="font-semibold">
                ₹ {(item.price * item.quantity).toLocaleString("en-IN")}
              </p>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-xl mb-4">Summary</h2>

        <div className="flex justify-between mb-2">
          <span>Total</span>
          <span>₹ {cartTotal.toLocaleString("en-IN")}</span>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="w-full bg-purple-700 text-white py-3 rounded-xl mt-4 hover:scale-105 transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;