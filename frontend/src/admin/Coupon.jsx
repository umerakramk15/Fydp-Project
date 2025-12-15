// src/admin/pages/Coupons/Coupons.js
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
  Calendar,
  ChevronDown,
  FileText,
  Percent,
  DollarSign,
  Image
} from 'lucide-react';

const Coupons = () => {
  const [coupons, setCoupons] = useState([
    {
      id: '1',
      campaignName: 'asd',
      code: 'asd',
      discount: '11%',
      discountType: 'percentage',
      discountValue: 11,
      published: true,
      startDate: '2025-11-23',
      endDate: '2025-11-23',
      status: 'Expired',
      bannerImage: null
    },
    {
      id: '2',
      campaignName: 'August Gift Voucher',
      code: 'AUGUST24',
      discount: '50%',
      discountType: 'percentage',
      discountValue: 50,
      published: true,
      startDate: '2025-11-23',
      endDate: '2024-10-31',
      status: 'Expired',
      bannerImage: null
    },
    {
      id: '3',
      campaignName: 'Summer Gift Voucher',
      code: 'SUMMER24',
      discount: '10%',
      discountType: 'percentage',
      discountValue: 10,
      published: true,
      startDate: '2025-11-23',
      endDate: '2024-12-20',
      status: 'Expired',
      bannerImage: null
    },
    {
      id: '4',
      campaignName: 'Winter Gift Voucher',
      code: 'WINTER25',
      discount: '$100',
      discountType: 'fixed',
      discountValue: 100,
      published: false,
      startDate: '2025-11-23',
      endDate: '2025-06-01',
      status: 'Expired',
      bannerImage: null
    },
    {
      id: '5',
      campaignName: 'Summer Gift Voucher',
      code: 'SUMMER26',
      discount: '10%',
      discountType: 'percentage',
      discountValue: 10,
      published: true,
      startDate: '2025-11-23',
      endDate: '2026-10-19',
      status: 'Active',
      bannerImage: null
    }
  ]);

  const [selectedCoupons, setSelectedCoupons] = useState([]);
  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false);
  const [isEditCouponOpen, setIsEditCouponOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPublished, setFilterPublished] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Form state for Add Coupon
  const [formData, setFormData] = useState({
    campaignName: '',
    code: '',
    discountType: 'percentage',
    discountValue: '',
    minPurchase: '',
    maxDiscount: '',
    usageLimit: '',
    perUserLimit: '',
    startDate: '',
    endDate: '',
    published: true,
    bannerImage: null
  });

  // Form state for Edit Coupon
  const [editFormData, setEditFormData] = useState({
    campaignName: '',
    code: '',
    discountType: 'percentage',
    discountValue: '',
    minPurchase: '',
    maxDiscount: '',
    usageLimit: '',
    perUserLimit: '',
    startDate: '',
    endDate: '',
    published: true,
    bannerImage: null
  });

  // Calculate statistics
  const totalCoupons = coupons.length;
  const activeCoupons = coupons.filter(coupon => coupon.status === 'Active').length;
  const expiredCoupons = coupons.filter(coupon => coupon.status === 'Expired').length;
  const publishedCoupons = coupons.filter(coupon => coupon.published).length;

  const stats = [
    {
      title: 'Total Coupons',
      value: totalCoupons.toString(),
      description: 'All coupons',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: FileText
    },
    {
      title: 'Active',
      value: activeCoupons.toString(),
      description: 'Currently active',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      icon: Eye
    },
    {
      title: 'Expired',
      value: expiredCoupons.toString(),
      description: 'No longer valid',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      icon: X
    },
    {
      title: 'Published',
      value: publishedCoupons.toString(),
      description: 'Visible to customers',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      icon: Download
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Expired', label: 'Expired' },
    { value: 'Upcoming', label: 'Upcoming' }
  ];

  const publishedOptions = [
    { value: 'all', label: 'All Visibility' },
    { value: 'published', label: 'Published' },
    { value: 'unpublished', label: 'Unpublished' }
  ];

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

  const handleImageUpload = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (isEdit) {
          setEditFormData(prev => ({
            ...prev,
            bannerImage: e.target.result
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            bannerImage: e.target.result
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (isEdit = false) => {
    if (isEdit) {
      setEditFormData(prev => ({
        ...prev,
        bannerImage: null
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        bannerImage: null
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate discount display
    const discountDisplay = formData.discountType === 'percentage' 
      ? `${formData.discountValue}%` 
      : `$${formData.discountValue}`;

    // Calculate status based on dates
    const currentDate = new Date();
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const status = currentDate > endDate ? 'Expired' : 
                  currentDate < startDate ? 'Upcoming' : 'Active';

    const newCoupon = {
      id: Math.random().toString(36).substr(2, 8),
      campaignName: formData.campaignName,
      code: formData.code.toUpperCase(),
      discount: discountDisplay,
      discountType: formData.discountType,
      discountValue: parseFloat(formData.discountValue),
      published: formData.published,
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: status,
      bannerImage: formData.bannerImage
    };

    setCoupons(prev => [...prev, newCoupon]);
    setIsAddCouponOpen(false);
    resetAddForm();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    
    // Calculate discount display
    const discountDisplay = editFormData.discountType === 'percentage' 
      ? `${editFormData.discountValue}%` 
      : `$${editFormData.discountValue}`;

    // Calculate status based on dates
    const currentDate = new Date();
    const startDate = new Date(editFormData.startDate);
    const endDate = new Date(editFormData.endDate);
    const status = currentDate > endDate ? 'Expired' : 
                  currentDate < startDate ? 'Upcoming' : 'Active';

    const updatedCoupon = {
      ...editingCoupon,
      campaignName: editFormData.campaignName,
      code: editFormData.code.toUpperCase(),
      discount: discountDisplay,
      discountType: editFormData.discountType,
      discountValue: parseFloat(editFormData.discountValue),
      published: editFormData.published,
      startDate: editFormData.startDate,
      endDate: editFormData.endDate,
      status: status,
      bannerImage: editFormData.bannerImage
    };

    setCoupons(prev => prev.map(coupon => 
      coupon.id === editingCoupon.id ? updatedCoupon : coupon
    ));
    
    setIsEditCouponOpen(false);
    setEditingCoupon(null);
    resetEditForm();
  };

  const resetAddForm = () => {
    setFormData({
      campaignName: '',
      code: '',
      discountType: 'percentage',
      discountValue: '',
      minPurchase: '',
      maxDiscount: '',
      usageLimit: '',
      perUserLimit: '',
      startDate: '',
      endDate: '',
      published: true,
      bannerImage: null
    });
  };

  const resetEditForm = () => {
    setEditFormData({
      campaignName: '',
      code: '',
      discountType: 'percentage',
      discountValue: '',
      minPurchase: '',
      maxDiscount: '',
      usageLimit: '',
      perUserLimit: '',
      startDate: '',
      endDate: '',
      published: true,
      bannerImage: null
    });
  };

  const handleCancel = () => {
    setIsAddCouponOpen(false);
    resetAddForm();
  };

  const handleEditCancel = () => {
    setIsEditCouponOpen(false);
    setEditingCoupon(null);
    resetEditForm();
  };

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    setEditFormData({
      campaignName: coupon.campaignName,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue.toString(),
      minPurchase: '',
      maxDiscount: '',
      usageLimit: '',
      perUserLimit: '',
      startDate: coupon.startDate,
      endDate: coupon.endDate,
      published: coupon.published,
      bannerImage: coupon.bannerImage
    });
    setIsEditCouponOpen(true);
  };

  const toggleCouponSelection = (id) => {
    setSelectedCoupons(prev =>
      prev.includes(id)
        ? prev.filter(couponId => couponId !== id)
        : [...prev, id]
    );
  };

  const toggleAllSelection = () => {
    setSelectedCoupons(prev =>
      prev.length === coupons.length ? [] : coupons.map(coupon => coupon.id)
    );
  };

  const deleteCoupon = (id) => {
    setCoupons(prev => prev.filter(coupon => coupon.id !== id));
    setSelectedCoupons(prev => prev.filter(couponId => couponId !== id));
  };

  const deleteSelectedCoupons = () => {
    setCoupons(prev => prev.filter(coupon => !selectedCoupons.includes(coupon.id)));
    setSelectedCoupons([]);
  };

  const togglePublishStatus = (id) => {
    setCoupons(prev =>
      prev.map(coupon =>
        coupon.id === id ? { ...coupon, published: !coupon.published } : coupon
      )
    );
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setFilterPublished('all');
    setStartDate('');
    setEndDate('');
  };

  // Filter coupons based on search and filters
  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = 
      coupon.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      filterStatus === 'all' || coupon.status === filterStatus;
    
    const matchesPublished = 
      filterPublished === 'all' || 
      (filterPublished === 'published' && coupon.published) ||
      (filterPublished === 'unpublished' && !coupon.published);
    
    const matchesDate = () => {
      if (!startDate && !endDate) return true;
      
      const couponStartDate = new Date(coupon.startDate);
      const couponEndDate = new Date(coupon.endDate);
      const filterStart = startDate ? new Date(startDate) : null;
      const filterEnd = endDate ? new Date(endDate) : null;
      
      if (filterStart && filterEnd) {
        return couponStartDate >= filterStart && couponEndDate <= filterEnd;
      } else if (filterStart) {
        return couponStartDate >= filterStart;
      } else if (filterEnd) {
        return couponEndDate <= filterEnd;
      }
      return true;
    };

    return matchesSearch && matchesStatus && matchesPublished && matchesDate();
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Upcoming': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPublishedColor = (published) => {
    return published 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const renderImageUpload = (isEdit = false) => {
    const currentData = isEdit ? editFormData : formData;
    const currentImage = currentData.bannerImage;

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Coupon Banner Image
        </label>
        <div className="space-y-4">
          {currentImage ? (
            <div className="relative">
              <img
                src={currentImage}
                alt="Coupon Banner"
                className="w-full h-32 object-cover rounded-lg border-2 border-gray-300"
              />
              <button
                type="button"
                onClick={() => removeImage(isEdit)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                id={`banner-${isEdit ? 'edit' : 'add'}`}
                accept="image/*"
                onChange={(e) => handleImageUpload(e, isEdit)}
                className="hidden"
              />
              <label htmlFor={`banner-${isEdit ? 'edit' : 'add'}`} className="cursor-pointer">
                <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, WEBP up to 2MB
                </p>
              </label>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Coupon</h1>
          <p className="text-gray-600">Manage your discount coupons and vouchers</p>
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
          {selectedCoupons.length > 0 && (
            <button 
              onClick={deleteSelectedCoupons}
              className="flex items-center px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete ({selectedCoupons.length})
            </button>
          )}
          <button 
            onClick={() => setIsAddCouponOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Coupon
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

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by coupon code/name"
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

          {/* Published Filter */}
          <div className="relative">
            <select 
              value={filterPublished}
              onChange={(e) => setFilterPublished(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              {publishedOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Empty column for alignment */}
          <div></div>
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

      {/* Coupons Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-6 py-3">
                  <input
                    type="checkbox"
                    checked={selectedCoupons.length === coupons.length && coupons.length > 0}
                    onChange={toggleAllSelection}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CAMPAIGN NAME
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CODE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DISCOUNT
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PUBLISHED
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  START DATE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  END DATE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STATUS
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCoupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedCoupons.includes(coupon.id)}
                      onChange={() => toggleCouponSelection(coupon.id)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{coupon.campaignName}</div>
                    <div className="text-xs text-gray-500">product</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-200">
                      {coupon.code}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">
                      {coupon.discount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPublishedColor(coupon.published)}`}>
                      {coupon.published ? 'Published' : 'Unpublished'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(coupon.startDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(coupon.endDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(coupon.status)}`}>
                      {coupon.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => togglePublishStatus(coupon.id)}
                        className={`p-1 rounded ${
                          coupon.published 
                            ? 'text-green-600 hover:bg-green-100' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {coupon.published ? <Eye className="h-4 w-4" /> : <X className="h-4 w-4" />}
                      </button>
                      <button 
                        onClick={() => handleEdit(coupon)}
                        className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => deleteCoupon(coupon.id)}
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
        {filteredCoupons.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">No coupons found</div>
            <div className="text-sm text-gray-500">
              {searchTerm || filterStatus !== 'all' || filterPublished !== 'all' || startDate || endDate
                ? 'Try adjusting your search or filters' 
                : 'Get started by creating your first coupon'
              }
            </div>
          </div>
        )}
      </div>

      {/* Add Coupon Offcanvas */}
      {isAddCouponOpen && (
        <Offcanvas
          title="Add Coupon"
          description="Create new discount coupon for your customers"
          isOpen={isAddCouponOpen}
          onClose={handleCancel}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitText="Add Coupon"
        >
          {renderImageUpload(false)}
          <CouponForm formData={formData} onChange={handleInputChange} />
        </Offcanvas>
      )}

      {/* Edit Coupon Offcanvas */}
      {isEditCouponOpen && editingCoupon && (
        <Offcanvas
          title="Update Coupon"
          description="Edit coupon information and settings"
          isOpen={isEditCouponOpen}
          onClose={handleEditCancel}
          onSubmit={handleEditSubmit}
          onCancel={handleEditCancel}
          submitText="Update Coupon"
        >
          {renderImageUpload(true)}
          <CouponForm formData={editFormData} onChange={handleEditInputChange} isEdit={true} />
        </Offcanvas>
      )}
    </div>
  );
};

// Reusable Offcanvas Component
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
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
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

// Reusable Coupon Form Component
const CouponForm = ({ formData, onChange, isEdit = false }) => {
  return (
    <div className="space-y-6">
      {/* Campaign Name */}
      <div>
        <label htmlFor="campaignName" className="block text-sm font-medium text-gray-700 mb-2">
          Campaign Name
        </label>
        <input
          type="text"
          id="campaignName"
          name="campaignName"
          value={formData.campaignName}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter campaign name"
          required
        />
      </div>

      {/* Coupon Code */}
      <div>
        <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
          Coupon Code
        </label>
        <input
          type="text"
          id="code"
          name="code"
          value={formData.code}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter coupon code"
          required
        />
      </div>

      {/* Discount Type and Value */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="discountType" className="block text-sm font-medium text-gray-700 mb-2">
            Discount Type
          </label>
          <select
            id="discountType"
            name="discountType"
            value={formData.discountType}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">Fixed Amount ($)</option>
          </select>
        </div>
        <div>
          <label htmlFor="discountValue" className="block text-sm font-medium text-gray-700 mb-2">
            Discount Value
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {formData.discountType === 'percentage' ? (
                <Percent className="h-4 w-4 text-gray-400" />
              ) : (
                <DollarSign className="h-4 w-4 text-gray-400" />
              )}
            </div>
            <input
              type="number"
              id="discountValue"
              name="discountValue"
              value={formData.discountValue}
              onChange={onChange}
              min="0"
              step={formData.discountType === 'percentage' ? "1" : "0.01"}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
              required
            />
          </div>
        </div>
      </div>

      {/* Minimum Purchase */}
      <div>
        <label htmlFor="minPurchase" className="block text-sm font-medium text-gray-700 mb-2">
          Minimum Purchase Amount
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <DollarSign className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="number"
            id="minPurchase"
            name="minPurchase"
            value={formData.minPurchase}
            onChange={onChange}
            min="0"
            step="0.01"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0"
          />
        </div>
      </div>

      {/* Maximum Discount (for percentage) */}
      {formData.discountType === 'percentage' && (
        <div>
          <label htmlFor="maxDiscount" className="block text-sm font-medium text-gray-700 mb-2">
            Maximum Discount Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="number"
              id="maxDiscount"
              name="maxDiscount"
              value={formData.maxDiscount}
              onChange={onChange}
              min="0"
              step="0.01"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
          </div>
        </div>
      )}

      {/* Usage Limits */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="usageLimit" className="block text-sm font-medium text-gray-700 mb-2">
            Total Usage Limit
          </label>
          <input
            type="number"
            id="usageLimit"
            name="usageLimit"
            value={formData.usageLimit}
            onChange={onChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Unlimited"
          />
        </div>
        <div>
          <label htmlFor="perUserLimit" className="block text-sm font-medium text-gray-700 mb-2">
            Usage Per User
          </label>
          <input
            type="number"
            id="perUserLimit"
            name="perUserLimit"
            value={formData.perUserLimit}
            onChange={onChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Unlimited"
          />
        </div>
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      {/* Published Status */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="published"
          name="published"
          checked={formData.published}
          onChange={onChange}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
          Published
        </label>
      </div>
    </div>
  );
};

export default Coupons;