import { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Products
      </h1>

      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <div className="border rounded-lg p-4 shadow hover:shadow-md transition cursor-pointer">
                
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-contain mb-4"
                />

                <h3 className="font-semibold text-sm mb-1">
                  {product.name}
                </h3>

                <p className="text-xs text-gray-500 mb-2">
                  {product.brand}
                </p>
                
                {product.pricingType === "FIXED" ? (
  <p className="font-bold text-sm">
    {product.currency} {product.price}
  </p>
) : (
  <p className="text-sm font-medium text-gray-600">
    Price on request
  </p>
)}



              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
