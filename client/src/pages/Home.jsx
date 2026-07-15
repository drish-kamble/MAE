import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import QuoteForm from "../components/QuoteForm";
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import CUBIC from "../assets/CUBIC.png";

function Home() {
  const location = useLocation();
  const productName = location.state?.productName || "";
  const navigate = useNavigate();

  const aboutRef = useRef(null);
  const quoteRef = useRef(null);

  // ✅ SLIDER LOGIC
  const images = [hero1, hero2];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // ✅ SCROLL LOGIC
  useEffect(() => {
  if (location.state?.scrollTo === "about" && aboutRef.current) {
    aboutRef.current.scrollIntoView({ behavior: "smooth" });
    navigate(".", { replace: true });
  }

  if (location.state?.scrollTo === "contact" && quoteRef.current) {
    quoteRef.current.scrollIntoView({ behavior: "smooth" });
    navigate(".", { replace: true });
  }

  if (location.state?.quote && quoteRef.current) {
    quoteRef.current.scrollIntoView({ behavior: "smooth" });
    navigate(".", { replace: true });
  }
}, [location]);

  return (
    <div className="pt-20 bg-white overflow-hidden">

      {/* 🔥 HERO */}
      <section className="relative h-[90vh] flex items-center justify-center text-white">

        {/* BACKGROUND SLIDER */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: `url(${images[current]})` }}
          ></div>

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"></div>
        </div>

        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative text-center px-6"
        >
          <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">
            Industrial Electrical Solutions
          </h1>

          <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-200">
            Reliable components, trusted brands, and efficient supply
            for your industrial and automation needs.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/products"
              className="px-6 py-3 bg-primary rounded shadow hover:scale-105 transition"
            >
              View Products
            </Link>

            <Link
              to="/"
              state={{ scrollTo: "contact" }}
              className="px-6 py-3 border border-white rounded hover:bg-white hover:text-black transition"
            >
              Get Quote
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6 bg-white">
  <div className="max-w-6xl mx-auto text-center">

    <h2 className="text-3xl font-bold mb-4">
      Why Choose MAE Electricals
    </h2>

    <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
      We deliver reliable electrical solutions backed by quality products,
      trusted partnerships, and a commitment to excellence.
    </p>

    <div className="grid md:grid-cols-4 gap-8">

      {[
        {
          title: "Genuine Products",
          desc: "We supply only authentic and certified electrical components ensuring safety and durability."
        },
        {
          title: "Trusted Brands",
          desc: "Authorized dealers of leading global brands known for performance and reliability."
        },
        {
          title: "Industrial Grade",
          desc: "Products designed to withstand demanding industrial environments and heavy-duty use."
        },
        {
          title: "Reliable Supply",
          desc: "Consistent stock availability and timely delivery to keep your operations running."
        }
      ].map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          viewport={{ once: true }}
          className="p-6 rounded-xl border bg-gray-50 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition text-left"
        >
          <div className="mb-4 text-primary text-2xl">
            ⚡
          </div>

          <h3 className="font-semibold text-lg mb-2">
            {item.title}
          </h3>

          <p className="text-gray-600 text-sm leading-relaxed">
            {item.desc}
          </p>
        </motion.div>
      ))}

    </div>
  </div>
</section>

      {/* ABOUT */}
    {/* ABOUT */}
<section ref={aboutRef} className="py-24 px-6 bg-gray-100">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

    {/* LEFT TEXT */}
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold mb-6">
        About MAE Electricals
      </h2>

      <p className="text-gray-700 mb-4 leading-relaxed">
        MAE Electricals is a trusted supplier of high-quality electrical
        components catering to industrial, commercial, and automation sectors.
      </p>

      <p className="text-gray-700 mb-4 leading-relaxed">
        With a strong focus on reliability and performance, we partner with
        leading brands to deliver solutions that meet the highest industry standards.
      </p>

      <p className="text-gray-700 leading-relaxed">
        Our mission is to provide dependable products and exceptional service,
        helping businesses operate efficiently and safely.
      </p>
    </motion.div>

    {/* RIGHT SIDE STATS */}
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="grid grid-cols-2 gap-6"
    >
      {[
        { value: "10+", label: "Years Experience" },
        { value: "500+", label: "Products Supplied" },
        { value: "200+", label: "Clients Served" },
        { value: "100%", label: "Quality Assurance" }
      ].map((item) => (
        <div
          key={item.label} // ✅ FIX ADDED HERE
          className="bg-white p-6 rounded-xl shadow text-center"
        >
          <h3 className="text-2xl font-bold text-primary">
            {item.value}
          </h3>
          <p className="text-gray-600 text-sm">
            {item.label}
          </p>
        </div>
      ))}
    </motion.div>

  </div>
</section>

      {/* 🔥 OUR PARTNER */}
<section className="py-24 px-6 bg-white">
  <div className="max-w-5xl mx-auto text-center">

    <h2 className="text-3xl font-bold mb-4">
      Our Trusted Partner
    </h2>

    <p className="text-gray-600 mb-12">
      We proudly collaborate with a leading industry brand to deliver
      high-quality electrical solutions.
    </p>

    {/* PARTNER CARD */}
    <div className="flex justify-center">
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-10 w-full max-w-md shadow-sm hover:shadow-lg transition">

        {/* LOGO */}
        <img
          src={CUBIC}   // 🔥 replace with your actual logo path
          alt="Cubic Logo"
          className="h-16 mx-auto mb-6 object-contain"
        />

        {/* OPTIONAL SUBTEXT */}
        <p className="text-gray-500 text-sm mt-2">
          Authorized Essential Manufactuer
        </p>

      </div>
    </div>

  </div>
</section>

      {/* 🔥 CONTACT + QUOTE */}
      <section ref={quoteRef} className="py-20 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Contact Us
            </h2>

            <p className="text-gray-600 mb-8">
              Have questions or need a quote? Reach out to us directly or fill out the form.
            </p>

            <div className="space-y-4 text-gray-700">
              <p><strong>📞 Phone:</strong> +91 89390 53225</p>
              <p><strong>📧 Email:</strong> sales@macroelectricals.com</p>
              <p><strong>📍 Address:</strong> #374/7A Mariamman Kovil Street Thirukoilpathu, Thirumanam, Voyalanallur, Thiruvallur District, Chennai 600072, India</p>
            </div>
          </div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              Request a Quote
            </h2>

            <QuoteForm
              productName={productName}
              productId={location.state?.productId}
            />
          </motion.div>

        </div>
      </section>

    </div>
  );
}

export default Home;