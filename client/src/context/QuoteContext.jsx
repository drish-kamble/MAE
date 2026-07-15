import { createContext, useContext, useState, useEffect } from "react";

const QuoteContext = createContext();

export const QuoteProvider = ({ children }) => {

  // ✅ LOAD FROM LOCAL STORAGE
  const [quoteItems, setQuoteItems] = useState(() => {
    const saved = localStorage.getItem("quoteItems");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ SAVE TO LOCAL STORAGE (AUTO)
  useEffect(() => {
    localStorage.setItem("quoteItems", JSON.stringify(quoteItems));
  }, [quoteItems]);

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

  const clearQuote = () => {
    setQuoteItems([]);
    localStorage.removeItem("quoteItems"); // ✅ CLEAN STORAGE
  };

  return (
    <QuoteContext.Provider
      value={{ quoteItems, addToQuote, removeFromQuote, clearQuote }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => useContext(QuoteContext);