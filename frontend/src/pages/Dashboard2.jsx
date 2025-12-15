import React, { useState, useEffect } from "react";
import {
  Home,
  Box,
  ShoppingCart,
  Users,
  Settings,
  Sun,
  Moon,
  Search,
  LogOut,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Single-file Admin Dashboard (React + Tailwind)
// Requirements: tailwindcss configured, lucide-react and recharts installed

export default function AdminDashboard() {
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  // Mock data
  const stats = [
    { id: 1, name: "Total Sales", value: "$24,720", delta: "+8%" },
    { id: 2, name: "Total Orders", value: "1,832", delta: "+3%" },
    { id: 3, name: "Customers", value: "912", delta: "+5%" },
    { id: 4, name: "Avg. Order", value: "$37.5", delta: "-1%" },
  ];

  const salesData = [
    { name: "Mon", sales: 400 },
    { name: "Tue", sales: 600 },
    { name: "Wed", sales: 800 },
    { name: "Thu", sales: 700 },
    { name: "Fri", sales: 1200 },
    { name: "Sat", sales: 900 },
    { name: "Sun", sales: 1000 },
  ];

  const latestOrders = [
    { id: "#1007", customer: "Aisha Khan", total: "$120.00", status: "Delivered" },
    { id: "#1008", customer: "Bilal Ahmed", total: "$45.00", status: "Processing" },
    { id: "#1009", customer: "Sara Malik", total: "$299.00", status: "Shipped" },
    { id: "#1010", customer: "Hassan Ali", total: "$15.90", status: "Cancelled" },
  ];

  const topProducts = [
    { id: 1, name: "Wireless Headphones", price: "$59", sold: 320 },
    { id: 2, name: "Smart Watch", price: "$129", sold: 210 },
    { id: 3, name: "Sneakers", price: "$89", sold: 184 },
  ];

  const filteredOrders = latestOrders.filter((o) =>
    `${o.id} ${o.customer} ${o.total} ${o.status}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 w-64 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border-r border-gray-200 dark:border-gray-700 p-4 transform transition-transform lg:translate-x-0 z-40 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex items-center gap-3 px-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">EZ</div>
            <div>
              <h3 className="font-semibold text-lg">E-Z Shop</h3>
              <p className="text-xs text-gray-500 dark:text-gray-300">Admin Panel</p>
            </div>
          </div>

          <nav className="mt-6 space-y-1">
            <NavItem icon={<Home size={16} />} label="Dashboard" active />
            <NavItem icon={<Box size={16} />} label="Products" />
            <NavItem icon={<ShoppingCart size={16} />} label="Orders" />
            <NavItem icon={<Users size={16} />} label="Customers" />
            <NavItem icon={<Settings size={16} />} label="Settings" />
          </nav>

          <div className="mt-auto pt-6">
            <button
              onClick={() => setDark((s) => !s)}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
              <span className="text-sm">Toggle {dark ? "Light" : "Dark"}</span>
            </button>

            <button className="w-full mt-3 flex items-center justify-center gap-2 py-2 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300">
              <LogOut size={16} />
              <span className="text-sm">Sign out</span>
            </button>
          </div>
        </aside>

        {/* Overlay for mobile when sidebar open */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/30 lg:hidden z-30"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Main content */}
        <div className="flex-1 ml-0 lg:ml-64 w-full">
          {/* Topbar */}
          <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-transparent">
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden p-2 rounded-md bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700"
                onClick={() => setMobileOpen((s) => !s)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 5h14V7H3V5zm0 4h14v2H3V9zm0 4h14v2H3v-2z" clipRule="evenodd" />
                </svg>
              </button>

              <h2 className="text-2xl font-semibold">Dashboard</h2>
              <div className="ml-4 text-sm text-gray-500 dark:text-gray-300">Overview & analytics</div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-9 pr-3 py-2 rounded-lg bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 placeholder-gray-400 text-sm"
                  placeholder="Search orders..."
                />
                <div className="absolute left-2 top-1/2 -translate-y-1/2">
                  <Search size={16} />
                </div>
              </div>

              <button
                onClick={() => setDark((s) => !s)}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60"
                title="Toggle theme"
              >
                {dark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </header>

          <main className="p-6">
            {/* Stats */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div
                  key={s.id}
                  className="rounded-2xl p-4 bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-300">{s.name}</p>
                      <h3 className="text-xl font-semibold mt-1">{s.value}</h3>
                    </div>
                    <div className="text-sm text-green-500 dark:text-green-400 font-medium">{s.delta}</div>
                  </div>
                  <div className="mt-4 h-1 w-full rounded-full bg-gradient-to-r from-indigo-400 to-pink-400 opacity-80" />
                </div>
              ))}
            </section>

            <section className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Revenue chart */}
              <div className="lg:col-span-2 bg-white/60 dark:bg-gray-800/60 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Revenue (last 7 days)</h4>
                  <div className="text-sm text-gray-500 dark:text-gray-300">Updated today</div>
                </div>

                <div className="mt-4 h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="sales" stroke="#6366F1" strokeWidth={3} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Top products */}
              <div className="bg-white/60 dark:bg-gray-800/60 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h4 className="font-semibold">Top Products</h4>
                <ul className="mt-4 space-y-3">
                  {topProducts.map((p) => (
                    <li key={p.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm font-medium">
                          {p.name.split(" ")[0][0]}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{p.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-300">{p.sold} sold</div>
                        </div>
                      </div>
                      <div className="text-sm font-semibold">{p.price}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Latest orders */}
              <div className="bg-white/60 dark:bg-gray-800/60 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Latest Orders</h4>
                  <div className="text-sm text-gray-500 dark:text-gray-300">Quick view</div>
                </div>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm table-auto">
                    <thead>
                      <tr className="text-left text-gray-500 dark:text-gray-300">
                        <th className="pb-2">Order</th>
                        <th className="pb-2">Customer</th>
                        <th className="pb-2">Total</th>
                        <th className="pb-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((o) => (
                        <tr key={o.id} className="border-t border-gray-100 dark:border-gray-700">
                          <td className="py-3">{o.id}</td>
                          <td className="py-3">{o.customer}</td>
                          <td className="py-3">{o.total}</td>
                          <td className="py-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                o.status === "Delivered"
                                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                  : o.status === "Processing"
                                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                                  : o.status === "Shipped"
                                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                              }`}
                            >
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Activity / quick actions */}
              <div className="bg-white/60 dark:bg-gray-800/60 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h4 className="font-semibold">Quick Actions</h4>
                <div className="mt-4 grid grid-cols-1 gap-3">
                  <button className="w-full text-left px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-medium shadow">Add product</button>
                  <button className="w-full text-left px-4 py-3 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">Export orders</button>
                  <button className="w-full text-left px-4 py-3 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">View reports</button>
                </div>

                <div className="mt-6">
                  <h5 className="text-sm font-medium">Notifications</h5>
                  <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>- New order #1011 placed</li>
                    <li>- Low stock: Smart Watch (12 left)</li>
                    <li>- New user registered: Zoya</li>
                  </ul>
                </div>
              </div>
            </section>

            <footer className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} E-Z Shop — Built with ❤️</footer>
          </main>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <button
      className={`flex items-center gap-3 w-full py-2 px-3 rounded-lg transition-colors text-sm ${
        active
          ? "bg-gradient-to-r from-indigo-100 to-pink-100 dark:from-indigo-900/40 dark:to-pink-900/40 font-semibold"
          : "hover:bg-gray-100 dark:hover:bg-gray-700/50"
      }`}
    >
      <div className="text-indigo-600 dark:text-indigo-300">{icon}</div>
      <span>{label}</span>
    </button>
  );
}
