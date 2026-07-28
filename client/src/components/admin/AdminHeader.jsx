import { Bell, Search } from "lucide-react";

function AdminHeader() {
  return (
    <header className="bg-white h-20 shadow-sm flex items-center justify-between px-8">

      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Macro Electricals
        </h1>

        <p className="text-sm text-gray-500">
          Admin Dashboard
        </p>
      </div>

      {/* Center */}
      <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-2 w-96">
        <Search size={18} className="text-gray-500" />

        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none ml-3 w-full"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        <button className="relative">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-primary text-white flex items-center justify-center font-bold">
            A
          </div>

          <div>
            <p className="font-semibold">Admin</p>
            <p className="text-xs text-gray-500">
              MAE Electricals
            </p>
          </div>
        </div>

      </div>

    </header>
  );
}

export default AdminHeader;