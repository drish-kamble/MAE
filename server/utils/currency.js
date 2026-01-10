const BASE = "INR";

export const convertFromINR = async (amountINR, targetCurrency) => {
  if (!targetCurrency || targetCurrency === "INR") {
    return {
      convertedAmount: amountINR,
      rate: 1,
    };
  }

  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${BASE}`
  );

  const data = await res.json();

  if (!data.conversion_rates?.[targetCurrency]) {
    throw new Error("Unsupported currency");
  }

  const rate = data.conversion_rates[targetCurrency];

  return {
    convertedAmount: Math.round(amountINR * rate * 100) / 100,
    rate,
  };
};
