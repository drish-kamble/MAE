import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import QuoteForm from "../components/QuoteForm";

function Home() {
  const location = useLocation();
  const productName = location.state?.productName || "";
  const quoteRef = useRef(null);

  // 🔥 THIS IS THE KEY PART
  useEffect(() => {
    if (location.state?.quote && quoteRef.current) {
      quoteRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="bg-muted min-h-screen p-6">
      <div className="space-y-16">

        {/* HERO SECTION */}
        <section className="text-center py-20 bg-gray-100 rounded-lg">
          <h1 className="text-4xl font-bold mb-4">
            MAE Electricals
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            Reliable Electrical Components for Industrial & Commercial Use
          </p>

          <Link
            to="/products"
            className="inline-block px-6 py-3 bg-secondary text-white rounded hover:bg-primary transition"
          >
            View Products
          </Link>
        </section>

        {/* ABOUT */}
        <section className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            About MAE Electricals
          </h2>
          <p className="text-gray-600 leading-relaxed">
            MAE Electricals is a trusted supplier of electrical components
            for industrial and commercial applications.
          </p>
        </section>

        {/* WHY CHOOSE US */}
        <section className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">
            Why Choose MAE Electricals
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Genuine Products",
              "Trusted Brands",
              "Industrial Grade",
              "Reliable Supply"
            ].map((item) => (
              <div key={item} className="p-6 border rounded-lg">
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* 🔥 QUOTE FORM SECTION */}
        <section
          ref={quoteRef}
          className="bg-gray-100 py-16 px-6 rounded-lg"
        >
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Request a Quote
            </h2>

            <QuoteForm
  productName={productName}
  productId={location.state?.productId}
/>

          </div>
        </section>

      </div>
    </div>
  );
}

export default Home;
