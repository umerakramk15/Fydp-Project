// src/admin/pages/Products/Products.js
import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Trash2,
  Edit,
  Eye,
  X,
  ChevronDown,
  FileText,
  Package,
  TrendingUp,
  Image,
  Tag,
  Hash
} from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Premium Baby Food',
      category: 'Baby Food',
      price: 70.00,
      salePrice: 59.99,
      stock: 4,
      status: 'Selling',
      published: true,
      images: ['https://images.unsplash.com/photo-1570913190149-e2a60c2f0f1d?w=100&h=100&fit=crop&crop=center'],
      sku: 'SKU001',
      barcode: '123456789',
      slug: 'premium-baby-food',
      tags: ['organic', 'baby'],
      description: 'Premium organic baby food with natural ingredients',
      hasVariants: false
    },
    {
      id: '2',
      name: 'Modern Home Decor',
      category: 'Home',
      price: 133.00,
      salePrice: 130.03,
      stock: 0,
      status: 'Sold Out',
      published: true,
      images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop&crop=center'],
      sku: 'SKU002',
      barcode: '123456790',
      slug: 'modern-home-decor',
      tags: ['decor', 'home'],
      description: 'Modern home decoration item',
      hasVariants: false
    },
    {
      id: '3',
      name: 'Premium T-Shirt',
      category: 'Men',
      price: 450.00,
      salePrice: 450.00,
      stock: 4969,
      status: 'Selling',
      published: true,
      images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop&crop=center'],
      sku: 'SKU003',
      barcode: '123456791',
      slug: 'premium-t-shirt',
      tags: ['premium', 'clothing'],
      description: 'Premium quality cotton t-shirt',
      hasVariants: true
    },
    {
      id: '4',
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: 199.99,
      salePrice: 149.99,
      stock: 25,
      status: 'Selling',
      published: false,
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop&crop=center'],
      sku: 'SKU004',
      barcode: '123456792',
      slug: 'wireless-headphones',
      tags: ['electronics', 'audio'],
      description: 'High-quality wireless headphones',
      hasVariants: false
    }
  ]);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Form state for Add Product
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    images: [],
    sku: '',
    barcode: '',
    category: '',
    price: 0,
    salePrice: 0,
    stock: 0,
    slug: '',
    tags: [],
    hasVariants: false,
    published: true,
    currentTag: ''
  });

  // Form state for Edit Product
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    images: [],
    sku: '',
    barcode: '',
    category: '',
    price: 0,
    salePrice: 0,
    stock: 0,
    slug: '',
    tags: [],
    hasVariants: false,
    published: true,
    currentTag: ''
  });

  const categories = [
    'Default Category',
    'Baby Food',
    'Home',
    'Men',
    'Skin Care',
    'Fresh Vegetable',
    'Fresh Fruits',
    'Electronics',
    'Clothing',
    'Sports'
  ];

  // Updated filter options
  const priceRanges = [
    { value: 'all', label: 'Price' },
    { value: 'low-high', label: 'Low to High' },
    { value: 'high-low', label: 'High to Low' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Status' },
    { value: 'published', label: 'Published' },
    { value: 'unpublished', label: 'Unpublished' },
    { value: 'Selling', label: 'Selling' },
    { value: 'Sold Out', label: 'Out of Stock' }
  ];

  // Calculate statistics
  const totalProducts = products.length;
  const sellingProducts = products.filter(product => product.status === 'Selling').length;
  const soldOutProducts = products.filter(product => product.status === 'Sold Out').length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts.toString(),
      description: 'All products',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: Package
    },
    {
      title: 'Selling',
      value: sellingProducts.toString(),
      description: 'Active products',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      icon: TrendingUp
    },
    {
      title: 'Sold Out',
      value: soldOutProducts.toString(),
      description: 'Out of stock',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      icon: Package
    },
    {
      title: 'Total Stock',
      value: totalStock.toString(),
      description: 'Available items',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      icon: FileText
    }
  ];

  // Form handlers (keep all your existing form handlers the same)
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNumberInputChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    const setter = isEdit ? setEditFormData : setFormData;
    setter(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleImageUpload = (e, isEdit = false) => {
    const files = Array.from(e.target.files);
    const setter = isEdit ? setEditFormData : setFormData;
    
    setter(prev => ({
      ...prev,
      images: [...prev.images, ...files.map(file => URL.createObjectURL(file))]
    }));
  };

  const removeImage = (index, isEdit = false) => {
    const setter = isEdit ? setEditFormData : setFormData;
    setter(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleTagInput = (e, isEdit = false) => {
    const { value } = e.target;
    const setter = isEdit ? setEditFormData : setFormData;
    setter(prev => ({ ...prev, currentTag: value }));
  };

  const addTag = (e, isEdit = false) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      const setter = isEdit ? setEditFormData : setFormData;
      setter(prev => ({
        ...prev,
        tags: [...prev.tags, prev.currentTag.trim()],
        currentTag: ''
      }));
    }
  };

  const removeTag = (index, isEdit = false) => {
    const setter = isEdit ? setEditFormData : setFormData;
    setter(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newProduct = {
      id: Math.random().toString(36).substr(2, 8),
      name: formData.name,
      description: formData.description,
      images: formData.images,
      sku: formData.sku,
      barcode: formData.barcode,
      category: formData.category,
      price: formData.price,
      salePrice: formData.salePrice,
      stock: formData.stock,
      status: formData.stock > 0 ? 'Selling' : 'Sold Out',
      published: formData.published,
      slug: formData.slug,
      tags: formData.tags,
      hasVariants: formData.hasVariants
    };

    setProducts(prev => [...prev, newProduct]);
    setIsAddProductOpen(false);
    resetAddForm();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    
    const updatedProduct = {
      ...editingProduct,
      name: editFormData.name,
      description: editFormData.description,
      images: editFormData.images,
      sku: editFormData.sku,
      barcode: editFormData.barcode,
      category: editFormData.category,
      price: editFormData.price,
      salePrice: editFormData.salePrice,
      stock: editFormData.stock,
      status: editFormData.stock > 0 ? 'Selling' : 'Sold Out',
      published: editFormData.published,
      slug: editFormData.slug,
      tags: editFormData.tags,
      hasVariants: editFormData.hasVariants
    };

    setProducts(prev => prev.map(product => 
      product.id === editingProduct.id ? updatedProduct : product
    ));
    
    setIsEditProductOpen(false);
    setEditingProduct(null);
    resetEditForm();
  };

  const resetAddForm = () => {
    setFormData({
      name: '',
      description: '',
      images: [],
      sku: '',
      barcode: '',
      category: '',
      price: 0,
      salePrice: 0,
      stock: 0,
      slug: '',
      tags: [],
      hasVariants: false,
      published: true,
      currentTag: ''
    });
  };

  const resetEditForm = () => {
    setEditFormData({
      name: '',
      description: '',
      images: [],
      sku: '',
      barcode: '',
      category: '',
      price: 0,
      salePrice: 0,
      stock: 0,
      slug: '',
      tags: [],
      hasVariants: false,
      published: true,
      currentTag: ''
    });
  };

  const handleCancel = () => {
    setIsAddProductOpen(false);
    resetAddForm();
  };

  const handleEditCancel = () => {
    setIsEditProductOpen(false);
    setEditingProduct(null);
    resetEditForm();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditFormData({
      name: product.name,
      description: product.description,
      images: product.images,
      sku: product.sku,
      barcode: product.barcode,
      category: product.category,
      price: product.price,
      salePrice: product.salePrice,
      stock: product.stock,
      slug: product.slug,
      tags: product.tags,
      hasVariants: product.hasVariants,
      published: product.published,
      currentTag: ''
    });
    setIsEditProductOpen(true);
  };

  // Rest of the existing functions
  const handleResetFilters = () => {
    setSearchTerm('');
    setFilterCategory('all');
    setFilterPrice('all');
    setFilterStatus('all');
  };

  const toggleProductSelection = (id) => {
    setSelectedProducts(prev =>
      prev.includes(id)
        ? prev.filter(productId => productId !== id)
        : [...prev, id]
    );
  };

  const toggleAllSelection = () => {
    setSelectedProducts(prev =>
      prev.length === products.length ? [] : products.map(product => product.id)
    );
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
    setSelectedProducts(prev => prev.filter(productId => productId !== id));
  };

  const deleteSelectedProducts = () => {
    setProducts(prev => prev.filter(product => !selectedProducts.includes(product.id)));
    setSelectedProducts([]);
  };

  const togglePublishStatus = (id) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, published: !product.published } : product
      )
    );
  };

  const toggleStatus = (id) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { 
          ...product, 
          status: product.status === 'Selling' ? 'Sold Out' : 'Selling' 
        } : product
      )
    );
  };

  // Updated filter products function
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      filterCategory === 'all' || product.category === filterCategory;
    
    const matchesStatus = () => {
      if (filterStatus === 'all') return true;
      if (filterStatus === 'published') return product.published;
      if (filterStatus === 'unpublished') return !product.published;
      if (filterStatus === 'Selling') return product.status === 'Selling';
      if (filterStatus === 'Sold Out') return product.status === 'Sold Out';
      return true;
    };
    
    return matchesSearch && matchesCategory && matchesStatus();
  });

  // Sort products based on price filter
  const sortedAndFilteredProducts = [...filteredProducts].sort((a, b) => {
    if (filterPrice === 'low-high') {
      return a.price - b.price;
    } else if (filterPrice === 'high-low') {
      return b.price - a.price;
    }
    return 0;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Selling': return 'bg-green-100 text-green-800';
      case 'Sold Out': return 'bg-red-100 text-red-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPublishedColor = (published) => {
    return published 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  const getStockColor = (stock) => {
    if (stock === 0) return 'text-red-600';
    if (stock < 10) return 'text-orange-600';
    return 'text-green-600';
  };

  // Render product form (keep the same as before)
  const renderProductForm = (isEdit = false) => {
    const currentData = isEdit ? editFormData : formData;
    const handleChange = isEdit ? handleEditInputChange : handleInputChange;
    const handleNumberChange = (e) => handleNumberInputChange(e, isEdit);
    const handleImageUploadFunc = (e) => handleImageUpload(e, isEdit);
    const handleRemoveImage = (index) => removeImage(index, isEdit);
    const handleTagInputFunc = (e) => handleTagInput(e, isEdit);
    const handleAddTag = (e) => addTag(e, isEdit);
    const handleRemoveTag = (index) => removeTag(index, isEdit);

    return (
      <div className="space-y-6">
        {/* Language Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">en</span>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <span className="text-sm text-gray-500">English</span>
        </div>

        {/* Basic Info Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Info</h3>
          
          {/* Variants Toggle */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Does this product have variants?
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleChange({ target: { name: 'hasVariants', value: true } })}
                className={`flex-1 py-3 px-4 border rounded-lg text-center font-medium transition-colors ${
                  currentData.hasVariants
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleChange({ target: { name: 'hasVariants', value: false } })}
                className={`flex-1 py-3 px-4 border rounded-lg text-center font-medium transition-colors ${
                  !currentData.hasVariants
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                No
              </button>
            </div>
          </div>

          {/* Product Title/Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Product Title/Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={currentData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Product Title/Name"
              required
            />
          </div>

          {/* Product Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Product Description
            </label>
            <textarea
              id="description"
              name="description"
              value={currentData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Product Description"
            />
          </div>

          {/* Product Images */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                id="images"
                multiple
                accept=".jpeg,.jpg,.webp,.png"
                onChange={handleImageUploadFunc}
                className="hidden"
              />
              <label htmlFor="images" className="cursor-pointer">
                <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Drag your images here
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  (Only *.jpeg, *.webp and *.png images will be accepted)
                </p>
              </label>
            </div>

            {/* Image Previews */}
            {currentData.images.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {currentData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SKU and Barcode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-2">
                Product SKU
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  value={currentData.sku}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Product SKU"
                />
              </div>
            </div>
            <div>
              <label htmlFor="barcode" className="block text-sm font-medium text-gray-700 mb-2">
                Product Barcode
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  id="barcode"
                  name="barcode"
                  value={currentData.barcode}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Product Barcode"
                />
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={currentData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price and Sale Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Product Price
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={currentData.price}
                  onChange={handleNumberChange}
                  min="0"
                  step="0.01"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <label htmlFor="salePrice" className="block text-sm font-medium text-gray-700 mb-2">
                Sale Price
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  id="salePrice"
                  name="salePrice"
                  value={currentData.salePrice}
                  onChange={handleNumberChange}
                  min="0"
                  step="0.01"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Product Quantity */}
          <div className="mb-4">
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
              Product Quantity
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={currentData.stock}
              onChange={handleNumberChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
          </div>

          {/* Product Slug */}
          <div className="mb-4">
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
              Product Slug
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={currentData.slug}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Product Slug"
            />
          </div>

          {/* Product Tags */}
          <div className="mb-4">
            <label htmlFor="currentTag" className="block text-sm font-medium text-gray-700 mb-2">
              Product Tags
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                id="currentTag"
                name="currentTag"
                value={currentData.currentTag}
                onChange={handleTagInputFunc}
                onKeyDown={handleAddTag}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Product Tag (Write then press enter to add new tag)"
              />
            </div>
            
            {/* Tags Display */}
            {currentData.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {currentData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(index)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product catalog and inventory</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </button>
          {selectedProducts.length > 0 && (
            <button 
              onClick={deleteSelectedProducts}
              className="flex items-center px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete ({selectedProducts.length})
            </button>
          )}
          <button 
            onClick={() => setIsAddProductOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Filter Section - UPDATED */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search Product"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">Category</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Price Filter - UPDATED */}
          <div className="relative">
            <select 
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              {priceRanges.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Status Filter - UPDATED */}
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
        </div>

        <div className="flex gap-2">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button 
            onClick={handleResetFilters}
            className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Products Table - UPDATED with images */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-6 py-3">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === products.length && products.length > 0}
                    onChange={toggleAllSelection}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PRODUCT NAME
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CATEGORY
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PRICE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SALE PRICE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STOCK
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STATUS
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  VIEW
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PUBLISHED
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedAndFilteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleProductSelection(product.id)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img 
                          className="h-10 w-10 rounded object-cover border border-gray-200" 
                          src={product.images[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center'} 
                          alt={product.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-500">SKU: {product.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${product.price.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${product.salePrice.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getStockColor(product.stock)}`}>
                      {product.stock}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="flex items-center text-blue-600 hover:text-blue-900 text-sm font-medium">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPublishedColor(product.published)}`}>
                      {product.published ? 'Published' : 'Unpublished'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => toggleStatus(product.id)}
                        className={`p-1 rounded ${
                          product.status === 'Selling' 
                            ? 'text-green-600 hover:bg-green-100' 
                            : 'text-red-600 hover:bg-red-100'
                        }`}
                      >
                        {product.status === 'Selling' ? '🟢' : '🔴'}
                      </button>
                      <button 
                        onClick={() => togglePublishStatus(product.id)}
                        className={`p-1 rounded ${
                          product.published 
                            ? 'text-green-600 hover:bg-green-100' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {product.published ? <Eye className="h-4 w-4" /> : <X className="h-4 w-4" />}
                      </button>
                      <button 
                        onClick={() => handleEdit(product)}
                        className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {sortedAndFilteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">No products found</div>
            <div className="text-sm text-gray-500">
              {searchTerm || filterCategory !== 'all' || filterPrice !== 'all' || filterStatus !== 'all'
                ? 'Try adjusting your search or filters' 
                : 'Get started by adding your first product'
              }
            </div>
          </div>
        )}
      </div>

      {/* Add Product Offcanvas */}
      {isAddProductOpen && (
        <Offcanvas
          title="Add Product"
          description="Add your product and necessary information from here"
          isOpen={isAddProductOpen}
          onClose={handleCancel}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitText="Add Product"
        >
          {renderProductForm(false)}
        </Offcanvas>
      )}

      {/* Edit Product Offcanvas */}
      {isEditProductOpen && editingProduct && (
        <Offcanvas
          title="Update Product"
          description="Edit your product and necessary information from here"
          isOpen={isEditProductOpen}
          onClose={handleEditCancel}
          onSubmit={handleEditSubmit}
          onCancel={handleEditCancel}
          submitText="Update Product"
        >
          {renderProductForm(true)}
        </Offcanvas>
      )}
    </div>
  );
};

// Reusable Offcanvas Component (keep the same)
const Offcanvas = ({ title, description, isOpen, onClose, onSubmit, onCancel, submitText, children }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Offcanvas */}
      <div className="fixed inset-y-0 right-0 max-w-2xl w-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-600 mt-1">
                {description}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto">
            <form onSubmit={onSubmit} className="p-6">
              {children}
            </form>
          </div>

          {/* Footer Buttons */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={onSubmit}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {submitText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;