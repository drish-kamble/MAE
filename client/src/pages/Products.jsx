import { useEffect, useState } from "react";
import { fetchProducts, fetchProductTypes } from "../services/api";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [productTypes, setProductTypes] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 🔄 Fetch PRODUCTS
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);

      const data = await fetchProducts({
        search,
        type: typeFilter,
        page: currentPage,
      });

      setProducts(data.products);
      setTotalPages(data.totalPages);

      setLoading(false);
    };

    loadProducts();
  }, [search, typeFilter, currentPage]);

  // 🔄 Fetch TYPES
  useEffect(() => {
    const loadTypes = async () => {
      const types = await fetchProductTypes();
      setProductTypes(["ALL", ...types]);
    };

    loadTypes();
  }, []);

  // 🔥 Smooth scroll on page change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-10">

        {/* 🔗 BREADCRUMB */}
        <div className="mb-6 text-sm text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>
          <span>/</span>
          <span>Products</span>
          {typeFilter !== "ALL" && (
            <>
              <span>/</span>
              <span className="text-gray-800 font-medium">
                {typeFilter}
              </span>
            </>
          )}
        </div>

        {/* 🔥 HEADER */}
        <div className="mb-10 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="w-10 h-1 bg-primary rounded mb-4"></div>

          <h1 className="text-3xl font-semibold text-gray-900">
            Explore our industrial catalog
          </h1>

          <p className="text-gray-500 mt-2 max-w-xl">
            Browse high-quality electrical components including MCBs and enclosures.
          </p>
        </div>

        {/* 🔍 SEARCH + FILTER */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 px-5 py-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
          />

          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-5 py-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-primary"
          >
            {productTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>

        </div>

        {/* 🧱 PRODUCT GRID */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="h-44 bg-gray-200 rounded-xl mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-500 py-16 text-lg">
            No products found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

            {products.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id}>
                <div className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 hover:border-primary/30 h-full flex flex-col">

                  {/* IMAGE */}
                  <div className="h-44 bg-gray-50 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                    <img
                      src={product.image || "/placeholder.png"}
                      onError={(e) => (e.target.src = "/placeholder.png")}
                      alt={product.name}
                      className="max-h-full object-contain transition duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="flex flex-col flex-grow">

                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                      {product.name}
                    </h3>

                    <p className="text-xs text-gray-400 mb-3">
                      {product.brand || "—"}
                    </p>

                    <div className="mt-auto flex items-center justify-between">

                      {product.pricingType === "FIXED" ? (
                        <p className="font-semibold text-primary text-sm">
                          ₹ {product.price}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-500">
                          Quote
                        </p>
                      )}

                      <span className="text-xs text-gray-400 group-hover:text-primary transition">
                        View →
                      </span>

                    </div>

                  </div>

                </div>
              </Link>
            ))}

          </div>
        )}

        {/* 📄 PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">

            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-md border bg-white hover:bg-primary hover:text-white transition disabled:opacity-40"
            >
              ←
            </button>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Page</span>

              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="border px-3 py-1 rounded-md bg-white focus:outline-none"
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <option key={page} value={page}>
                      {page}
                    </option>
                  )
                )}
              </select>

              <span className="text-gray-600">/ {totalPages}</span>
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, totalPages)
                )
              }
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-md border bg-white hover:bg-primary hover:text-white transition disabled:opacity-40"
            >
              →
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default Products;