import { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);

  // 🔍 Search & Filter
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");

  // 📄 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // Fetch products (THIS effect is valid)
  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  // Unique product types
  const productTypes = [
    "ALL",
    ...new Set(products.map((p) => p.productType).filter(Boolean)),
  ];

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      `${product.name} ${product.brand}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesType =
      typeFilter === "ALL" ||
      product.productType === typeFilter;

    return matchesSearch && matchesType;
  });

  // Pagination logic
  const totalPages = Math.ceil(
    filteredProducts.length / ITEMS_PER_PAGE
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">Products</h1>

      {/* 🔍 SEARCH + FILTER */}
      <div className="flex flex-wrap gap-4 mb-6">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // ✅ reset here
          }}
          className="border p-3 rounded w-full sm:w-64"
        />

        <select
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setCurrentPage(1); // ✅ reset here
          }}
          className="border p-3 rounded"
        >
          {productTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

      </div>

      {/* 🧱 PRODUCT GRID */}
      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : paginatedProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {paginatedProducts.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <div className="border rounded-lg p-4 shadow hover:shadow-md transition cursor-pointer h-full">

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

      {/* 📄 PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 border rounded
                  ${
                    page === currentPage
                      ? "bg-purple-700 text-white"
                      : "bg-white"
                  }
                `}
              >
                {page}
              </button>
            )
          )}
        </div>
      )}

    </div>
  );
}

export default Products;
