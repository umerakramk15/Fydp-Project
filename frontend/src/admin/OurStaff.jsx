// src/admin/pages/Staff/Staff.js
import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  X,
  User,
  Mail,
  Phone,
  Calendar,
  Camera
} from 'lucide-react';

const Staff = () => {
  const [staff, setStaff] = useState([
    {
      id: '1',
      name: 'admin',
      email: 'admin@gmail.com',
      phone: '360-943-7332',
      joiningDate: '2025-11-13',
      role: 'super admin',
      status: 'active',
      published: true,
      avatar: null
    },
    {
      id: '2',
      name: 'Marion V. Parker',
      email: 'marion@gmail.com',
      phone: '713-675-8813',
      joiningDate: '2025-11-13',
      role: 'admin',
      status: 'active',
      published: true,
      avatar: null
    },
    {
      id: '3',
      name: 'Stacey J. Meikle',
      email: 'stacey@gmail.com',
      phone: '616-738-0407',
      joiningDate: '2025-11-13',
      role: 'ceo',
      status: 'active',
      published: true,
      avatar: null
    },
    {
      id: '4',
      name: 'Shawn E. Palmer',
      email: 'shawn@gmail.com',
      phone: '949-202-2913',
      joiningDate: '2025-11-13',
      role: 'manager',
      status: 'active',
      published: true,
      avatar: null
    },
    {
      id: '5',
      name: 'Corrie H. Cates',
      email: 'corrie@gmail.com',
      phone: '914-623-6873',
      joiningDate: '2025-11-13',
      role: 'accountant',
      status: 'active',
      published: true,
      avatar: null
    },
    {
      id: '6',
      name: 'Alice B. Porter',
      email: 'alice@gmail.com',
      phone: '708-488-9728',
      joiningDate: '2025-11-13',
      role: 'cashier',
      status: 'active',
      published: true,
      avatar: null
    },
    {
      id: '7',
      name: 'Dorothy R. Brown',
      email: 'dorothy@gmail.com',
      phone: '708-628-3122',
      joiningDate: '2025-11-13',
      role: 'security guard',
      status: 'active',
      published: true,
      avatar: null
    }
  ]);

  const [selectedStaff, setSelectedStaff] = useState([]);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [isEditStaffOpen, setIsEditStaffOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPublished, setFilterPublished] = useState('all');

  // Form state for Add Staff
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    joiningDate: '',
    role: '',
    status: 'active',
    published: true,
    password: '',
    confirmPassword: '',
    avatar: null
  });

  // Form state for Edit Staff
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    joiningDate: '',
    role: '',
    status: 'active',
    published: true,
    password: '',
    confirmPassword: '',
    avatar: null
  });

  const roles = [
    'super admin',
    'admin',
    'ceo',
    'manager',
    'accountant',
    'cashier',
    'security guard',
    'sales executive',
    'support staff'
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
            avatar: e.target.result
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            avatar: e.target.result
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
        avatar: null
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        avatar: null
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newStaff = {
      id: Math.random().toString(36).substr(2, 8),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      joiningDate: formData.joiningDate,
      role: formData.role,
      status: formData.status,
      published: formData.published,
      avatar: formData.avatar
    };

    setStaff(prev => [...prev, newStaff]);
    setIsAddStaffOpen(false);
    resetAddForm();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    
    const updatedStaff = {
      ...editingStaff,
      name: editFormData.name,
      email: editFormData.email,
      phone: editFormData.phone,
      joiningDate: editFormData.joiningDate,
      role: editFormData.role,
      status: editFormData.status,
      published: editFormData.published,
      avatar: editFormData.avatar
    };

    setStaff(prev => prev.map(staff => 
      staff.id === editingStaff.id ? updatedStaff : staff
    ));
    
    setIsEditStaffOpen(false);
    setEditingStaff(null);
    resetEditForm();
  };

  const resetAddForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      joiningDate: '',
      role: '',
      status: 'active',
      published: true,
      password: '',
      confirmPassword: '',
      avatar: null
    });
  };

  const resetEditForm = () => {
    setEditFormData({
      name: '',
      email: '',
      phone: '',
      joiningDate: '',
      role: '',
      status: 'active',
      published: true,
      password: '',
      confirmPassword: '',
      avatar: null
    });
  };

  const handleCancel = () => {
    setIsAddStaffOpen(false);
    resetAddForm();
  };

  const handleEditCancel = () => {
    setIsEditStaffOpen(false);
    setEditingStaff(null);
    resetEditForm();
  };

  const handleEdit = (staffMember) => {
    setEditingStaff(staffMember);
    setEditFormData({
      name: staffMember.name,
      email: staffMember.email,
      phone: staffMember.phone,
      joiningDate: staffMember.joiningDate,
      role: staffMember.role,
      status: staffMember.status,
      published: staffMember.published,
      password: '',
      confirmPassword: '',
      avatar: staffMember.avatar
    });
    setIsEditStaffOpen(true);
  };

  const toggleStaffSelection = (id) => {
    setSelectedStaff(prev =>
      prev.includes(id)
        ? prev.filter(staffId => staffId !== id)
        : [...prev, id]
    );
  };

  const toggleAllSelection = () => {
    setSelectedStaff(prev =>
      prev.length === staff.length ? [] : staff.map(staff => staff.id)
    );
  };

  const deleteStaff = (id) => {
    setStaff(prev => prev.filter(staff => staff.id !== id));
    setSelectedStaff(prev => prev.filter(staffId => staffId !== id));
  };

  const deleteSelectedStaff = () => {
    setStaff(prev => prev.filter(staff => !selectedStaff.includes(staff.id)));
    setSelectedStaff([]);
  };

  const togglePublishStatus = (id) => {
    setStaff(prev =>
      prev.map(staff =>
        staff.id === id ? { ...staff, published: !staff.published } : staff
      )
    );
  };

  const toggleStatus = (id) => {
    setStaff(prev =>
      prev.map(staff =>
        staff.id === id ? { ...staff, status: staff.status === 'active' ? 'inactive' : 'active' } : staff
      )
    );
  };

  // Filter staff based on search and filters
  const filteredStaff = staff.filter(staffMember => {
    const matchesSearch = 
      staffMember.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staffMember.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staffMember.phone.includes(searchTerm);
    
    const matchesRole = 
      filterRole === 'all' || staffMember.role === filterRole;
    
    const matchesStatus = 
      filterStatus === 'all' || staffMember.status === filterStatus;
    
    const matchesPublished = 
      filterPublished === 'all' || 
      (filterPublished === 'published' && staffMember.published) ||
      (filterPublished === 'unpublished' && !staffMember.published);
    
    return matchesSearch && matchesRole && matchesStatus && matchesPublished;
  });

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const getPublishedColor = (published) => {
    return published 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'super admin': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-blue-100 text-blue-800';
      case 'ceo': return 'bg-red-100 text-red-800';
      case 'manager': return 'bg-orange-100 text-orange-800';
      case 'accountant': return 'bg-green-100 text-green-800';
      case 'cashier': return 'bg-teal-100 text-teal-800';
      case 'security guard': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const renderImageUpload = (isEdit = false) => {
    const currentData = isEdit ? editFormData : formData;
    const currentAvatar = currentData.avatar;

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Profile Image
        </label>
        <div className="flex items-center space-x-4">
          <div className="relative">
            {currentAvatar ? (
              <>
                <img
                  src={currentAvatar}
                  alt="Profile"
                  className="h-20 w-20 rounded-full object-cover border-2 border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => removeImage(isEdit)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </>
            ) : (
              <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300">
                <User className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <input
              type="file"
              id={`avatar-${isEdit ? 'edit' : 'add'}`}
              accept="image/*"
              onChange={(e) => handleImageUpload(e, isEdit)}
              className="hidden"
            />
            <label
              htmlFor={`avatar-${isEdit ? 'edit' : 'add'}`}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <Camera className="h-4 w-4 mr-2" />
              {currentAvatar ? 'Change Image' : 'Upload Image'}
            </label>
            <p className="text-xs text-gray-500 mt-1">
              JPG, PNG, WEBP (Max 2MB)
            </p>
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
          <h1 className="text-2xl font-bold text-gray-900">All Staff</h1>
          <p className="text-gray-600">Manage your staff members and their roles</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {selectedStaff.length > 0 && (
            <button 
              onClick={deleteSelectedStaff}
              className="flex items-center px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete ({selectedStaff.length})
            </button>
          )}
          <button 
            onClick={() => setIsAddStaffOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Staff
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name/email/phone"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select 
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Staff Role</option>
              {roles.map(role => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select 
              value={filterPublished}
              onChange={(e) => setFilterPublished(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Visibility</option>
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
            <button 
              onClick={() => {
                setSearchTerm('');
                setFilterRole('all');
                setFilterStatus('all');
                setFilterPublished('all');
              }}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-6 py-3">
                  <input
                    type="checkbox"
                    checked={selectedStaff.length === staff.length && staff.length > 0}
                    onChange={toggleAllSelection}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joining Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STATUS
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
              {filteredStaff.map((staffMember) => (
                <tr key={staffMember.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedStaff.includes(staffMember.id)}
                      onChange={() => toggleStaffSelection(staffMember.id)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {staffMember.avatar ? (
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={staffMember.avatar}
                            alt={staffMember.name}
                          />
                        ) : (
                          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium text-sm">
                              {getInitials(staffMember.name)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {staffMember.name}
                        </div>
                        <div className="text-xs text-gray-500">staff</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {staffMember.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {staffMember.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {formatDate(staffMember.joiningDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(staffMember.role)}`}>
                      {staffMember.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(staffMember.status)}`}>
                      {staffMember.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPublishedColor(staffMember.published)}`}>
                      {staffMember.published ? 'Published' : 'Unpublished'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                        <Eye className="h-3 w-3 mr-1" />
                        
                      </button>
                      <button 
                        onClick={() => handleEdit(staffMember)}
                        className="flex items-center px-3 py-1 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        
                      </button>
                      <button 
                        onClick={() => deleteStaff(staffMember.id)}
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
        {filteredStaff.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">No staff members found</div>
            <div className="text-sm text-gray-500">
              {searchTerm || filterRole !== 'all' || filterStatus !== 'all' || filterPublished !== 'all'
                ? 'Try adjusting your search or filters' 
                : 'Get started by adding your first staff member'
              }
            </div>
          </div>
        )}
      </div>

      {/* Add Staff Offcanvas */}
      {isAddStaffOpen && (
        <Offcanvas
          title="Add Staff"
          description="Add new staff member to your organization"
          isOpen={isAddStaffOpen}
          onClose={handleCancel}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitText="Add Staff"
        >
          {renderImageUpload(false)}
          <StaffForm formData={formData} onChange={handleInputChange} roles={roles} />
        </Offcanvas>
      )}

      {/* Edit Staff Offcanvas */}
      {isEditStaffOpen && editingStaff && (
        <Offcanvas
          title="Edit Staff"
          description="Update staff member information"
          isOpen={isEditStaffOpen}
          onClose={handleEditCancel}
          onSubmit={handleEditSubmit}
          onCancel={handleEditCancel}
          submitText="Update Staff"
        >
          {renderImageUpload(true)}
          <StaffForm formData={editFormData} onChange={handleEditInputChange} roles={roles} isEdit={true} />
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

// Reusable Staff Form Component
const StaffForm = ({ formData, onChange, roles, isEdit = false }) => {
  return (
    <div className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter full name"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter email address"
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter phone number"
          required
        />
      </div>

      {/* Joining Date */}
      <div>
        <label htmlFor="joiningDate" className="block text-sm font-medium text-gray-700 mb-2">
          Joining Date
        </label>
        <input
          type="date"
          id="joiningDate"
          name="joiningDate"
          value={formData.joiningDate}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {/* Role */}
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
          Role
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          <option value="">Select Role</option>
          {roles.map(role => (
            <option key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Password Fields - Only show for Add or when changing password in Edit */}
      {!isEdit && (
        <>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter password"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Confirm password"
              required
            />
          </div>
        </>
      )}

      {/* Status and Published */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="flex items-center justify-center">
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
    </div>
  );
};

export default Staff;