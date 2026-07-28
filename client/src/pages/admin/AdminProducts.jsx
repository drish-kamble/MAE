import { useEffect, useState } from "react";
import {
  Search,
  Package,
  FileSpreadsheet,
} from "lucide-react";

const API_BASE = "https://macroelectricals.onrender.com/api";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [page, search]);

  async function fetchProducts() {
    try {
      setLoading(true);

      const res = await fetch(
        `${API_BASE}/products?page=${page}&limit=20&search=${search}`
      );

      const data = await res.json();

      setProducts(data.products || []);
      setTotalPages(data.totalPages || 1);
      setTotalProducts(data.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">

        <div>

          <h1 className="text-4xl font-bold text-gray-800">
            Products
          </h1>

          <p className="text-gray-500 mt-2">
            Product catalogue managed through Excel Database
          </p>

          <div className="flex gap-6 mt-4">

            <div className="bg-white shadow rounded-xl px-5 py-3">

              <p className="text-xs uppercase text-gray-500">
                Total Products
              </p>

              <h3 className="text-2xl font-bold text-primary">
                {totalProducts}
              </h3>

            </div>

            <div className="bg-white shadow rounded-xl px-5 py-3">

              <p className="text-xs uppercase text-gray-500">
                Current Page
              </p>

              <h3 className="text-2xl font-bold">
                {page}/{totalPages}
              </h3>

            </div>

          </div>

        </div>

        <button
  disabled
  title="Coming Soon"
  className="bg-gray-300 text-gray-500 cursor-not-allowed px-6 py-4 rounded-xl flex items-center gap-3 shadow"
>
    <FileSpreadsheet size={22}/>
    Import Excel
</button>

      </div>

      {/* Search */}

      <div className="bg-white rounded-2xl shadow-lg p-5">

        <div className="flex items-center gap-4">

          <Search
            className="text-primary"
            size={22}
          />

          <input
            type="text"
            placeholder="Search by Product Name, Brand..."
            className="w-full outline-none text-lg"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

        </div>

      </div>

      {/* Showing */}

      <div className="flex justify-between items-center">

        <p className="text-gray-600">

          Showing

          <span className="font-bold text-primary">
            {" "}
            {products.length}
            {" "}
          </span>

          of

          <span className="font-bold text-primary">
            {" "}
            {totalProducts}
            {" "}
          </span>

          products

        </p>

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-primary text-white">

            <tr>

              <th className="text-left p-5">
                Image
              </th>

              <th className="text-left p-5">
                Product
              </th>

              <th className="text-left p-5">
                Part Number
              </th>

              <th className="text-left p-5">
                Brand
              </th>

              <th className="text-left p-5">
                Category
              </th>

              <th className="text-left p-5">
                Pricing
              </th>

              <th className="text-left p-5">
                Stock
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="7"
                  className="text-center py-16"
                >

                  Loading Products...

                </td>

              </tr>

            ) : products.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="text-center py-16 text-gray-500"
                >

                  No Products Found

                </td>

              </tr>

            ) : (

              products.map((product) => (

                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="p-5">

                    {product.image ? (

                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 rounded-xl border object-cover"
                      />

                    ) : (

                      <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center">

                        <Package />

                      </div>

                    )}

                  </td>

                  <td className="p-5">

                    <h3 className="font-semibold text-lg">

                      {product.name}

                    </h3>

                  </td>

                  <td className="p-5">

                    {product.partNumber}

                  </td>

                  <td className="p-5">

                    {product.brand}

                  </td>

                  <td className="p-5">

                    {product.productType}

                  </td>

                  <td className="p-5">

                    {product.pricingType === "FIXED" ? (

                      <span className="font-semibold">

                        ₹ {product.price}

                      </span>

                    ) : (

                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">

                        QUOTATION

                      </span>

                    )}

                  </td>

                  <td className="p-5">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        product.stockStatus === "IN_STOCK"
                          ? "bg-green-100 text-green-700"
                          : product.stockStatus === "LOW_STOCK"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >

                      {product.stockStatus.replaceAll("_", " ")}

                    </span>

                  </td>

                </tr>

              ))

            )}
                      </tbody>

        </table>

      </div>

      {/* Pagination */}

      {totalPages > 1 && (

        <div className="flex justify-center items-center gap-2 pt-6">

          {/* Previous */}

          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-100 disabled:opacity-40"
          >
            ←
          </button>

          {/* Page Numbers */}

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(
              Math.max(0, page - 3),
              Math.min(totalPages, page + 2)
            )
            .map((number) => (

              <button
                key={number}
                onClick={() => setPage(number)}
                className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                  page === number
                    ? "bg-primary text-white shadow-lg"
                    : "bg-white border hover:bg-gray-100"
                }`}
              >
                {number}
              </button>

            ))}

          {/* Next */}

          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-100 disabled:opacity-40"
          >
            →
          </button>

        </div>

      )}

      {/* Footer */}

      <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">

        <div>

          <p className="font-semibold text-gray-700">

            Inventory Database

          </p>

          <p className="text-sm text-gray-500">

            Products are managed through the Excel master database.

          </p>

        </div>

        <div className="text-right">

          <p className="text-sm text-gray-500">

            Last Updated

          </p>

          <p className="font-semibold">

            {new Date().toLocaleDateString("en-IN")}

          </p>

        </div>

      </div>

    </div>
  );
}

export default AdminProducts;