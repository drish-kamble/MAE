import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
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
        <Link to="/#quote" className="hover:underline">
  Request Quote
</Link>

        <Link to="/cart" className="hover:underline">
        Cart
        </Link>

      </div>
    </div>
  );
}

export default Navbar;
