import { useState } from "react";
import {
  FiEdit,
  FiSave,
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiLock,
  FiShield,
  FiX,
} from "react-icons/fi";
import { Link } from "react-router";

const PersonalInformation = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "Yusra",
    lastName: "Johnson",
    email: "yusra@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    gender: "Female",
    role: "buyer",
  });

  const [originalInfo] = useState({ ...userInfo });

  const handleSave = () => {
    console.log("Saving user info:", userInfo);
    setIsEditing(false);
    // In real app: API call to save data
  };

  const handleCancel = () => {
    setUserInfo(originalInfo);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Personal Information
          </h1>
          <p className="text-gray-500 text-sm">
            Manage your personal details and account settings
          </p>
        </div>
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <FiSave size={16} />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all duration-200"
              >
                <FiX size={16} />
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <FiEdit size={16} />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-100 rounded-xl">
            <FiUser className="text-blue-600 text-xl" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Basic Information
            </h2>
            <p className="text-gray-500 text-sm">
              Your name, email, and contact details
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FiUser className="text-gray-400" size={14} />
                First Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userInfo.firstName}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, firstName: e.target.value })
                  }
                  className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter first name"
                />
              ) : (
                <div className="p-3.5 bg-gray-50 border border-gray-100 rounded-xl text-gray-900 font-medium">
                  {userInfo.firstName}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FiUser className="text-gray-400" size={14} />
                Last Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userInfo.lastName}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, lastName: e.target.value })
                  }
                  className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter last name"
                />
              ) : (
                <div className="p-3.5 bg-gray-50 border border-gray-100 rounded-xl text-gray-900 font-medium">
                  {userInfo.lastName}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FiMail className="text-gray-400" size={14} />
                Email Address
              </label>
              <div className="p-3.5 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between">
                <span className="text-gray-900 font-medium">
                  {userInfo.email}
                </span>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full font-medium">
                  Verified
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Contact support to change your email address
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FiPhone className="text-gray-400" size={14} />
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={userInfo.phone}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, phone: e.target.value })
                  }
                  className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter phone number"
                />
              ) : (
                <div className="p-3.5 bg-gray-50 border border-gray-100 rounded-xl text-gray-900 font-medium">
                  {userInfo.phone}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FiCalendar className="text-gray-400" size={14} />
                Date of Birth
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={userInfo.dateOfBirth}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, dateOfBirth: e.target.value })
                  }
                  className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
                />
              ) : (
                <div className="p-3.5 bg-gray-50 border border-gray-100 rounded-xl text-gray-900 font-medium">
                  {userInfo.dateOfBirth}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Account Type
              </label>
              <div className="p-3.5 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      userInfo.role === "buyer"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    <FiUser size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 capitalize">
                      {userInfo.role}
                    </p>
                    <p className="text-xs text-gray-500">
                      {userInfo.role === "buyer"
                        ? "Shop and purchase products"
                        : "Sell products on platform"}
                    </p>
                  </div>
                </div>
                {userInfo.role === "buyer" && (
                  <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                    <Link
                      to="/seller/register"
                      className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    >
                      Become Seller →
                    </Link>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-red-100 rounded-xl">
            <FiShield className="text-red-600 text-xl" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Security Settings
            </h2>
            <p className="text-gray-500 text-sm">
              Manage your account security and privacy
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 hover:border-blue-300 rounded-xl transition-all duration-200 hover:shadow-sm group">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-gray-100 group-hover:bg-blue-50 rounded-lg transition-colors">
                <FiLock
                  className="text-gray-600 group-hover:text-blue-600"
                  size={18}
                />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Change Password</h3>
                <p className="text-sm text-gray-500">
                  Update your password for enhanced security
                </p>
              </div>
            </div>
            <button className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-200">
              Update
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 hover:border-blue-300 rounded-xl transition-all duration-200 hover:shadow-sm group">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-gray-100 group-hover:bg-blue-50 rounded-lg transition-colors">
                <FiShield
                  className="text-gray-600 group-hover:text-blue-600"
                  size={18}
                />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-gray-500">
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400 px-3 py-1 border border-gray-300 rounded-full">
                Not enabled
              </span>
              <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200">
                Enable
              </button>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm text-blue-700 flex items-start gap-2">
            <span className="text-blue-600">💡</span>
            After saving changes, some updates may take a few minutes to reflect
            across all systems.
          </p>
        </div>
      )}
    </div>
  );
};

export default PersonalInformation;
