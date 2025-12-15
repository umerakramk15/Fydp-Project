// src/admin/pages/Categories/Categories.js
import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Download, 
  Upload, 
  X,
  Eye,
  Image,
  ChevronDown
} from 'lucide-react';

const Categories = () => {
  const [categories, setCategories] = useState([
    {
      id: '0c24',
      name: 'Fish & Meat',
      description: 'Fresh fish and meat products',
      image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=100&h=100&fit=crop&crop=center',
      published: true,
      slug: 'fish-meat'
    },
    {
      id: '0be8',
      name: 'Fruits & Vegetable',
      description: 'Fresh fruits and vegetables',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=100&h=100&fit=crop&crop=center',
      published: true,
      slug: 'fruits-vegetable'
    },
    {
      id: '0bc4',
      name: 'Cooking Essentials',
      description: 'Basic cooking ingredients and essentials',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop&crop=center',
      published: true,
      slug: 'cooking-essentials'
    },
    {
      id: '0ba0',
      name: 'Biscuits & Cakes',
      description: 'Bakery items, biscuits, and cakes',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&h=100&fit=crop&crop=center',
      published: false,
      slug: 'biscuits-cakes'
    },
    {
      id: '0b49',
      name: 'Household Tools',
      description: 'Tools and equipment for household',
      image: 'https://images.unsplash.com/photo-1581093458791-8a0a1ce44b6d?w=100&h=100&fit=crop&crop=center',
      published: true,
      slug: 'household-tools'
    }
  ]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPublished, setFilterPublished] = useState('all');

  // Form state for Add Category
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    slug: '',
    published: true
  });

  // Form state for Edit Category
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    image: '',
    slug: '',
    published: true
  });

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
      const imageUrl = URL.createObjectURL(file);
      if (isEdit) {
        setEditFormData(prev => ({
          ...prev,
          image: imageUrl
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          image: imageUrl
        }));
      }
    }
  };

  const removeImage = (isEdit = false) => {
    if (isEdit) {
      setEditFormData(prev => ({
        ...prev,
        image: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        image: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = {
      id: Math.random().toString(36).substr(2, 4),
      ...formData
    };
    setCategories(prev => [...prev, newCategory]);
    setIsAddCategoryOpen(false);
    resetForm();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedCategory = {
      ...editingCategory,
      ...editFormData
    };
    setCategories(prev => prev.map(cat => 
      cat.id === editingCategory.id ? updatedCategory : cat
    ));
    setIsEditCategoryOpen(false);
    setEditingCategory(null);
    resetEditForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image: '',
      slug: '',
      published: true
    });
  };

  const resetEditForm = () => {
    setEditFormData({
      name: '',
      description: '',
      image: '',
      slug: '',
      published: true
    });
  };

  const handleCancel = () => {
    setIsAddCategoryOpen(false);
    resetForm();
  };

  const handleEditCancel = () => {
    setIsEditCategoryOpen(false);
    setEditingCategory(null);
    resetEditForm();
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setEditFormData({
      name: category.name,
      description: category.description,
      image: category.image,
      slug: category.slug,
      published: category.published
    });
    setIsEditCategoryOpen(true);
  };

  const toggleCategorySelection = (id) => {
    setSelectedCategories(prev =>
      prev.includes(id)
        ? prev.filter(catId => catId !== id)
        : [...prev, id]
    );
  };

  const toggleAllSelection = () => {
    setSelectedCategories(prev =>
      prev.length === categories.length ? [] : categories.map(cat => cat.id)
    );
  };

  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
    setSelectedCategories(prev => prev.filter(catId => catId !== id));
  };

  const deleteSelectedCategories = () => {
    setCategories(prev => prev.filter(cat => !selectedCategories.includes(cat.id)));
    setSelectedCategories([]);
  };

  const togglePublishStatus = (id) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === id ? { ...cat, published: !cat.published } : cat
      )
    );
  };

  // Filter categories based on search and filter
  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filterPublished === 'all' || 
      (filterPublished === 'published' && category.published) ||
      (filterPublished === 'unpublished' && !category.published);
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (published) => {
    return published 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  // Render category form
  const renderCategoryForm = (isEdit = false) => {
    const currentData = isEdit ? editFormData : formData;
    const handleChange = isEdit ? handleEditInputChange : handleInputChange;
    const handleImageUploadFunc = (e) => handleImageUpload(e, isEdit);
    const handleRemoveImage = () => removeImage(isEdit);

    return (
      <div className="space-y-6">
        {/* Language Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">en</span>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <span className="text-sm text-gray-500">English</span>
        </div>

        {/* Category Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Image
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              id="image"
              accept=".jpeg,.jpg,.webp,.png"
              onChange={handleImageUploadFunc}
              className="hidden"
            />
            
            {currentData.image ? (
              <div className="flex flex-col items-center">
                <img
                  src={currentData.image}
                  alt="Category preview"
                  className="w-24 h-24 object-cover rounded-lg border border-gray-300 mb-4"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="flex items-center px-3 py-1 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 text-sm"
                >
                  <X className="h-4 w-4 mr-1" />
                  Remove Image
                </button>
              </div>
            ) : (
              <label htmlFor="image" className="cursor-pointer">
                <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Drag your image here or click to upload
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  (Only *.jpeg, *.webp and *.png images will be accepted)
                </p>
              </label>
            )}
          </div>
        </div>

        {/* Category Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Category Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={currentData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter category name"
            required
          />
        </div>

        {/* Category Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={currentData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter category description"
          />
        </div>

        {/* Category Slug */}
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={currentData.slug}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter URL slug"
            required
          />
        </div>

        {/* Published Status */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            name="published"
            checked={currentData.published}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
            Published
          </label>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Category</h1>
          <p className="text-gray-600">Manage your product categories</p>
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
          {selectedCategories.length > 0 && (
            <button 
              onClick={deleteSelectedCategories}
              className="flex items-center px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete ({selectedCategories.length})
            </button>
          )}
          <button 
            onClick={() => setIsAddCategoryOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Category name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="">
            <select 
              value={filterPublished}
              onChange={(e) => setFilterPublished(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="flex gap-2">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button 
            onClick={() => {
              setSearchTerm('');
              setFilterPublished('all');
            }}
            className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
        </div>
        </div>

        
      </div>

      {/* Categories Table - Updated with Images */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-6 py-3">
                  <input
                    type="checkbox"
                    checked={selectedCategories.length === categories.length && categories.length > 0}
                    onChange={toggleAllSelection}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ICON
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NAME
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DESCRIPTION
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
              {filteredCategories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => toggleCategorySelection(category.id)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono text-gray-900">{category.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {category.image && (
                        <img 
                          src={category.image} 
                          alt={category.name}
                          className="w-8 h-8 rounded object-cover border border-gray-200"
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                    <div className="text-xs text-gray-500">/{category.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 max-w-xs">
                      {category.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(category.published)}`}>
                      {category.published ? 'Published' : 'Unpublished'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => togglePublishStatus(category.id)}
                        className={`p-1 rounded ${
                          category.published 
                            ? 'text-green-600 hover:bg-green-100' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {category.published ? <Eye className="h-4 w-4" /> : <X className="h-4 w-4" />}
                      </button>
                      <button 
                        onClick={() => handleEdit(category)}
                        className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => deleteCategory(category.id)}
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
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">No categories found</div>
            <div className="text-sm text-gray-500">
              {searchTerm || filterPublished !== 'all' 
                ? 'Try adjusting your search or filter' 
                : 'Get started by adding your first category'
              }
            </div>
          </div>
        )}
      </div>

      {/* Add Category Offcanvas */}
      {isAddCategoryOpen && (
        <Offcanvas
          title="Add Category"
          description="Add your category and necessary information from here"
          isOpen={isAddCategoryOpen}
          onClose={handleCancel}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitText="Add Category"
        >
          {renderCategoryForm(false)}
        </Offcanvas>
      )}

      {/* Edit Category Offcanvas */}
      {isEditCategoryOpen && editingCategory && (
        <Offcanvas
          title="Update Category"
          description="Edit your category and necessary information from here"
          isOpen={isEditCategoryOpen}
          onClose={handleEditCancel}
          onSubmit={handleEditSubmit}
          onCancel={handleEditCancel}
          submitText="Update Category"
        >
          {renderCategoryForm(true)}
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

export default Categories;