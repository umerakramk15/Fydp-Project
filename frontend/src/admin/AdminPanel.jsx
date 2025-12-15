// components/AdminPanel.js
import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';
import Products from './Products';
import Analytics from './Analytics';
import Customers from './Customers';
import Orders from './Orders';
import AIIntegrations from './AiIntegration';
import Categories from './Category';
import OurStaff from './OurStaff';
import Coupons from './Coupon';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products />;
      case 'categories':
        return <Categories />;
      case 'coupons':
          return <Coupons />;
      case 'analytics':
        return <Analytics />;
      case 'customers':
        return <Customers />;
      case 'orders':
        return <Orders />;
      case 'our staff':
        return <OurStaff />;
      case 'ai':
        return <AIIntegrations />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;