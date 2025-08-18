import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOrderHistory, trackOrder, cancelOrder } from '../services/orderService';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Truck, 
  ChefHat,
  MapPin,
  Phone,
  Star
} from 'lucide-react';

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (user) {
      fetchOrderHistory();
    }
  }, [user]);

  const fetchOrderHistory = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const userId = user.id || user.email;
      const orderHistory = await getOrderHistory(userId);
      setOrders(orderHistory);
    } catch (err) {
      console.error('Error fetching order history:', err);
      setError('Failed to load order history. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await cancelOrder(orderId, 'Customer requested cancellation');
        await fetchOrderHistory(); // Refresh orders
      } catch (err) {
        console.error('Error cancelling order:', err);
        alert('Failed to cancel order. Please try again.');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'confirmed': return 'text-blue-600 bg-blue-100';
      case 'preparing': return 'text-purple-600 bg-purple-100';
      case 'ready': return 'text-green-600 bg-green-100';
      case 'out_for_delivery': return 'text-orange-600 bg-orange-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return <Clock className="w-5 h-5" />;
      case 'confirmed': return <CheckCircle className="w-5 h-5" />;
      case 'preparing': return <ChefHat className="w-5 h-5" />;
      case 'ready': return <Package className="w-5 h-5" />;
      case 'out_for_delivery': return <Truck className="w-5 h-5" />;
      case 'delivered': return <CheckCircle className="w-5 h-5" />;
      case 'cancelled': return <XCircle className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const canCancelOrder = (status) => {
    return ['pending', 'confirmed'].includes(status.toLowerCase());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Orders</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchOrderHistory}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Orders</h1>
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-8">When you place your first order, it will appear here.</p>
            <a
              href="/restaurants"
              className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-8 py-3 rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all duration-200 inline-block"
            >
              Start Ordering
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Orders</h1>
        
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {/* Order Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Order #{order.id}</h3>
                  <p className="text-gray-600 text-sm">
                    Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="ml-2">{order.status.replace('_', ' ').toUpperCase()}</span>
                  </div>
                  <p className="text-lg font-bold text-gray-800 mt-1">₹{order.totalAmount}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-800 mb-2">Items ({order.items.length})</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {order.items.slice(0, 4).map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="text-gray-800 font-medium">₹{item.totalPrice}</span>
                    </div>
                  ))}
                  {order.items.length > 4 && (
                    <div className="text-sm text-gray-500">
                      +{order.items.length - 4} more items
                    </div>
                  )}
                </div>
              </div>

              {/* Delivery Address */}
              {order.deliveryAddress && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Delivery Address
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {order.deliveryAddress.fullAddress || `${order.deliveryAddress.addressLine1}, ${order.deliveryAddress.city} ${order.deliveryAddress.pincode}`}
                  </p>
                </div>
              )}

              {/* Order Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="text-pink-500 hover:text-pink-600 font-medium text-sm"
                >
                  View Details
                </button>
                
                {canCancelOrder(order.status) && (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="text-red-500 hover:text-red-600 font-medium text-sm"
                  >
                    Cancel Order
                  </button>
                )}
                
                {order.status.toLowerCase() === 'delivered' && (
                  <button className="text-green-500 hover:text-green-600 font-medium text-sm">
                    Rate Order
                  </button>
                )}
                
                <button className="text-blue-500 hover:text-blue-600 font-medium text-sm">
                  Reorder
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">Order Details</h3>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <XCircle className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Order Info */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Order Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Order ID:</span>
                      <span className="ml-2 font-medium">#{selectedOrder.id}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Order Date:</span>
                      <span className="ml-2 font-medium">
                        {new Date(selectedOrder.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="ml-2 font-bold">₹{selectedOrder.totalAmount}</span>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Items</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-gray-600 text-sm">₹{item.price} x {item.quantity}</p>
                        </div>
                        <span className="font-bold text-gray-800">₹{item.totalPrice}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Address */}
                {selectedOrder.deliveryAddress && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Delivery Address</h4>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium text-gray-800">{selectedOrder.deliveryAddress.fullName}</p>
                      <p className="text-gray-600 text-sm flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        {selectedOrder.deliveryAddress.phone}
                      </p>
                      <p className="text-gray-600 text-sm flex items-start">
                        <MapPin className="w-4 h-4 mr-1 mt-0.5" />
                        {selectedOrder.deliveryAddress.fullAddress}
                      </p>
                    </div>
                  </div>
                )}

                {/* Payment Info */}
                {selectedOrder.paymentInfo && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Payment Information</h4>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm">
                        <span className="text-gray-600">Method:</span>
                        <span className="ml-2 font-medium">
                          {selectedOrder.paymentInfo.method === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                        </span>
                      </p>
                      {selectedOrder.paymentInfo.transactionId && (
                        <p className="text-sm">
                          <span className="text-gray-600">Transaction ID:</span>
                          <span className="ml-2 font-medium">{selectedOrder.paymentInfo.transactionId}</span>
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
