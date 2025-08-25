 const API_URL = "https://food-villa-backend-zf7db.sevalla.app/execute/command";   // <-- change once
// const API_URL = "http://localhost:8080/execute/command";

// Razorpay test configuration
export const RAZORPAY_CONFIG = {
  keyId: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_R6qeDZNJYPIlbQ',
  keySecret: process.env.REACT_APP_RAZORPAY_KEY_SECRET || 'y86Gr1FlQ5XmbcNEIZMmA5CP',
  environment: process.env.REACT_APP_ENVIRONMENT || 'development'
};

// Get auth token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Create headers with auth token
export const createAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `${token}` : '',
  };
};

export const httpPost = async (endpoint, body) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers:  createAuthHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// Create Razorpay order (mock for development)
export const createMockRazorpayOrder = (amount, currency = 'INR') => {
  return {
    id: `order_${Date.now()}`,
    amount: amount,
    currency: currency,
    status: 'created',
    receipt: `receipt_${Date.now()}`,
    created_at: Math.floor(Date.now() / 1000)
  };
};

// Test payment success simulation
export const simulatePaymentSuccess = (orderId, amount) => {
  return {
    razorpay_payment_id: `pay_${Date.now()}`,
    razorpay_order_id: orderId,
    razorpay_signature: `signature_${Date.now()}`,
    amount: amount
  };
};
