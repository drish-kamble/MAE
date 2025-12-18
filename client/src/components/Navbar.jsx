import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartItems } = useCart();
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-primary text-white">
      
      {/* LOGO + BRAND */}
      <Link to="/" className="flex items-center gap-3">
        <img
          src={logo}
          alt="MAE Logo"
          className="h-10 w-auto"
        />
        <span className="font-semibold">
          Macro Automation & Electricals
        </span>
      </Link>

      {/* NAV LINKS */}
      <div className="flex gap-6">
        <Link to="/" className="hover:text-secondary">
          Home
        </Link>
        <Link to="/products" className="hover:text-secondary">
          Products
        </Link>
        
        <Link to="/cart" className="relative flex items-center gap-1">
  <span>Cart</span>

  {cartItems.length > 0 && (
    <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
      {cartItems.reduce((total, item) => total + item.quantity, 0)}
    </span>
  )}
</Link>



      </div>
    </div>
  );
}

export default Navbar;
