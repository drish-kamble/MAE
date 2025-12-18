import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

const addToCart = (product) => {
  setCartItems((prev) => {
    const existingIndex = prev.findIndex(
      (item) => item._id === product._id
    );

    if (existingIndex !== -1) {
      return prev.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [...prev, { ...product, quantity: 1 }];
  });
};

const increaseQty = (id) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

const decreaseQty = (id) => {
  setCartItems((prev) =>
    prev
      .map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

const removeFromCart = (indexToRemove) => {
  setCartItems((prev) =>
    prev.filter((_, index) => index !== indexToRemove)
  );
};

const clearCart = () => {
  setCartItems([]);
};

  return (
    <CartContext.Provider
  value={{
    cartItems,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
  }}
>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
