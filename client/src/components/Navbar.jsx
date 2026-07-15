import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useQuote } from "../context/QuoteContext"; // ✅ ADDED

function Navbar() {
  const { cartItems } = useCart();
  const { quoteItems } = useQuote(); // ✅ ADDED
  const { user, isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const profileRef = useRef();

  const cartCount = cartItems.reduce((t, i) => t + i.quantity, 0);
  const quoteCount = quoteItems.length; // ✅ ADDED

  // 🔥 NAVIGATION
  const scrollToSection = (section) => {
    navigate("/", { state: { scrollTo: section } });
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setProfileOpen(false);
    setMenuOpen(false);
  };

  // 🔥 CLOSE DROPDOWN
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔥 SCROLL
  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);

      if (y < 500) setActiveSection("home");
      else if (y < 1400) setActiveSection("about");
      else setActiveSection("contact");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // 🎯 ACTIVE LINK
  const navClass = (section) => {
    if (location.pathname !== "/") {
      return location.pathname === `/${section}`
        ? "text-purple-600 font-semibold"
        : "hover:text-purple-500 transition";
    }

    return activeSection === section
      ? "text-purple-600 font-semibold"
      : "hover:text-purple-500 transition";
  };

  return (
    <>
      <div
        className={`fixed top-0 w-full z-50 transition ${
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow text-black"
            : "bg-primary text-white"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} className="h-10" />
            <span className="font-semibold">MAE Electricals</span>
          </Link>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-6">

            <button onClick={() => scrollToSection("home")} className={navClass("home")}>
              Home
            </button>

            <Link to="/products" className={navClass("products")}>
              Products
            </Link>

            {/* ✅ QUOTE TAB ADDED */}
            <Link to="/quote" className="relative hover:text-purple-500">
              Quote
              {quoteCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-purple-600 text-white text-xs px-2 rounded-full">
                  {quoteCount}
                </span>
              )}
            </Link>

            <button onClick={() => scrollToSection("about")} className={navClass("about")}>
              About
            </button>

            <button onClick={() => scrollToSection("contact")} className={navClass("contact")}>
              Contact
            </button>

            {/* CART */}
            <Link to="/cart" className="relative hover:text-purple-500">
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* PROFILE */}
            <div className="relative" ref={profileRef}>
              {!isAuthenticated ? (
                <Link
                  className="px-4 py-2 border rounded-full hover:bg-gray-100"
                  to="/auth"
                >
                  Login
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition"
                  >
                    <div className="w-9 h-9 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-full flex items-center justify-center font-semibold shadow">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <span className="hidden md:block font-medium">{user?.name}</span>
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-4 w-72 backdrop-blur-xl bg-white/80 border rounded-2xl shadow-2xl overflow-hidden z-50"
                      >

                        <div className="px-5 py-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white">
                          <p className="font-semibold">{user?.name}</p>
                          <p className="text-xs opacity-80">{user?.email}</p>
                        </div>

                        <div className="py-2 text-sm">

                          <Link
                            to="/orders"
                            onClick={() => setProfileOpen(false)}
                            className="px-5 py-3 block hover:bg-purple-50"
                          >
                            📦 My Orders
                          </Link>

                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-5 py-3 text-red-500 hover:bg-red-50"
                          >
                            🚪 Logout
                          </button>

                        </div>

                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button className="md:hidden text-2xl" onClick={() => setMenuOpen(true)}>
            ☰
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;