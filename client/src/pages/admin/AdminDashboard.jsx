import {
  Package,
  ClipboardList,
  FileText,
  Users,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

const stats = [
  {
    title: "Products",
    value: "128",
    icon: Package,
    color: "bg-blue-500",
  },
  {
    title: "Orders",
    value: "54",
    icon: ClipboardList,
    color: "bg-green-500",
  },
  {
    title: "Quotes",
    value: "18",
    icon: FileText,
    color: "bg-purple-600",
  },
  {
    title: "Customers",
    value: "32",
    icon: Users,
    color: "bg-orange-500",
  },
];

function DashboardCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-500">{title}</p>

          <h2 className="text-4xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div
          className={`${color} h-16 w-16 rounded-2xl flex items-center justify-center text-white`}
        >
          <Icon size={32} />
        </div>

      </div>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div>

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back 👋 Here's what's happening today.
        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((card) => (
          <DashboardCard key={card.title} {...card} />
        ))}

      </div>

      {/* Bottom */}

      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        {/* Recent Orders */}

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-xl font-semibold">
              Recent Orders
            </h2>

            <TrendingUp className="text-green-500" />

          </div>

          <div className="space-y-4">

            {[1,2,3].map((i)=>(
              <div
                key={i}
                className="flex justify-between border-b pb-3"
              >
                <div>

                  <p className="font-medium">
                    Order #{1000+i}
                  </p>

                  <p className="text-sm text-gray-500">
                    Customer Name
                  </p>

                </div>

                <span className="text-green-600 font-semibold">
                  ₹12,450
                </span>

              </div>
            ))}

          </div>

        </div>

        {/* Alerts */}

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-xl font-semibold">
              Notifications
            </h2>

            <AlertTriangle className="text-yellow-500" />

          </div>

          <div className="space-y-4">

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">

              New quote request received.

            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">

              New order placed successfully.

            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">

              Product database synced.

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;