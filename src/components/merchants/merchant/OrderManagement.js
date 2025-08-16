import React, { useState } from 'react';
import { Check, X, Clock, Eye, MapPin, Phone, User } from 'lucide-react';

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: '#1234',
      customer: {
        name: 'Alice Johnson',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, Downtown'
      },
      items: [
        { name: 'Chicken Biryani', quantity: 2, price: 24.50 },
        { name: 'Naan Bread', quantity: 3, price: 4.00 }
      ],
      total: 61.00,
      status: 'pending',
      orderTime: '2 min ago',
      notes: 'Extra spicy please'
    },
    {
      id: '#1235',
      customer: {
        name: 'Bob Smith',
        phone: '+1 (555) 987-6543',
        address: '456 Oak Avenue, Uptown'
      },
      items: [
        { name: 'Margherita Pizza', quantity: 1, price: 18.00 }
      ],
      total: 18.00,
      status: 'accepted',
      orderTime: '5 min ago',
      deliveryTime: '25 min'
    },
    {
      id: '#1236',
      customer: {
        name: 'Carol Davis',
        phone: '+1 (555) 456-7890',
        address: '789 Pine Street, Midtown'
      },
      items: [
        { name: 'Sushi Combo', quantity: 1, price: 32.00 },
        { name: 'Miso Soup', quantity: 2, price: 6.00 }
      ],
      total: 44.00,
      status: 'preparing',
      orderTime: '8 min ago',
      deliveryTime: '20 min'
    }
  ]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const handleAcceptOrder = (orderId) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, status: 'accepted', deliveryTime: '30 min' }
        : order
    ));
  };
  const handleRejectOrder = (orderId) => {
    if (window.confirm('Are you sure you want to reject this order?')) {
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: 'rejected' } : order
      ));
    }
  };
  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'accepted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'preparing': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'ready': return 'bg-green-100 text-green-800 border-green-200';
      case 'delivered': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  const getStatusActions = (order) => {
    switch (order.status) {
      case 'pending':
        return (
          <div className="flex space-x-2">
            <button
              onClick={() => handleAcceptOrder(order.id)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
            >
              <Check className="w-4 h-4 mr-1" />
              Accept
            </button>
            <button
              onClick={() => handleRejectOrder(order.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center"
            >
              <X className="w-4 h-4 mr-1" />
              Reject
            </button>
          </div>
        );
      case 'accepted':
        return (
          <button
            onClick={() => handleUpdateStatus(order.id, 'preparing')}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Start Preparing
          </button>
        );
      case 'preparing':
        return (
          <button
            onClick={() => handleUpdateStatus(order.id, 'ready')}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Mark Ready
          </button>
        );
      case 'ready':
        return (
          <button
            onClick={() => handleUpdateStatus(order.id, 'delivered')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Mark Delivered
          </button>
        );
      default:
        return null;
    }
  };
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const activeOrders = orders.filter(order => ['accepted', 'preparing', 'ready'].includes(order.status)).length;
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
          <p className="text-gray-600">Manage incoming orders and track their progress</p>
        </div>
        <div className="flex space-x-4">
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg border border-yellow-200">
            <span className="font-semibold">{pendingOrders}</span> Pending
          </div>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg border border-blue-200">
            <span className="font-semibold">{activeOrders}</span> Active
          </div>
        </div>
      </div>
      {/* Orders List */}
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">{order.id.slice(-2)}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{order.id}</h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {order.orderTime}
                    {order.deliveryTime && (
                      <>
                        <span className="mx-2">•</span>
                        <span>ETA: {order.deliveryTime}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Customer Info */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Customer
                </h4>
                <p className="text-gray-600">{order.customer.name}</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <Phone className="w-4 h-4 mr-1" />
                  {order.customer.phone}
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {order.customer.address}
                </div>
              </div>
              {/* Order Items */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800">Items</h4>
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="text-gray-800 font-medium">
                      ₹{(item.quantity * item.price).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{order.total.toFixed(2)}</span>
                  </div>
                </div>
                {order.notes && (
                  <div className="mt-2 p-2 bg-yellow-50 rounded text-sm text-yellow-800">
                    <strong>Note:</strong> {order.notes}
                  </div>
                )}
              </div>
              {/* Actions */}
              <div className="flex flex-col justify-center">
                {getStatusActions(order)}
              </div>
            </div>
          </div>
        ))}
      </div>
      {orders.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No orders yet</h3>
          <p className="text-gray-600">Orders will appear here when customers place them</p>
        </div>
      )}
      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">Order Details</h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800">Order ID</h4>
                  <p className="text-gray-600">{selectedOrder.id}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Customer</h4>
                  <p className="text-gray-600">{selectedOrder.customer.name}</p>
                  <p className="text-gray-500 text-sm">{selectedOrder.customer.phone}</p>
                  <p className="text-gray-500 text-sm">{selectedOrder.customer.address}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Items</h4>
                  <div className="space-y-1">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.quantity}x {item.name}</span>
                        <span>₹{(item.quantity * item.price).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default OrderManagement;