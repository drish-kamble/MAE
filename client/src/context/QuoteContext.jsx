/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const QuoteContext = createContext();

export const QuoteProvider = ({ children }) => {
  const [quoteItems, setQuoteItems] = useState([]);

  const addToQuote = (product, quantity = 1) => {
    setQuoteItems((prev) => {
      const exists = prev.find((i) => i.productId === product._id);

      if (exists) {
        return prev.map((i) =>
          i.productId === product._id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }

      return [
        ...prev,
        {
          productId: product._id,
          name: product.name,
          partNumber: product.partNumber,
          quantity,
        },
      ];
    });
  };

  const removeFromQuote = (productId) => {
    setQuoteItems((prev) =>
      prev.filter((i) => i.productId !== productId)
    );
  };

  const clearQuote = () => setQuoteItems([]);

  return (
    <QuoteContext.Provider
      value={{ quoteItems, addToQuote, removeFromQuote, clearQuote }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => useContext(QuoteContext);
