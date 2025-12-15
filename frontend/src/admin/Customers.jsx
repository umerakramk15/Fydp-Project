// src/admin/pages/Customers/Customers.js
import { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Search, Filter, UserPlus } from 'lucide-react';

const Customers = () => {
  const [customers] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      orders: 12,
      spent: 1245.67,
      joined: '2023-01-15',
      status: 'active',
      aiSegment: 'Premium'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.c@example.com',
      phone: '+1 (555) 987-6543',
      location: 'San Francisco, CA',
      orders: 8,
      spent: 867.50,
      joined: '2023-03-22',
      status: 'active',
      aiSegment: 'Regular'
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      phone: '+1 (555) 456-7890',
      location: 'Chicago, IL',
      orders: 3,
      spent: 234.99,
      joined: '2023-06-10',
      status: 'inactive',
      aiSegment: 'New'
    },
    {
      id: 4,
      name: 'Alex Rodriguez',
      email: 'alex.r@example.com',
      phone: '+1 (555) 234-5678',
      location: 'Miami, FL',
      orders: 25,
      spent: 3120.45,
      joined: '2022-11-05',
      status: 'active',
      aiSegment: 'VIP'
    }
  ]);

  const getSegmentColor = (segment) => {
    switch (segment) {
      case 'VIP': return 'bg-purple-100 text-purple-800';
      case 'Premium': return 'bg-blue-100 text-blue-800';
      case 'Regular': return 'bg-green-100 text-green-800';
      case 'New': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">Manage and analyze your customer base</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Customer
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{customers.length}</div>
          <div className="text-sm text-gray-600">Total Customers</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">
            {customers.filter(c => c.status === 'active').length}
          </div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">
            ${customers.reduce((acc, c) => acc + c.spent, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">
            {Math.round(customers.reduce((acc, c) => acc + c.orders, 0) / customers.length)}
          </div>
          <div className="text-sm text-gray-600">Avg Orders/Customer</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </button>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
                <span className={`inline-block mt-1 px-2 py-1 text-xs font-semibold rounded-full ${getSegmentColor(customer.aiSegment)}`}>
                  {customer.aiSegment}
                </span>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                {customer.status}
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                {customer.email}
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                {customer.phone}
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {customer.location}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Joined {new Date(customer.joined).toLocaleDateString()}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <div>
                  <div className="font-medium text-gray-900">{customer.orders} orders</div>
                  <div className="text-gray-600">Total orders</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">${customer.spent}</div>
                  <div className="text-gray-600">Total spent</div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                View Profile
              </button>
              <button className="px-3 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                Message
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Customer Insights */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <h2 className="text-xl font-bold mb-4">AI Customer Segmentation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-lg font-semibold mb-2">VIP Customers</div>
            <div className="text-2xl font-bold">12%</div>
            <div className="text-sm opacity-90">Generate 45% of revenue</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-lg font-semibold mb-2">At Risk</div>
            <div className="text-2xl font-bold">8%</div>
            <div className="text-sm opacity-90">Need re-engagement</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-lg font-semibold mb-2">Loyalty Potential</div>
            <div className="text-2xl font-bold">23%</div>
            <div className="text-sm opacity-90">Ready for loyalty program</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;