import { useState } from "react";
import SideBar from "../components/SideBar";
import PersonalInformation from "../components/PersonalInformation";
import AddressBook from "../components/AddressBook";
import OrderHistory from "../components/OrderHistory";
import PaymentMethods from "../components/PaymentMethods";

const MyProfile = () => {
  const [selectedTab, setSelectedTab] = useState("Personal Information");

  const renderContent = () => {
    switch (selectedTab) {
      case "Personal Information":
        return <PersonalInformation />;
      case "Address Book":
        return <AddressBook />;
      case "My Orders":
        return <OrderHistory />;
      case "Payment Methods":
        return <PaymentMethods />;
      case "My Wishlist":
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  My Wishlist
                </h1>
                <p className="text-gray-500 text-sm">
                  Your saved favorite items
                </p>
              </div>
              <button className="px-5 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors duration-200">
                Share Wishlist
              </button>
            </div>
            <div className="text-center py-16">
              <div className="text-gray-300 mb-4 text-6xl">❤️</div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-gray-500 mb-6">Start adding items you love!</p>
              <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium">
                Start Shopping
              </button>
            </div>
          </div>
        );
      case "Account Settings":
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Account Settings
                </h1>
                <p className="text-gray-500 text-sm">
                  Manage your account preferences
                </p>
              </div>
            </div>
            <div className="text-center py-16">
              <div className="text-gray-300 mb-4 text-6xl">⚙️</div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                Account Settings
              </h3>
              <p className="text-gray-500 mb-6">Settings page coming soon...</p>
            </div>
          </div>
        );
      case "My Wallet":
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  My Wallet
                </h1>
                <p className="text-gray-500 text-sm">
                  Manage your wallet balance and transactions
                </p>
              </div>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-200">
                Add Funds
              </button>
            </div>
            <div className="text-center py-16">
              <div className="text-gray-300 mb-4 text-6xl">💰</div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                Wallet Balance: $100.00
              </h3>
              <p className="text-gray-500 mb-6">
                Add funds or view transaction history
              </p>
            </div>
          </div>
        );
      case "My Rewards":
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  My Rewards
                </h1>
                <p className="text-gray-500 text-sm">
                  Track your reward points and benefits
                </p>
              </div>
            </div>
            <div className="text-center py-16">
              <div className="text-gray-300 mb-4 text-6xl">🏆</div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                You have 1,250 Reward Points
              </h3>
              <p className="text-gray-500 mb-6">
                Earn more points with every purchase
              </p>
            </div>
          </div>
        );
      default:
        return <PersonalInformation />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-600">
            Manage your personal information, addresses, orders, and payment
            methods
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-8">
              <SideBar
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {renderContent()}

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      Total Orders
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
                  </div>
                  <div className="text-2xl">📦</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      Wallet Balance
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      $100.00
                    </p>
                  </div>
                  <div className="text-2xl">💰</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      Reward Points
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      1,250
                    </p>
                  </div>
                  <div className="text-2xl">🏆</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
