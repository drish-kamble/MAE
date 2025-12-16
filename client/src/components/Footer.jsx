function Footer() {
  return (
    <footer className="bg-primary text-white mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* COMPANY INFO */}
        <div>
          <h3 className="font-semibold text-lg mb-2">
            Macro Automation & Electricals
          </h3>
          <p className="text-sm text-gray-300">
            Supplier of reliable electrical components for
            industrial and commercial applications.
          </p>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-sm text-gray-300">📍 India</p>
          <p className="text-sm text-gray-300">📞 +91 89390 53225</p>
          <p className="text-sm text-gray-300">✉️ sales@macroelectricals.com</p>
        </div>

        {/* BUSINESS INFO */}
        <div>
          <h4 className="font-semibold mb-2">Business Info</h4>
          <p className="text-sm text-gray-300">GST: XXABCDE1234X1Z5</p>
          <p className="text-sm text-gray-300">
            © {new Date().getFullYear()} MAE Electricals
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
