import React from 'react';
import { TrendingUp, ShoppingBag, IndianRupee, Users, Star, Clock } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Orders',
      value: '248',
      change: '+12%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'from-pink-500 to-pink-600'
    },
    {
      title: 'Revenue',
      value: '₹3,249',
      change: '+8%',
      trend: 'up',
      icon: IndianRupee,
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Customers',
      value: '1,429',
      change: '+18%',
      trend: 'up',
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Rating',
      value: '4.8',
      change: '+0.2',
      trend: 'up',
      icon: Star,
      color: 'from-green-500 to-green-600'
    }
  ];

  const recentOrders = [
    { id: '#1234', customer: 'Alice Johnson', items: 'Chicken Biryani, Naan', amount: '₹24.50', status: 'pending', time: '2 min ago' },
    { id: '#1235', customer: 'Bob Smith', items: 'Margherita Pizza', amount: '₹18.00', status: 'preparing', time: '5 min ago' },
    { id: '#1236', customer: 'Carol Davis', items: 'Sushi Combo', amount: '₹32.00', status: 'ready', time: '8 min ago' },
    { id: '#1237', customer: 'David Wilson', items: 'Pad Thai, Spring Rolls', amount: '₹26.75', status: 'delivered', time: '15 min ago' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-500 text-sm font-medium">{stat.change}</span>
                  </div>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
            <button className="text-pink-500 hover:text-pink-600 font-medium text-sm">View All</button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{order.id}</p>
                    <p className="text-gray-600 text-sm">{order.customer}</p>
                    <p className="text-gray-500 text-sm">{order.items}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{order.amount}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <div className="flex items-center text-gray-500 text-xs mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    {order.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}