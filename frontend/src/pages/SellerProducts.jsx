import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiPackage,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiFilter,
  FiSearch,
  FiGrid,
  FiList,
  FiCheckCircle,
  FiXCircle,
  FiTrendingUp,
  FiMoreVertical,
  FiUpload,
  FiCopy,
  FiRefreshCw
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [bulkAction, setBulkAction] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data
  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        name: 'Premium Casual Shirt',
        sku: 'PRD-001',
        price: 49.99,
        comparePrice: 79.99,
        stock: 42,
        category: 'Fashion',
        status: 'active',
        featured: true,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        createdAt: '2024-01-15',
        sales: 128,
        revenue: 6398.72
      },
      {
        id: 2,
        name: 'Wireless Earbuds',
        sku: 'PRD-002',
        price: 89.99,
        comparePrice: 129.99,
        stock: 156,
        category: 'Electronics',
        status: 'active',
        featured: true,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w-400&q=80',
        createdAt: '2024-01-14',
        sales: 89,
        revenue: 8009.11
      },
      {
        id: 3,
        name: 'Running Shoes',
        sku: 'PRD-003',
        price: 129.99,
        comparePrice: 179.99,
        stock: 23,
        category: 'Sports',
        status: 'active',
        featured: false,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        createdAt: '2024-01-13',
        sales: 67,
        revenue: 8709.33
      },
      {
        id: 4,
        name: 'Laptop Backpack',
        sku: 'PRD-004',
        price: 59.99,
        comparePrice: 89.99,
        stock: 78,
        category: 'Accessories',
        status: 'out_of_stock',
        featured: false,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        createdAt: '2024-01-12',
        sales: 45,
        revenue: 2699.55
      },
      {
        id: 5,
        name: 'Smart Watch',
        sku: 'PRD-005',
        price: 199.99,
        comparePrice: 249.99,
        stock: 34,
        category: 'Electronics',
        status: 'active',
        featured: true,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        createdAt: '2024-01-11',
        sales: 32,
        revenue: 6399.68
      },
      {
        id: 6,
        name: 'Winter Jacket',
        sku: 'PRD-006',
        price: 149.99,
        comparePrice: 199.99,
        stock: 0,
        category: 'Fashion',
        status: 'out_of_stock',
        featured: false,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        createdAt: '2024-01-10',
        sales: 56,
        revenue: 8399.44
      },
      {
        id: 7,
        name: 'Coffee Mug Set',
        sku: 'PRD-007',
        price: 29.99,
        comparePrice: 39.99,
        stock: 124,
        category: 'Home',
        status: 'draft',
        featured: false,
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        createdAt: '2024-01-09',
        sales: 0,
        revenue: 0
      },
      {
        id: 8,
        name: 'Yoga Mat',
        sku: 'PRD-008',
        price: 39.99,
        comparePrice: 59.99,
        stock: 67,
        category: 'Sports',
        status: 'active',
        featured: false,
        image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        createdAt: '2024-01-08',
        sales: 23,
        revenue: 919.77
      }
    ];

    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
    setLoading(false);
  }, []);

  // Filter products
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(product => product.status === statusFilter);
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, statusFilter, categoryFilter, products]);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'draft', label: 'Draft' },
    { value: 'out_of_stock', label: 'Out of Stock' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Fashion', label: 'Fashion' },
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Home', label: 'Home' },
    { value: 'Accessories', label: 'Accessories' }
  ];

  const bulkActions = [
    { value: 'activate', label: 'Activate Selected' },
    { value: 'deactivate', label: 'Deactivate Selected' },
    { value: 'delete', label: 'Delete Selected' },
    { value: 'duplicate', label: 'Duplicate Selected' }
  ];

  const handleSelectProduct = (id) => {
    setSelectedProducts(prev =>
      prev.includes(id)
        ? prev.filter(productId => productId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  const handleBulkAction = () => {
    if (!bulkAction) {
      alert('Please select a bulk action');
      return;
    }

    if (selectedProducts.length === 0) {
      alert('Please select products to perform bulk action');
      return;
    }

    if (bulkAction === 'delete') {
      if (window.confirm(`Are you sure you want to delete ${selectedProducts.length} product(s)?`)) {
        setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)));
        setSelectedProducts([]);
        alert(`${selectedProducts.length} product(s) deleted successfully`);
      }
    } else {
      alert(`${bulkAction} action performed on ${selectedProducts.length} product(s)`);
      // In real app, make API call here
    }
    
    setBulkAction('');
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      alert('Product deleted successfully');
    }
  };

  const handleDuplicateProduct = (product) => {
    const newProduct = {
      ...product,
      id: products.length + 1,
      name: `${product.name} (Copy)`,
      sku: `${product.sku}-COPY`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [newProduct, ...prev]);
    alert('Product duplicated successfully');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'active': return 'Active';
      case 'draft': return 'Draft';
      case 'out_of_stock': return 'Out of Stock';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Product Management</h1>
              <p className="text-gray-600 mt-1">
                Manage your products, inventory, and pricing
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/seller/products/new"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
              >
                <FiPlus />
                Add New Product
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl">
              <p className="text-sm text-gray-600">Active Products</p>
              <p className="text-2xl font-bold text-gray-900">
                {products.filter(p => p.status === 'active').length}
              </p>
            </div>
            <div className="bg-amber-50 p-4 rounded-xl">
              <p className="text-sm text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-gray-900">
                {products.filter(p => p.status === 'out_of_stock').length}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl">
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${products.reduce((sum, p) => sum + p.revenue, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Left Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Bulk Actions */}
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={handleSelectAll}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {selectedProducts.length > 0 ? `${selectedProducts.length} selected` : 'Select all'}
                  </span>
                </div>
                
                {selectedProducts.length > 0 && (
                  <div className="flex items-center gap-2">
                    <select
                      value={bulkAction}
                      onChange={(e) => setBulkAction(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="">Bulk Actions</option>
                      {bulkActions.map(action => (
                        <option key={action.value} value={action.value}>{action.label}</option>
                      ))}
                    </select>
                    <button
                      onClick={handleBulkAction}
                      className="px-4 py-1.5 bg-gray-900 hover:bg-black text-white rounded-lg text-sm font-medium"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                >
                  <FiGrid className={viewMode === 'grid' ? 'text-gray-900' : 'text-gray-500'} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                >
                  <FiList className={viewMode === 'list' ? 'text-gray-900' : 'text-gray-500'} />
                </button>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Search */}
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full sm:w-64"
                />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 hover:border-gray-900 rounded-xl transition-colors"
              >
                <FiFilter />
                Filters
                {showFilters && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    {categoryOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                      setCategoryFilter('all');
                      setSelectedProducts([]);
                    }}
                    className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <Link
              to="/seller/products/new"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium"
            >
              <FiPlus />
              Add Your First Product
            </Link>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Product Header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                        {getStatusText(product.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {product.featured && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                          Featured
                        </span>
                      )}
                      <button className="p-1 hover:bg-gray-100 rounded-lg">
                        <FiMoreVertical className="text-gray-400" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    SKU: {product.sku} • {product.category}
                  </div>
                </div>

                {/* Product Image */}
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-red-500/10 flex items-center justify-center">
                      <span className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded-full">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-lg font-bold text-gray-900">${product.price}</span>
                      {product.comparePrice && (
                        <span className="ml-2 text-sm text-gray-400 line-through">
                          ${product.comparePrice}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      Stock: {product.stock}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <FiTrendingUp />
                      <span>{product.sales} sales</span>
                    </div>
                    <span>${product.revenue.toLocaleString()}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link
                      to={`/seller/products/edit/${product.id}`}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-medium text-sm transition-colors"
                    >
                      <FiEdit size={14} />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDuplicateProduct(product)}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors"
                    >
                      <FiCopy size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-sm transition-colors"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-4 px-6 text-left">
                      <input
                        type="checkbox"
                        checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                        onChange={handleSelectAll}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Product</th>
                    <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">SKU</th>
                    <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Category</th>
                    <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Price</th>
                    <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Stock</th>
                    <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Status</th>
                    <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleSelectProduct(product.id)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-500">
                              Sales: {product.sales} • ${product.revenue}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-600">{product.sku}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-600">{product.category}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <span className="font-medium text-gray-900">${product.price}</span>
                          {product.comparePrice && (
                            <div className="text-xs text-gray-400 line-through">${product.comparePrice}</div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${
                            product.stock > 20 ? 'bg-green-500' :
                            product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></span>
                          <span className="text-sm">{product.stock}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                          {getStatusText(product.status)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/seller/products/edit/${product.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <FiEdit size={16} />
                          </Link>
                          <button
                            onClick={() => handleDuplicateProduct(product)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                          >
                            <FiCopy size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50">
              ←
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-lg font-medium">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50">
              2
            </button>
            <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50">
              3
            </button>
            <span className="px-2">...</span>
            <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50">
              5
            </button>
            <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50">
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProducts;