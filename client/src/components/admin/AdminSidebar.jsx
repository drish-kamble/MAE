import {
  LayoutDashboard,
  Package,
  ClipboardList,
  FileText,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
  },
  {
    name: "Products",
    icon: Package,
    path: "/admin/products",
  },
  {
    name: "Orders",
    icon: ClipboardList,
    path: "/admin/orders",
  },
  {
    name: "Quotes",
    icon: FileText,
    path: "/admin/quotes",
  },
  {
    name: "Customers",
    icon: Users,
    path: "/admin/customers",
  },
  {
    name: "Analytics",
    icon: BarChart3,
    path: "/admin/analytics",
  },
];

function AdminSidebar() {
  return (
    <aside className="w-72 bg-gradient-to-b from-primary to-secondary text-white flex flex-col shadow-xl">

      {/* Logo */}

      <div className="h-24 flex items-center justify-center border-b border-white/10">

        <div className="text-center">

          <h1 className="text-2xl font-bold">
            MAE
          </h1>

          <p className="text-sm text-white/70">
            Admin Panel
          </p>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 py-6">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `mx-3 mb-2 flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-200 ${
                  isActive
                    ? "bg-white text-primary shadow-lg"
                    : "hover:bg-white/10"
                }`
              }
            >
              <Icon size={22} />

              <span className="font-medium">
                {item.name}
              </span>

            </NavLink>

          );
        })}
      </nav>

      {/* Footer */}

      <div className="border-t border-white/10 p-4">

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-white/10 transition">

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default AdminSidebar;