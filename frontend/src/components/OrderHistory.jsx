import { useState } from "react";
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiEye, FiDownload, FiRepeat } from "react-icons/fi";

const OrderHistory = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD-789456",
      date: "2024-01-15",
      items: 3,
      total: 299.97,
      status: "delivered",
      statusText: "Delivered",
      tracking: "TRK123456789",
      itemsPreview: ["Blue T-Shirt", "Running Shoes", "Wireless Earbuds"],
      deliveryDate: "2024-01-18",
      paymentMethod: "Credit Card"
    },
    {
      id: "ORD-123456",
      date: "2024-01-10",
      items: 2,
      total: 149.98,
      status: "shipped",
      statusText: "Shipped",
      tracking: "TRK987654321",
      itemsPreview: ["Smart Watch", "Phone Case"],
      deliveryDate: "2024-01-14",
      paymentMethod: "PayPal"
    },
    {
      id: "ORD-654321",
      date: "2024-01-05",
      items: 1,
      total: 89.99,
      status: "processing",
      statusText: "Processing",
      tracking: null,
      itemsPreview: ["Laptop Backpack"],
      deliveryDate: null,
      paymentMethod: "Credit Card"
    },
    {
      id: "ORD-321654",
      date: "2023-12-28",
      items: 4,
      total: 459.96,
      status: "pending",
      statusText: "Pending",
      tracking: null,
      itemsPreview: ["Winter Jacket", "Gloves", "Scarf", "Beanie"],
      deliveryDate: null,
      paymentMethod: "Cash on Delivery"
    },
    {
      id: "ORD-987123",
      date: "2023-12-15",
      items: 2,
      total: 199.98,
      status: "delivered",
      statusText: "Delivered",
      tracking: "TRK456789123",
      itemsPreview: ["Gaming Mouse", "Keyboard"],
      deliveryDate: "2023-12-20",
      paymentMethod: "Credit Card"
    }
  ]);

  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered': return <FiCheckCircle className="text-green-500" />;
      case 'shipped': return <FiTruck className="text-blue-500" />;
      case 'processing': return <FiPackage className="text-yellow-500" />;
      default: return <FiClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAndSortedOrders = () => {
    let filtered = filter === "all" 
      ? [...orders] 
      : orders.filter(order => order.status === filter);

    // Apply sorting
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'highest':
          return b.total - a.total;
        case 'lowest':
          return a.total - b.total;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const handleReorder = (orderId) => {
    alert(`Reordering order ${orderId}...`);
    // In real app: Add order items to cart
  };

  const handleTrackOrder = (order) => {
    if (order.tracking) {
      alert(`Tracking order ${order.id}: ${order.tracking}`);
    } else {
      alert("Tracking number not available yet");
    }
  };

  const handleDownloadInvoice = (orderId) => {
    alert(`Downloading invoice for order ${orderId}...`);
    // In real app: Generate and download invoice PDF
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Order History
          </h1>
          <p className="text-gray-500 text-sm">
            Track and manage your purchases
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
          </select>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["all", "pending", "processing", "shipped", "delivered"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
              filter === status 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status === "all" ? "All Orders" : status.charAt(0).toUpperCase() + status.slice(1)}
            <span className="ml-2 text-xs opacity-80">
              ({status === "all" ? orders.length : orders.filter(o => o.status === status).length})
            </span>
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full min-w-full">
          <thead className="bg-gray-50">
            <tr className="border-b">
              <th className="text-left py-4 px-6 text-gray-700 font-semibold text-sm">Order ID</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold text-sm">Date</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold text-sm">Items</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold text-sm">Total</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold text-sm">Status</th>
              <th className="text-left py-4 px-6 text-gray-700 font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedOrders().map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="py-5 px-6">
                  <div className="font-semibold text-blue-600">{order.id}</div>
                  <div className="text-xs text-gray-500 mt-1">{order.paymentMethod}</div>
                </td>
                <td className="py-5 px-6">
                  <div className="text-gray-900">{order.date}</div>
                  {order.deliveryDate && (
                    <div className="text-xs text-gray-500">Delivered: {order.deliveryDate}</div>
                  )}
                </td>
                <td className="py-5 px-6">
                  <div className="font-medium">{order.items} items</div>
                  <div className="text-sm text-gray-500 truncate max-w-xs mt-1">
                    {order.itemsPreview.join(", ")}
                  </div>
                </td>
                <td className="py-5 px-6">
                  <div className="font-bold text-gray-900">${order.total.toFixed(2)}</div>
                </td>
                <td className="py-5 px-6">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {order.statusText}
                    </span>
                  </div>
                  {order.tracking && (
                    <div className="text-xs text-gray-500 mt-2">Tracking: {order.tracking}</div>
                  )}
                </td>
                <td className="py-5 px-6">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleTrackOrder(order)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg font-medium transition-colors"
                    >
                      <FiEye size={14} />
                      Track
                    </button>
                    <button
                      onClick={() => handleReorder(order.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm rounded-lg font-medium transition-colors"
                    >
                      <FiRepeat size={14} />
                      Reorder
                    </button>
                    <button
                      onClick={() => handleDownloadInvoice(order.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 text-sm rounded-lg font-medium transition-colors"
                    >
                      <FiDownload size={14} />
                      Invoice
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredAndSortedOrders().length === 0 && (
        <div className="text-center py-16">
          <div className="text-gray-300 mb-4 text-6xl">📦</div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No orders found</h3>
          <p className="text-gray-500 mb-6">
            You don't have any {filter !== 'all' ? filter : ''} orders yet.
          </p>
          <button
            onClick={() => setFilter("all")}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium"
          >
            View All Orders
          </button>
        </div>
      )}

      {/* Order Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Total Orders</div>
          <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
        </div>
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Total Spent</div>
          <div className="text-2xl font-bold text-gray-900">
            ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
          </div>
        </div>
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Pending Orders</div>
          <div className="text-2xl font-bold text-gray-900">
            {orders.filter(o => o.status === 'pending').length}
          </div>
        </div>
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Avg. Order Value</div>
          <div className="text-2xl font-bold text-gray-900">
            ${(orders.reduce((sum, order) => sum + order.total, 0) / orders.length || 0).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;