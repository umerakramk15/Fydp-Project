import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiPackage,
  FiDollarSign,
  FiUsers,
  FiTrendingUp,
  FiShoppingBag,
  FiCreditCard,
  FiActivity,
  FiCalendar,
  FiArrowUpRight,
  FiArrowDownRight,
  FiMoreVertical,
  FiEye,
  FiDownload,
  FiFilter,
  FiRefreshCw
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const SellerDashboard = () => {
  const [timeRange, setTimeRange] = useState('30days');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    conversionRate: 0,
    averageOrderValue: 0
  });

  // Mock data - in real app, fetch from API
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setStats({
        totalRevenue: 12450.75,
        totalOrders: 189,
        totalProducts: 42,
        totalCustomers: 156,
        conversionRate: 3.2,
        averageOrderValue: 65.87
      });
      setLoading(false);
    }, 1000);
  }, [timeRange]);

  const statsCards = [
    {
      id: 'revenue',
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      changeType: 'increase',
      icon: <FiDollarSign className="text-2xl" />,
      color: 'bg-green-50',
      iconColor: 'text-green-600',
      link: '/seller/analytics'
    },
    {
      id: 'orders',
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      change: '+8.3%',
      changeType: 'increase',
      icon: <FiPackage className="text-2xl" />,
      color: 'bg-blue-50',
      iconColor: 'text-blue-600',
      link: '/seller/orders'
    },
    {
      id: 'products',
      title: 'Active Products',
      value: stats.totalProducts.toLocaleString(),
      change: '+5',
      changeType: 'increase',
      icon: <FiShoppingBag className="text-2xl" />,
      color: 'bg-purple-50',
      iconColor: 'text-purple-600',
      link: '/seller/products'
    },
    {
      id: 'customers',
      title: 'Total Customers',
      value: stats.totalCustomers.toLocaleString(),
      change: '+24',
      changeType: 'increase',
      icon: <FiUsers className="text-2xl" />,
      color: 'bg-amber-50',
      iconColor: 'text-amber-600',
      link: '/seller/customers'
    }
  ];

  const recentOrders = [
    {
      id: 'ORD-789456',
      customer: 'John Smith',
      date: '2024-01-15',
      amount: 249.99,
      status: 'delivered',
      items: 3
    },
    {
      id: 'ORD-123456',
      customer: 'Emma Wilson',
      date: '2024-01-14',
      amount: 149.50,
      status: 'processing',
      items: 2
    },
    {
      id: 'ORD-654321',
      customer: 'Michael Brown',
      date: '2024-01-13',
      amount: 89.99,
      status: 'shipped',
      items: 1
    },
    {
      id: 'ORD-321654',
      customer: 'Sarah Johnson',
      date: '2024-01-12',
      amount: 459.75,
      status: 'pending',
      items: 4
    },
    {
      id: 'ORD-987123',
      customer: 'David Lee',
      date: '2024-01-11',
      amount: 199.98,
      status: 'delivered',
      items: 2
    }
  ];

  const topProducts = [
    {
      id: 1,
      name: 'Premium Casual Shirt',
      category: 'Fashion',
      price: 49.99,
      stock: 42,
      sales: 128,
      revenue: 6398.72
    },
    {
      id: 2,
      name: 'Wireless Earbuds',
      category: 'Electronics',
      price: 89.99,
      stock: 156,
      sales: 89,
      revenue: 8009.11
    },
    {
      id: 3,
      name: 'Running Shoes',
      category: 'Sports',
      price: 129.99,
      stock: 23,
      sales: 67,
      revenue: 8709.33
    },
    {
      id: 4,
      name: 'Laptop Backpack',
      category: 'Accessories',
      price: 59.99,
      stock: 78,
      sales: 45,
      revenue: 2699.55
    },
    {
      id: 5,
      name: 'Smart Watch',
      category: 'Electronics',
      price: 199.99,
      stock: 34,
      sales: 32,
      revenue: 6399.68
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleExport = () => {
    alert('Exporting dashboard data...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Seller Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome back! Here's what's happening with your store today.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors disabled:opacity-70"
              >
                <FiRefreshCw className={`${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl font-medium transition-colors"
              >
                <FiDownload />
                Export
              </button>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <FiCalendar className="text-gray-400" />
              <span className="text-sm text-gray-600">Time Range:</span>
            </div>
            <div className="flex gap-2">
              {['7days', '30days', '90days', '1year'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    timeRange === range
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {range === '7days' ? '7 Days' :
                   range === '30days' ? '30 Days' :
                   range === '90days' ? '90 Days' : '1 Year'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                  <span className={stat.iconColor}>{stat.icon}</span>
                </div>
                <div className="text-right">
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.changeType === 'increase' ? (
                      <FiArrowUpRight />
                    ) : (
                      <FiArrowDownRight />
                    )}
                    {stat.change}
                  </div>
                  <span className="text-xs text-gray-500">vs last period</span>
                </div>
              </div>
              
              <div className="mb-2">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
              
              <Link
                to={stat.link}
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View details
                <FiArrowUpRight />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Revenue Overview</h2>
                <p className="text-gray-600">Sales performance for the last {timeRange}</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <FiMoreVertical className="text-gray-400" />
              </button>
            </div>
            
            {/* Chart Placeholder */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📈</div>
                <p className="text-gray-700 font-medium">Revenue Chart</p>
                <p className="text-gray-500 text-sm">(Chart.js or Recharts would go here)</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-xl font-bold text-gray-900">{stats.conversionRate}%</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">Avg Order Value</p>
                <p className="text-xl font-bold text-gray-900">${stats.averageOrderValue}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">Repeat Customers</p>
                <p className="text-xl font-bold text-gray-900">42%</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/seller/products/new"
                className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors group"
              >
                <div className="p-2 bg-white rounded-lg">
                  <FiPackage className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Add New Product</p>
                  <p className="text-sm opacity-80">List a new product for sale</p>
                </div>
                <FiArrowUpRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/seller/orders"
                className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 text-green-700 rounded-xl transition-colors group"
              >
                <div className="p-2 bg-white rounded-lg">
                  <FiActivity className="text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Process Orders</p>
                  <p className="text-sm opacity-80">{recentOrders.filter(o => o.status === 'pending').length} pending</p>
                </div>
                <FiArrowUpRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/seller/analytics"
                className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl transition-colors group"
              >
                <div className="p-2 bg-white rounded-lg">
                  <FiTrendingUp className="text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">View Analytics</p>
                  <p className="text-sm opacity-80">Detailed sales reports</p>
                </div>
                <FiArrowUpRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/seller/settings"
                className="flex items-center gap-3 p-4 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-xl transition-colors group"
              >
                <div className="p-2 bg-white rounded-lg">
                  <FiCreditCard className="text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Payment Settings</p>
                  <p className="text-sm opacity-80">Update bank details</p>
                </div>
                <FiArrowUpRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                <p className="text-gray-600">Latest 5 orders from your store</p>
              </div>
              <Link
                to="/seller/orders"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View All →
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Order ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <p className="font-medium text-blue-600">{order.id}</p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-xs text-gray-500">{order.items} items</p>
                      </td>
                      <td className="py-4 px-4 font-bold">${order.amount}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button className="p-2 text-gray-400 hover:text-blue-600">
                          <FiEye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Top Products</h2>
                <p className="text-gray-600">Best selling products by revenue</p>
              </div>
              <Link
                to="/seller/products"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View All →
              </Link>
            </div>
            
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg"></div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${product.revenue.toLocaleString()}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-600">{product.sales} sales</span>
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-green-600">{product.stock} in stock</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Store Rating</h3>
              <div className="text-2xl">⭐</div>
            </div>
            <p className="text-3xl font-bold mb-2">4.8/5.0</p>
            <p className="text-blue-100">Based on 156 customer reviews</p>
          </div>
          
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Commission Rate</h3>
              <div className="text-2xl">💰</div>
            </div>
            <p className="text-3xl font-bold mb-2">15%</p>
            <p className="text-green-100">Standard platform commission</p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Next Payout</h3>
              <div className="text-2xl">📅</div>
            </div>
            <p className="text-3xl font-bold mb-2">$2,450.75</p>
            <p className="text-purple-100">Scheduled for Jan 28, 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;