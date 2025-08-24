import { apiPostRequest } from './api';
// import { httpPost} from '../../services/util';
import { httpPost } from './util.js';



// Load Razorpay script dynamically
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Create Razorpay order
export const createRazorpayOrder = async (orderData) => {
  const payload = {
    amount: orderData.amount, // Amount in paise (multiply by 100)
    currency: orderData.currency || 'INR',
    customerInfo: orderData.customerInfo,
    items: orderData.items,
    deliveryAddress: orderData.deliveryAddress,
    action: 'create_payment_order'
  };

  try {
    console.log("Order data:", orderData);
    
    const response = await httpPost('', {
        command: "create_payment_order",
        data: {
          restaurantId: orderData.restaurantId || "",
          items: orderData.items,
          paymentMethod: "razorpay",
          deliveryAddress: orderData.deliveryAddress
        },
      });
    return response.data;
  } catch (error) {
    console.error('Failed to create Razorpay order:', error);
    throw error;
  }
};

// Verify Razorpay payment
export const verifyRazorpayPayment = async (paymentData) => {
  const payload = {
    razorpay_order_id: paymentData.razorpay_order_id,
    razorpay_payment_id: paymentData.razorpay_payment_id,
    razorpay_signature: paymentData.razorpay_signature,
    action: 'verify_payment'
  };

  try {
    const response = await apiPostRequest('/payment/verify', payload);
    return response;
  } catch (error) {
    console.error('Failed to verify Razorpay payment:', error);
    throw error;
  }
};

// Initialize Razorpay payment
export const initiateRazorpayPayment = async (orderData, callbacks) => {
  const { onSuccess, onFailure } = callbacks;

  try {
    // Load Razorpay script
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      throw new Error('Failed to load Razorpay SDK');
    }

    // Create order - now passing restaurantId
    const order = await createRazorpayOrder({
      amount: Math.round(orderData.totalAmount * 100), // Convert to paise
      currency: 'INR',
      customerInfo: orderData.customerInfo,
      items: orderData.items,
      deliveryAddress: orderData.deliveryAddress,
      restaurantId: orderData.restaurantId
    });

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Your Razorpay key
      amount: order.amount,
      currency: order.currency,
      name: 'Food Villa',
      description: 'Food Delivery Payment',
      image: '/Logo.png', // Your logo
      order_id: order.id,
      customer: {
        name: orderData.customerInfo.name,
        email: orderData.customerInfo.email,
        contact: orderData.customerInfo.phone
      },
      prefill: {
        name: orderData.customerInfo.name,
        email: orderData.customerInfo.email,
        contact: orderData.customerInfo.phone
      },
      notes: {
        address: orderData.deliveryAddress.fullAddress,
        order_type: 'food_delivery'
      },
      theme: {
        color: '#EC4899' // Pink color matching your app theme
      },
      handler: async (response) => {
        try {
          // Verify payment
          const verificationResult = await verifyRazorpayPayment(response);
          if (verificationResult.success) {
            onSuccess({
              ...response,
              orderId: order.id,
              totalAmount: orderData.totalAmount
            });
          } else {
            onFailure(new Error('Payment verification failed'));
          }
        } catch (error) {
          onFailure(error);
        }
      },
      modal: {
        ondismiss: () => {
          onFailure(new Error('Payment cancelled by user'));
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

  } catch (error) {
    onFailure(error);
  }
};
