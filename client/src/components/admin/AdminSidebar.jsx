import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div className="w-64 bg-purple-700 text-white p-6">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <nav className="space-y-3">
        <Link to="/admin" className="block hover:underline">
          Dashboard
        </Link>
        <Link to="/admin/orders" className="block hover:underline">
          Orders
        </Link>
        <Link to="/admin/quotes" className="block hover:underline">
          Quotes
        </Link>
      </nav>
    </div>
  );
}

export default AdminSidebar;
