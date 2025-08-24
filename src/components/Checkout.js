import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { clearCart } from '../utils/cartSlice';
import { initiateRazorpayPayment } from '../services/paymentService';
import { placeOrder } from '../services/orderService';
import { 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  CreditCard, 
  Wallet, 
  ArrowLeft,
  Clock,
  CheckCircle 
} from 'lucide-react';

const Checkout = () => {
  const { items: cartItems, totalAmount, totalItems, restaurantId } = useSelector((store) => store.cart);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Order Confirmation
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Form states
  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    addressType: 'home' // home, work, other
  });

  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  useEffect(() => {
    if (cartItems.length === 0 && !orderPlaced) {
      navigate('/cart');
    }
  }, [cartItems, navigate, orderPlaced]);

  // Calculate totals
  const deliveryFee = totalAmount >= 300 ? 0 : 40;
  const taxes = Math.round(totalAmount * 0.05);
  const finalAmount = totalAmount + deliveryFee + taxes;

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (isAddressValid()) {
      setStep(2);
    }
  };

  const isAddressValid = () => {
    return deliveryAddress.fullName && 
           deliveryAddress.phone && 
           deliveryAddress.addressLine1 && 
           deliveryAddress.city && 
           deliveryAddress.pincode;
  };

  const handlePaymentSuccess = async (paymentResponse) => {
    try {
      const orderData = {
        items: cartItems,
        customerInfo: {
          name: deliveryAddress.fullName,
          email: deliveryAddress.email,
          phone: deliveryAddress.phone
        },
        deliveryAddress: {
          ...deliveryAddress,
          fullAddress: `${deliveryAddress.addressLine1}, ${deliveryAddress.addressLine2 ? deliveryAddress.addressLine2 + ', ' : ''}${deliveryAddress.city}, ${deliveryAddress.state} ${deliveryAddress.pincode}`
        },
        paymentInfo: {
          method: 'razorpay',
          transactionId: paymentResponse.razorpay_payment_id,
          orderId: paymentResponse.razorpay_order_id,
          amount: finalAmount
        },
        totalAmount: finalAmount,
        orderNotes
      };

      const placedOrder = await placeOrder(orderData);
      setOrderId(placedOrder.orderId);
      setOrderPlaced(true);
      setStep(3);
      dispatch(clearCart());
    } catch (error) {
      console.error('Order placement failed:', error);
      alert('Order placement failed. Please try again.');
    }
  };

  const handlePaymentFailure = (error) => {
    console.error('Payment failed:', error);
    alert('Payment failed. Please try again.');
    setLoading(false);
  };

  const handleRazorpayPayment = async () => {
    setLoading(true);
    
    const orderData = {
      totalAmount: finalAmount,
      customerInfo: {
        name: deliveryAddress.fullName,
        email: deliveryAddress.email,
        phone: deliveryAddress.phone
      },
      items: cartItems,
      deliveryAddress,
      restaurantId: restaurantId
    };

    try {
      await initiateRazorpayPayment(orderData, {
        onSuccess: handlePaymentSuccess,
        onFailure: handlePaymentFailure
      });
    } catch (error) {
      handlePaymentFailure(error);
    }
  };

  const handleCashOnDelivery = async () => {
    setLoading(true);
    try {
      const orderData = {
        items: cartItems,
        customerInfo: {
          name: deliveryAddress.fullName,
          email: deliveryAddress.email,
          phone: deliveryAddress.phone
        },
        deliveryAddress: {
          ...deliveryAddress,
          fullAddress: `${deliveryAddress.addressLine1}, ${deliveryAddress.addressLine2 ? deliveryAddress.addressLine2 + ', ' : ''}${deliveryAddress.city}, ${deliveryAddress.state} ${deliveryAddress.pincode}`
        },
        paymentInfo: {
          method: 'cod',
          amount: finalAmount
        },
        totalAmount: finalAmount,
        orderNotes
      };

      const placedOrder = await placeOrder(orderData);
      setOrderId(placedOrder.orderId);
      setOrderPlaced(true);
      setStep(3);
      dispatch(clearCart());
    } catch (error) {
      console.error('Order placement failed:', error);
      alert('Order placement failed. Please try again.');
    }
    setLoading(false);
  };

  if (step === 3 && orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-6">Your order #{orderId} has been confirmed</p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-medium text-green-800">Estimated Delivery: 30-45 minutes</span>
              </div>
              <p className="text-green-700 text-sm">
                You will receive order updates on your phone and email
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/orders')}
                className="bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Track Order
              </button>
              <button
                onClick={() => navigate('/restaurants')}
                className="bg-gradient-to-r from-pink-500 to-orange-500 text-white py-3 rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all duration-200 font-medium"
              >
                Order Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => step === 1 ? navigate('/cart') : setStep(step - 1)}
            className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-pink-500' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Address</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className={`flex items-center ${step >= 2 ? 'text-pink-500' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Delivery Address</h2>
                
                <form onSubmit={handleAddressSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <User className="w-4 h-4 inline mr-1" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryAddress.fullName}
                        onChange={(e) => setDeliveryAddress({...deliveryAddress, fullName: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Phone className="w-4 h-4 inline mr-1" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={deliveryAddress.phone}
                        onChange={(e) => setDeliveryAddress({...deliveryAddress, phone: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={deliveryAddress.email}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="House/Flat/Block No."
                      value={deliveryAddress.addressLine1}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, addressLine1: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      placeholder="Area, Street, Sector, Village"
                      value={deliveryAddress.addressLine2}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, addressLine2: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Landmark
                    </label>
                    <input
                      type="text"
                      placeholder="E.g. near Apollo hospital"
                      value={deliveryAddress.landmark}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, landmark: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryAddress.city}
                        onChange={(e) => setDeliveryAddress({...deliveryAddress, city: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        value={deliveryAddress.state}
                        onChange={(e) => setDeliveryAddress({...deliveryAddress, state: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryAddress.pincode}
                        onChange={(e) => setDeliveryAddress({...deliveryAddress, pincode: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Address Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address Type
                    </label>
                    <div className="flex space-x-4">
                      {['home', 'work', 'other'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setDeliveryAddress({...deliveryAddress, addressType: type})}
                          className={`px-4 py-2 rounded-lg border ${
                            deliveryAddress.addressType === type
                              ? 'border-pink-500 bg-pink-50 text-pink-700'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!isAddressValid()}
                    className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-3 rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Payment Options</h2>
                
                <div className="space-y-4 mb-6">
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer ${
                      paymentMethod === 'razorpay' ? 'border-pink-500 bg-pink-50' : 'border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod('razorpay')}
                  >
                    <div className="flex items-center">
                      <CreditCard className="w-6 h-6 text-pink-500 mr-3" />
                      <div>
                        <h3 className="font-semibold text-gray-800">Pay Online</h3>
                        <p className="text-gray-600 text-sm">Credit Card, Debit Card, Net Banking, UPI</p>
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`border rounded-lg p-4 cursor-pointer ${
                      paymentMethod === 'cod' ? 'border-pink-500 bg-pink-50' : 'border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod('cod')}
                  >
                    <div className="flex items-center">
                      <Wallet className="w-6 h-6 text-pink-500 mr-3" />
                      <div>
                        <h3 className="font-semibold text-gray-800">Cash on Delivery</h3>
                        <p className="text-gray-600 text-sm">Pay when your order arrives</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Notes */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Any special instructions for your order..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={paymentMethod === 'razorpay' ? handleRazorpayPayment : handleCashOnDelivery}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-3 rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 
                   paymentMethod === 'razorpay' ? `Pay ₹${finalAmount}` : 'Place Order'}
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>
              
              {/* Items */}
              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
                      <p className="text-gray-600 text-xs">₹{item.price} x {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-gray-800 text-sm">₹{item.totalPrice}</span>
                  </div>
                ))}
              </div>
              
              <hr className="border-gray-200 my-4" />
              
              {/* Totals */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                  <span className="font-semibold">₹{totalAmount}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-semibold">
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes & Fees</span>
                  <span className="font-semibold">₹{taxes}</span>
                </div>
              </div>
              
              <hr className="border-gray-200 my-4" />
              
              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-800">Total</span>
                <span className="text-gray-800">₹{finalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
