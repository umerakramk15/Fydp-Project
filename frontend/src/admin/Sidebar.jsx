// components/Sidebar.js
import { 
  LayoutDashboard, 
  Package, 
  Users,
  User,
  IdCard, 
  ShoppingCart, 
  BarChart3, 
  Brain,
  Settings,
  X
} from 'lucide-react';
import { Link } from 'react-router';

const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: Package },
    { id: 'coupons', label: 'Coupons', icon: IdCard },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'our staff', label: 'Our Staff', icon: User },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'ai', label: 'AI Insights', icon: Brain },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-blue-900 to-purple-900 transform transition duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-4 bg-blue-800">
          <div className="flex items-center">
          <Link to='/'> <img src="logo.png" className='w-36' alt="" /></Link>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200
                  ${activeTab === item.id 
                    ? 'bg-white bg-opacity-20 text-white shadow-lg' 
                    : 'text-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
                  }
                `}
              >
                <Icon className="h-5 w-5" />
                <span className="ml-3 font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-blue-700">
          <button className="
            w-full flex items-center px-4 py-3 text-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-white rounded-lg transition-all duration-200
          ">
            <Settings className="h-5 w-5" />
            <span className="ml-3 font-medium">Settings</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;