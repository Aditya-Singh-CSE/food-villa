import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { addItem, removeItem, deleteItem, clearCart } from "../utils/cartSlice";
import { Plus, Minus, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { items: cartItems, totalAmount, totalItems } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handleDeleteItem = (itemId) => {
    dispatch(deleteItem(itemId));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear the cart?')) {
      dispatch(clearCart());
    }
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  const deliveryFee = totalAmount > 0 ? (totalAmount >= 300 ? 0 : 40) : 0;
  const taxes = Math.round(totalAmount * 0.05); // 5% tax
  const finalAmount = totalAmount + deliveryFee + taxes;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some delicious food items to get started!</p>
            <button 
              onClick={() => navigate('/restaurants')}
              className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-8 py-3 rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all duration-200"
            >
              Browse Restaurants
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Cart ({totalItems} items)</h1>
          <button 
            onClick={handleClearCart}
            className="text-red-500 hover:text-red-600 font-medium flex items-center"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-4">
                  {/* Item Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image || item.imageUrl || '/placeholder-food.jpg'} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Item Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg font-bold text-gray-800">₹{item.price}</span>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        
                        <span className="font-semibold text-gray-800 min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => handleAddItem(item)}
                          className="w-8 h-8 rounded-full bg-pink-500 hover:bg-pink-600 flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Item Total */}
                    <div className="flex items-center justify-between mt-2">
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-500 hover:text-red-600 text-sm font-medium"
                      >
                        Remove
                      </button>
                      <span className="font-bold text-gray-800">₹{item.totalPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                  <span className="font-semibold">₹{totalAmount}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-semibold">
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes & Fees</span>
                  <span className="font-semibold">₹{taxes}</span>
                </div>
                
                <hr className="border-gray-200" />
                
                <div className="flex justify-between text-lg">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-bold text-gray-800">₹{finalAmount}</span>
                </div>
              </div>
              
              {totalAmount < 300 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p className="text-yellow-800 text-sm">
                    Add ₹{300 - totalAmount} more to get free delivery!
                  </p>
                </div>
              )}
              
              <button 
                onClick={handleProceedToCheckout}
                className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-3 rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all duration-200 flex items-center justify-center font-semibold"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              
              <p className="text-gray-500 text-sm text-center mt-3">
                Review your order and proceed to payment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
