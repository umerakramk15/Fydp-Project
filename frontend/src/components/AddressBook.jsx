import { useState } from "react";
import {
  FiEdit,
  FiTrash2,
  FiCheck,
  FiPlus,
  FiMapPin,
  FiHome,
  FiBriefcase,
} from "react-icons/fi";

const AddressBook = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "USA",
      isPrimary: true,
      addressType: "both",
      label: "Home",
      phone: "+1 (555) 123-4567",
    },
    {
      id: 2,
      street: "456 Park Avenue",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11201",
      country: "USA",
      isPrimary: false,
      addressType: "shipping",
      label: "Office",
      phone: "+1 (555) 987-6543",
    },
    {
      id: 3,
      street: "789 Business Blvd",
      city: "Manhattan",
      state: "NY",
      postalCode: "10016",
      country: "USA",
      isPrimary: false,
      addressType: "billing",
      label: "Work",
      phone: "+1 (555) 456-7890",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "USA",
    isPrimary: false,
    addressType: "shipping",
    label: "Home",
    phone: "",
  });

  const handleAddAddress = () => {
    if (
      newAddress.street &&
      newAddress.city &&
      newAddress.state &&
      newAddress.postalCode
    ) {
      if (newAddress.isPrimary) {
        setAddresses((prev) =>
          prev.map((addr) => ({ ...addr, isPrimary: false }))
        );
      }

      if (editingId) {
        setAddresses(
          addresses.map((addr) =>
            addr.id === editingId ? { ...newAddress, id: editingId } : addr
          )
        );
        setEditingId(null);
      } else {
        setAddresses([
          ...addresses,
          { ...newAddress, id: addresses.length + 1 },
        ]);
      }

      setNewAddress({
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "USA",
        isPrimary: false,
        addressType: "shipping",
        label: "Home",
        phone: "",
      });
      setShowForm(false);
    }
  };

  const handleEditAddress = (address) => {
    setNewAddress(address);
    setEditingId(address.id);
    setShowForm(true);
  };

  const handleSetPrimary = (id) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isPrimary: addr.id === id,
      }))
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      const addressToDelete = addresses.find((addr) => addr.id === id);
      const newAddresses = addresses.filter((addr) => addr.id !== id);

      if (addressToDelete.isPrimary && newAddresses.length > 0) {
        newAddresses[0].isPrimary = true;
      }

      setAddresses(newAddresses);
    }
  };

  const getAddressIcon = (type) => {
    switch (type) {
      case "Home":
        return <FiHome className="text-blue-600" />;
      case "Office":
        return <FiBriefcase className="text-purple-600" />;
      case "Work":
        return <FiBriefcase className="text-green-600" />;
      default:
        return <FiMapPin className="text-gray-600" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "shipping":
        return "bg-green-100 text-green-800";
      case "billing":
        return "bg-purple-100 text-purple-800";
      case "both":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Address Book
          </h1>
          <p className="text-gray-500 text-sm">
            Manage your shipping and billing addresses
          </p>
        </div>
        <button
          onClick={() => {
            setNewAddress({
              street: "",
              city: "",
              state: "",
              postalCode: "",
              country: "USA",
              isPrimary: false,
              addressType: "shipping",
              label: "Home",
              phone: "",
            });
            setEditingId(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <FiPlus size={16} />
          Add New Address
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 border border-blue-200 rounded-2xl bg-blue-50">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            {editingId ? "Edit Address" : "Add New Address"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Label
              </label>
              <select
                className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                value={newAddress.label}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, label: e.target.value })
                }
              >
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                value={newAddress.phone}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, phone: e.target.value })
                }
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                placeholder="Street Address"
                className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                value={newAddress.street}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, street: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                placeholder="City"
                className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                placeholder="State"
                className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                value={newAddress.state}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, state: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Postal Code
              </label>
              <input
                type="text"
                placeholder="Postal Code"
                className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                value={newAddress.postalCode}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, postalCode: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                value={newAddress.country}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, country: e.target.value })
                }
              >
                <option value="USA">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="IN">India</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Type
              </label>
              <select
                className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                value={newAddress.addressType}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, addressType: e.target.value })
                }
              >
                <option value="shipping">Shipping Address</option>
                <option value="billing">Billing Address</option>
                <option value="both">Both Shipping & Billing</option>
              </select>
            </div>

            <div className="flex items-center h-full">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newAddress.isPrimary}
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      isPrimary: e.target.checked,
                    })
                  }
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 font-medium">
                  Set as primary address
                </span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleAddAddress}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors duration-200"
            >
              {editingId ? "Update Address" : "Save Address"}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
              className="px-5 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`border rounded-2xl p-6 relative transition-all duration-200 hover:shadow-md ${
              address.isPrimary
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {address.isPrimary && (
              <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 font-medium">
                <FiCheck /> PRIMARY
              </div>
            )}

            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                {getAddressIcon(address.label)}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900">{address.label}</h3>
                  <span
                    className={`px-2.5 py-0.5 text-xs rounded-full ${getTypeColor(
                      address.addressType
                    )}`}
                  >
                    {address.addressType.charAt(0).toUpperCase() +
                      address.addressType.slice(1)}
                  </span>
                </div>
                <p className="text-gray-500 text-sm">{address.phone}</p>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <p className="text-gray-800 font-medium">{address.street}</p>
              <p className="text-gray-600">
                {address.city}, {address.state} {address.postalCode}
              </p>
              <p className="text-gray-600">{address.country}</p>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditAddress(address)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  <FiEdit size={14} />
                  Edit
                </button>
                {!address.isPrimary && (
                  <button
                    onClick={() => handleSetPrimary(address.id)}
                    className="px-3 py-1.5 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-medium transition-colors"
                  >
                    Set Primary
                  </button>
                )}
              </div>

              <button
                onClick={() => handleDelete(address.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {addresses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-300 mb-4 text-6xl">🏠</div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No addresses yet
          </h3>
          <p className="text-gray-500 mb-6">
            Add your first address to get started
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium"
          >
            <FiPlus size={16} />
            Add Your First Address
          </button>
        </div>
      )}
    </div>
  );
};

export default AddressBook;
