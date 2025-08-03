

import React, { useState } from 'react';
import Sidebar from './merchant/Sidebar';
import Header from './merchant/Header';
import Dashboard from './merchant/Dashboard';
import RecipeManagement from './merchant/RecipeManagement';
import OrderManagement from './merchant/OrderManagement';
import ProfileManagement from './merchant/ProfileManagement';
import Settings from './merchant/Settings';

function MerchantDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard';
      case 'recipes': return 'Recipe Management';
      case 'orders': return 'Order Management';
      case 'analytics': return 'Analytics';
      case 'profile': return 'Profile';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'recipes': return <RecipeManagement />;
      case 'orders': return <OrderManagement />;
      case 'analytics': 
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Analytics Coming Soon</h3>
            <p className="text-gray-600">Track your restaurant's performance and insights</p>
          </div>
        );
      case 'profile':
        return <ProfileManagement />;
      case 'settings':
        return <Settings />;
      default: return <Dashboard />;
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // You can implement search logic here based on the active tab
    console.log('Searching for:', query);
  };
  const handleProfileClick = () => {
    setActiveTab('profile');
  };
  const handleSettingsClick = () => {
    setActiveTab('settings');
  };
  const handleNotificationClick = () => {
    // You can implement notification logic here
    console.log('Notifications clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="ml-64">
      <Header 
          title={getPageTitle()} 
          onSearch={handleSearch}
          onProfileClick={handleProfileClick}
          onSettingsClick={handleSettingsClick}
          onNotificationClick={handleNotificationClick}
        />
        
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default MerchantDashboard;
