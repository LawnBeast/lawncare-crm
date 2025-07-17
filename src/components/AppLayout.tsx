import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';
import ClientList from './ClientList';
import SnowPlowingDashboard from './SnowPlowingDashboard';

const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'clients':
        return <ClientList />;
      case 'snow-plowing':
        return <SnowPlowingDashboard />;
      case 'jobs':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Management</h2>
            <p className="text-gray-600">Job management features coming soon...</p>
          </div>
        );
      case 'calendar':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Calendar</h2>
            <p className="text-gray-600">Calendar features coming soon...</p>
          </div>
        );
      case 'billing':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Billing & Invoices</h2>
            <p className="text-gray-600">Billing features coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-600">Settings panel coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={toggleSidebar}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      {/* Main Content */}
      <div className="lg:ml-64">
        <Header 
          onMenuClick={toggleSidebar}
          activeTab={activeTab}
        />
        
        <main className="p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;