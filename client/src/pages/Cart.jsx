import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems } = useCart();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item, index) => (
            <li
  key={index}
  className="border p-4 rounded flex gap-4 items-center"
>
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
    <p className="text-sm text-gray-600">
      {item.currency} {item.price}
    </p>
  </div>
</li>

          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
