import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  // Calculate cart total
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();


  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Cart</h1>

      {/* EMPTY CART */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {/* CART ITEMS */}
          <ul className="space-y-4">
            {cartItems.map((item, index) => (
              <li
                key={item._id}
                className="border p-4 rounded flex justify-between items-center"
              >
                {/* LEFT SIDE */}
                <div className="flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-contain border"
                  />

                  <div>
                    <p className="font-semibold">{item.name}</p>

                    <p className="text-xs text-gray-500">
                      Brand: {item.brand}
                    </p>

                    {/* QUANTITY CONTROLS */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decreaseQty(item._id)}
                        className="px-2 py-1 border rounded"
                      >
                        −
                      </button>

                      <span className="px-3">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item._id)}
                        className="px-2 py-1 border rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="text-right">
                  <p className="font-semibold mb-2">
                    ₹ {item.price * item.quantity}
                  </p>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* CART TOTAL */}
          <div className="mt-8 flex justify-end">
            <div className="border rounded-lg p-4 w-full max-w-sm bg-gray-50">
              <div className="flex justify-between text-lg font-semibold mb-4">
                <span>Subtotal</span>
                <span>₹ {cartTotal}</span>
              </div>

              <button
                className="w-full bg-purple-700 text-white py-2 rounded hover:opacity-90"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
