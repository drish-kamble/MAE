import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById } from "../services/api";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProductById(id).then((data) => {
      setProduct(data);
    });
  }, [id]);

  if (!product) {
    return <p className="p-6">Loading product...</p>;
  }

  const isOrderable = product.pricingType === "FIXED";

  return (
    <div className="p-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* IMAGE */}
      <div className="border rounded-lg p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-contain"
        />
      </div>

      {/* DETAILS */}
      <div>
        <h1 className="text-2xl font-bold mb-2">
          {product.name}
        </h1>

        <p className="text-gray-500 mb-4">
          Brand: {product.brand || "N/A"}
        </p>

        {isOrderable ? (
          <>
            <p className="text-xl font-semibold mb-4">
              {product.currency} {product.price}
            </p>

            <button
              onClick={() => addToCart(product)}
              className="px-6 py-2 bg-purple-700 text-white rounded hover:opacity-90"
            >
              Add to Cart
            </button>
          </>
        ) : (
          <>
            <p className="text-lg font-medium mb-4 text-gray-600">
              Price on request
            </p>

            <button
              onClick={() => navigate("/", { state: { quote: true } })}
              className="px-6 py-2 bg-orange-600 text-white rounded hover:opacity-90"
            >
              Request a Quote
            </button>
          </>
        )}

        {product.description && (
          <p className="text-gray-600 mt-6">
            {product.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
