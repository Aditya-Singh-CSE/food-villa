import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  ShoppingBag,
  Settings,
  TrendingUp,
  User,
  ChefHat,
  Bell
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'recipes', label: 'Recipes', icon: BookOpen },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];
  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
            <ChefHat className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">FoodHub</h2>
            <p className="text-sm text-gray-500">Merchant Panel</p>
          </div>
        </div>
      </div>
      {/* Navigation */}
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-pink-50 to-orange-50 border-r-4 border-pink-500 text-pink-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <Icon className={`w-5 h-5 mr-3 ${activeTab === item.id ? 'text-pink-500' : ''}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      {/* Bottom Section */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg p-4 text-white">
          <Bell className="w-6 h-6 mb-2" />
          <h3 className="font-semibold text-sm">Need Help?</h3>
          <p className="text-xs opacity-90">Contact our support team</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;