import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Header */}
        <AdminHeader />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;