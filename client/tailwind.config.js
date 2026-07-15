export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6b2a8a",   // purple
        secondary: "#0b3c8c", // blue
        muted: "#f5f5f5",
      },

      // 🔥 Better font feel
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      // 🔥 Subtle shadows for cards
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.06)",
        cardHover: "0 8px 20px rgba(0,0,0,0.12)",
      },
    },
  },

  plugins: [
    require("@tailwindcss/line-clamp"), // 🔥 important
  ],
};