// src/admin/pages/Orders/Orders.js
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar,
  FileText,
  Printer,
  Eye,
  ChevronDown
} from 'lucide-react';

const Orders = () => {
  const [orders] = useState([
    {
      id: '12282',
      orderTime: '2025-11-16T09:54:00',
      customerName: 'Sierra Brooks',
      method: 'Cash',
      amount: 4560.00,
      status: 'pending'
    },
    {
      id: '12288',
      orderTime: '2025-11-15T21:10:00',
      customerName: 'Willa Becker',
      method: 'Cash',
      amount: 236.21,
      status: 'pending'
    },
    {
      id: '12289',
      orderTime: '2025-11-14T07:43:00',
      customerName: 'Taher Ahmed',
      method: 'Cash',
      amount: 108.12,
      status: 'pending'
    },
    {
      id: '12285',
      orderTime: '2025-11-13T14:09:00',
      customerName: 'John Doe',
      method: 'Cash',
      amount: 297.66,
      status: 'delivered'
    },
    {
      id: '12287',
      orderTime: '2025-11-13T14:09:00',
      customerName: 'Sierra Brooks',
      method: 'Cash',
      amount: 1188.82,
      status: 'delivered'
    },
    {
      id: '12272',
      orderTime: '2025-11-13T14:07:00',
      customerName: 'Sierra Brooks',
      method: 'Cash',
      amount: 68.12,
      status: 'delivered'
    },
    {
      id: '12284',
      orderTime: '2025-11-12T16:01:00',
      customerName: 'Sierra Brooks',
      method: 'Cash',
      amount: 4110.00,
      status: 'pending'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMethod, setFilterMethod] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [orderLimit, setOrderLimit] = useState('all');

  // Calculate statistics
  const totalOrders = orders.length;
  const processingOrders = orders.filter(order => order.status === 'pending').length;
  const deliveredOrders = orders.filter(order => order.status === 'delivered').length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);

  const stats = [
    {
      title: 'Processing',
      value: processingOrders.toString(),
      description: 'Orders being processed',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Total Orders',
      value: totalOrders.toString(),
      description: 'All time orders',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Delivered',
      value: deliveredOrders.toString(),
      description: 'Successfully delivered',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      description: 'Total sales amount',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const methodOptions = [
    { value: 'all', label: 'All Methods' },
    { value: 'cash', label: 'Cash' },
    { value: 'card', label: 'Card' },
    { value: 'credit', label: 'Credit' },
    { value: 'digital', label: 'Digital Wallet' }
  ];

  const orderLimitOptions = [
    { value: 'all', label: 'All Orders' },
    { value: '10', label: 'Last 10 Orders' },
    { value: '25', label: 'Last 25 Orders' },
    { value: '50', label: 'Last 50 Orders' },
    { value: '100', label: 'Last 100 Orders' }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDateInput = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePrintReceipt = (orderId) => {
    // In a real application, this would generate and print a receipt
    console.log(`Printing receipt for order ${orderId}`);
    alert(`Printing receipt for order ${orderId}`);
  };

  const handleDownloadAll = () => {
    // In a real application, this would download all orders as CSV/Excel
    console.log('Downloading all orders');
    alert('Downloading all orders as CSV file');
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setFilterMethod('all');
    setStartDate('');
    setEndDate('');
    setOrderLimit('all');
  };

  // Filter orders based on search and filters
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.includes(searchTerm);
    
    const matchesStatus = 
      filterStatus === 'all' || order.status === filterStatus;
    
    const matchesMethod = 
      filterMethod === 'all' || order.method.toLowerCase() === filterMethod;
    
    const matchesDate = () => {
      if (!startDate && !endDate) return true;
      
      const orderDate = new Date(order.orderTime);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      
      if (start && end) {
        return orderDate >= start && orderDate <= end;
      } else if (start) {
        return orderDate >= start;
      } else if (end) {
        return orderDate <= end;
      }
      return true;
    };

    return matchesSearch && matchesStatus && matchesMethod && matchesDate();
  });

  // Apply order limit
  const displayOrders = orderLimit === 'all' 
    ? filteredOrders 
    : filteredOrders.slice(0, parseInt(orderLimit));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">Manage and track customer orders</p>
        </div>
        <button 
          onClick={handleDownloadAll}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="h-4 w-4 mr-2" />
          Download All Orders
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className={`text-2xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <FileText className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Customer Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Order Limits */}
          <div className="relative">
            <select 
              value={orderLimit}
              onChange={(e) => setOrderLimit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              {orderLimitOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Method Filter */}
          <div className="relative">
            <select 
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              {methodOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Date Range Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="mm/dd/yyyy"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="mm/dd/yyyy"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-1 justify-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
            <button 
              onClick={handleResetFilters}
              className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex-1 justify-center"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  INVOICE NO
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ORDER TIME
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  METHOD
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  AMOUNT
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STATUS
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ACTION
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  INVOICE
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(order.orderTime)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.customerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.method}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${order.amount.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => handlePrintReceipt(order.id)}
                      className="flex items-center text-blue-600 hover:text-blue-900 text-sm font-medium"
                    >
                      <Printer className="h-4 w-4 mr-1" />
                      Print Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {displayOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">No orders found</div>
            <div className="text-sm text-gray-500">
              {searchTerm || filterStatus !== 'all' || filterMethod !== 'all' || startDate || endDate
                ? 'Try adjusting your search or filters' 
                : 'No orders have been placed yet'
              }
            </div>
          </div>
        )}
      </div>

      {/* Order Summary */}
      {displayOrders.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Showing:</span>
              <span className="font-medium ml-2">{displayOrders.length} of {filteredOrders.length} orders</span>
            </div>
            <div>
              <span className="text-gray-600">Total Amount:</span>
              <span className="font-medium ml-2">
                ${displayOrders.reduce((sum, order) => sum + order.amount, 0).toFixed(2)}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Average Order:</span>
              <span className="font-medium ml-2">
                ${(displayOrders.reduce((sum, order) => sum + order.amount, 0) / displayOrders.length).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;