import { apiPostRequest } from './api';
// import { httpPost} from '../../services/util';

// Place a new order
export const placeOrder = async (orderData) => {
  const payload = {
    items: orderData.items,
    customerInfo: orderData.customerInfo,
    deliveryAddress: orderData.deliveryAddress,
    paymentInfo: orderData.paymentInfo,
    totalAmount: orderData.totalAmount,
    orderNotes: orderData.orderNotes || '',
    action: 'place_order'
  };

  try {
    const response = await apiPostRequest('/orders/place', payload);
    return response.data;
  } catch (error) {
    console.error('Failed to place order:', error);
    throw error;
  }
};

// Get order history for user
export const getOrderHistory = async (userId) => {
  const payload = {
    userId,
    action: 'get_order_history'
  };

  try {
    const response = await apiPostRequest('/orders/history', payload);
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch order history:', error);
    throw error;
  }
};

// Get order details by ID
export const getOrderById = async (orderId) => {
  const payload = {
    orderId,
    action: 'get_order_details'
  };

  try {
    const response = await apiPostRequest('/orders/details', payload);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch order details:', error);
    throw error;
  }
};

// Track order status
export const trackOrder = async (orderId) => {
  const payload = {
    orderId,
    action: 'track_order'
  };

  try {
    const response = await apiPostRequest('/orders/track', payload);
    return response.data;
  } catch (error) {
    console.error('Failed to track order:', error);
    throw error;
  }
};

// Cancel order
export const cancelOrder = async (orderId, reason) => {
  const payload = {
    orderId,
    reason,
    action: 'cancel_order'
  };

  try {
    const response = await apiPostRequest('/orders/cancel', payload);
    return response.data;
  } catch (error) {
    console.error('Failed to cancel order:', error);
    throw error;
  }
};

// Rate and review order
export const rateOrder = async (orderId, rating, review) => {
  const payload = {
    orderId,
    rating,
    review,
    action: 'rate_order'
  };

  try {
    const response = await apiPostRequest('/orders/rate', payload);
    return response.data;
  } catch (error) {
    console.error('Failed to rate order:', error);
    throw error;
  }
};
