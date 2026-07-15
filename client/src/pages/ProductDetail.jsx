import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById } from "../services/api";
import { useCart } from "../context/CartContext";
import { useQuote } from "../context/QuoteContext";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { addToQuote } = useQuote();

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const data = await fetchProductById(id);
      setProduct(data);
      setLoading(false);
    };

    loadProduct();
  }, [id]);

  // 🔥 Skeleton loading
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 pt-24 pb-10 grid md:grid-cols-2 gap-8">
        <div className="h-72 bg-gray-200 rounded-xl animate-pulse"></div>
        <div>
          <div className="h-6 bg-gray-200 w-3/4 mb-4 rounded"></div>
          <div className="h-4 bg-gray-200 w-1/2 mb-2 rounded"></div>
          <div className="h-4 bg-gray-200 w-1/3 mb-6 rounded"></div>
          <div className="h-10 bg-gray-200 w-40 rounded"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <p className="p-6">Product not found</p>;
  }

  const isOrderable = product.pricingType === "FIXED";

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 pt-24 pb-10">

        {/* 🔗 BREADCRUMB */}
        <div className="mb-6 text-sm text-gray-500 flex items-center gap-2">

  {/* HOME */}
  <Link to="/" className="hover:text-primary transition">
    Home
  </Link>

  <span className="text-gray-300">/</span>

  {/* PRODUCTS */}
  <Link to="/products" className="hover:text-primary transition">
    Products
  </Link>

  <span className="text-gray-300">/</span>

  {/* CURRENT PRODUCT */}
  <span className="text-gray-800 font-medium truncate max-w-[200px]">
    {product.name}
  </span>

</div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* 🖼 IMAGE */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <img
              src={product.image || "/placeholder.png"}
              alt={product.name}
              className="w-full h-72 object-contain"
            />
          </div>

          {/* 📦 DETAILS */}
          <div className="flex flex-col">

            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
              {product.name}
            </h1>

            <p className="text-gray-500 mb-1">
              Brand: {product.brand || "N/A"}
            </p>

            <p className="text-sm text-gray-500 mb-4">
              Part No:{" "}
              <span className="font-medium text-gray-800">
                {product.partNumber}
              </span>
            </p>

            {/* 💰 PRICE */}
            {isOrderable ? (
              <p className="text-2xl font-bold text-primary mb-6">
                ₹ {product.price}
              </p>
            ) : (
              <p className="text-lg text-gray-600 mb-6">
                Price on request
              </p>
            )}

            {/* 🔘 ACTION BUTTONS */}
            <div className="flex flex-wrap gap-3">

              {isOrderable ? (
                <button
                  onClick={() => addToCart(product)}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
                >
                  Add to Cart
                </button>
              ) : (
                <button
                  onClick={() => addToQuote(product)}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
                >
                  Add to Quote
                </button>
              )}

              {/* 📄 DATASHEET BUTTON */}
              {product.datasheet && (
                <a
                  href={product.datasheet}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 border rounded-lg hover:bg-gray-100 transition"
                >
                  View Datasheet
                </a>
              )}

            </div>

            {/* 📝 DESCRIPTION */}
            {product.description && (
              <div className="mt-8 border-t pt-6">
                <h2 className="text-lg font-semibold mb-2">
                  Description
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetail;