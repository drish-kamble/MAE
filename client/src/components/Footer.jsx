import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-primary text-white mt-20">

      {/* MAIN FOOTER */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">

        {/* COMPANY */}
        <div>
          <h3 className="text-xl font-bold mb-4">
            Macro Automation & Electricals
          </h3>

          <p className="text-sm text-gray-300 leading-relaxed">
            Delivering high-quality electrical components and automation
            solutions for industrial and commercial applications.
            Built on trust, reliability, and performance.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>

          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/" className="hover:text-white hover:pl-1 transition-all duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-white hover:pl-1 transition-all duration-200">
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/"
                state={{ scrollTo: "about" }}
                className="hover:text-white hover:pl-1 transition-all duration-200"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/"
                state={{ scrollTo: "contact" }}
                className="hover:text-white hover:pl-1 transition-all duration-200"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>

          <div className="space-y-3 text-sm text-gray-300">
            <p>📍 Chennai, India</p>
            <p>📞 +91 89390 53225</p>
            <p>✉️ sales@macroelectricals.com</p>
          </div>
        </div>

        {/* BUSINESS */}
        <div>
          <h4 className="font-semibold mb-4">Business Info</h4>

          <div className="space-y-3 text-sm text-gray-300">
            <p>GST: XXABCDE1234X1Z5</p>
            <p>Working Hours:</p>
            <p>Mon – Sat: 9:00 AM – 7:00 PM</p>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/20 py-5 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} Macro Automation & Electricals. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;