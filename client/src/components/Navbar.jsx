import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useQuote } from "../context/QuoteContext";

function Navbar() {
  const { cartItems } = useCart();
  const { quoteItems } = useQuote();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const cartCount = cartItems.reduce((t, i) => t + i.quantity, 0);
  const quoteCount = quoteItems.reduce((t, i) => t + i.quantity, 0);

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-primary text-white">
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="MAE Logo" className="h-10 w-auto" />
        <span className="font-semibold">
          Macro Automation & Electricals
        </span>
      </Link>

      {/* NAV LINKS */}
      <div className="flex items-center gap-6">
        <Link to="/" className="hover:text-secondary">
          Home
        </Link>

        <Link to="/products" className="hover:text-secondary">
          Products
        </Link>

        {/* QUOTE */}
        <Link to="/quote" className="relative hover:text-secondary">
          Quote
          {quoteCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full px-2">
              {quoteCount}
            </span>
          )}
        </Link>

        {/* CART */}
        <Link to="/cart" className="relative hover:text-secondary">
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full px-2">
              {cartCount}
            </span>
          )}
        </Link>

        {/* ADMIN */}
        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="px-3 py-1 border border-white rounded hover:bg-white hover:text-primary"
          >
            Admin
          </Link>
        )}

        {!isAuthenticated ? (
          <Link
            to="/auth"
            className="px-4 py-2 border border-white rounded hover:bg-white hover:text-primary"
          >
            Login
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-sm">
              Hi, {user?.name}
            </span>

            <Link to="/orders" className="hover:underline text-sm">
              My Orders
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-1 border border-white rounded hover:bg-white hover:text-primary"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
