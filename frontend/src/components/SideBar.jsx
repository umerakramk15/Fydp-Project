import { BiHelpCircle } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import { IoArrowUndoOutline, IoWalletOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineBorderColor, MdPayments } from "react-icons/md";
import { FiHeart, FiSettings } from "react-icons/fi";

const SideBar = ({ selectedTab, setSelectedTab }) => {
  const menuItems = [
    { id: "personal", label: "Personal Information", icon: <BsInfoCircle /> },
    { id: "orders", label: "My Orders", icon: <MdOutlineBorderColor /> },
    { id: "address", label: "Address Book", icon: <GrLocation /> },
    { id: "payments", label: "Payment Methods", icon: <MdPayments /> },
    { id: "wishlist", label: "My Wishlist", icon: <FiHeart /> },
    { id: "wallet", label: "My Wallet", icon: <IoWalletOutline /> },
    { id: "rewards", label: "My Rewards", icon: <IoPersonOutline /> },
    { id: "settings", label: "Account Settings", icon: <FiSettings /> },
  ];

  const bottomItems = [
    { id: "help", label: "Need Help", icon: <BiHelpCircle /> },
    { id: "logout", label: "Sign Out", icon: <IoArrowUndoOutline /> },
  ];

  return (
    <div className="flex h-full flex-col justify-between border-e bg-white rounded-xl shadow-sm">
      <div className="py-6">
        <div className="flex flex-col justify-center items-center px-4">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg" 
            alt="Profile" 
          />
          <p className="font-bold text-lg mt-3 text-gray-900">Yusra Johnson</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-gray-500 text-sm">Balance:</span>
            <span className="font-bold text-green-600">$100</span>
          </div>
          <div className="mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            Premium Member
          </div>
        </div>

        <ul className="mt-6 space-y-1 px-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setSelectedTab(item.label)}
                className={`w-full flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                  selectedTab === item.label
                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
                {selectedTab === item.label && (
                  <span className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-gray-200 px-4 py-4">
        <ul className="space-y-1">
          {bottomItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setSelectedTab(item.label)}
                className={`w-full flex items-center rounded-lg px-4 py-3 text-sm font-medium ${
                  selectedTab === item.label
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <img
              alt="Account"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Account Settings
              </p>
              <p className="text-xs text-gray-500 truncate">
                Last login: Today
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;