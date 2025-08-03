import React from 'react';
import { Bell, Search, User, Settings, LogOut, ChevronDown } from 'lucide-react';

const Header = ({
  title,
  onSearch,
  onProfileClick,
  onSettingsClick,
  onNotificationClick
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showProfileDropdown, setShowProfileDropdown] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [notifications] = React.useState([
    { id: 1, title: 'New Order #1234', message: 'Alice Johnson placed a new order', time: '2 min ago', unread: true },
    { id: 2, title: 'Order Ready #1230', message: 'Order is ready for pickup', time: '5 min ago', unread: true },
    { id: 3, title: 'New Review', message: 'You received a 5-star review', time: '10 min ago', unread: false },
    { id: 4, title: 'Payment Received', message: 'Payment of $45.50 received', time: '1 hour ago', unread: false }
  ]);
  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };
  const unreadCount = notifications.filter(n => n.unread).length;
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-500 text-sm">Manage your restaurant efficiently</p>
        </div>
        <div className="flex items-center space-x-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </form>
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (onNotificationClick) onNotificationClick();
              }}
              className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
            <Bell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                        notification.unread ? 'bg-pink-50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={`text-sm font-medium ${
                            notification.unread ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <button className="w-full text-center text-pink-500 hover:text-pink-600 text-sm font-medium">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-800">John's Kitchen</p>
              <p className="text-xs text-gray-500">Premium Plan</p>
            </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            {/* Profile Dropdown */}
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">John's Kitchen</p>
                      <p className="text-sm text-gray-500">john@johnskitchen.com</p>
                      <span className="inline-block px-2 py-1 bg-pink-100 text-pink-600 text-xs rounded-full mt-1">
                        Premium Plan
                      </span>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      if (onProfileClick) onProfileClick();
                    }}
                    className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <User className="w-5 h-5 mr-3 text-gray-500" />
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      if (onSettingsClick) onSettingsClick();
                    }}
                    className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Settings className="w-5 h-5 mr-3 text-gray-500" />
                    Settings
                  </button>
                  <hr className="my-2" />
                  <button className="w-full flex items-center px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="w-5 h-5 mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Click outside to close dropdowns */}
      {(showProfileDropdown || showNotifications) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowProfileDropdown(false);
            setShowNotifications(false);
          }}
        ></div>
      )}
    </header>
  );
};
export default Header;