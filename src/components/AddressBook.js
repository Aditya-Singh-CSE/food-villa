import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { MapPin, Plus, Edit2, Trash2, Home, Briefcase, MapPinIcon } from 'lucide-react';

const AddressBook = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  
  const [addressForm, setAddressForm] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    addressType: 'home'
  });

  useEffect(() => {
    // Load saved addresses from localStorage or API
    const savedAddresses = localStorage.getItem(`addresses_${user?.email}`);
    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    }
  }, [user]);

  const saveAddressesToStorage = (addressList) => {
    localStorage.setItem(`addresses_${user?.email}`, JSON.stringify(addressList));
  };

  const resetForm = () => {
    setAddressForm({
      fullName: user?.name || '',
      phone: user?.phone || '',
      addressLine1: '',
      addressLine2: '',
      landmark: '',
      city: '',
      state: '',
      pincode: '',
      addressType: 'home'
    });
    setEditingAddress(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingAddress) {
      // Update existing address
      const updatedAddresses = addresses.map(addr => 
        addr.id === editingAddress.id ? { ...addressForm, id: editingAddress.id } : addr
      );
      setAddresses(updatedAddresses);
      saveAddressesToStorage(updatedAddresses);
    } else {
      // Add new address
      const newAddress = {
        ...addressForm,
        id: Date.now().toString(),
        isDefault: addresses.length === 0 // First address becomes default
      };
      const updatedAddresses = [...addresses, newAddress];
      setAddresses(updatedAddresses);
      saveAddressesToStorage(updatedAddresses);
    }
    
    setShowForm(false);
    resetForm();
  };

  const handleEdit = (address) => {
    setAddressForm(address);
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleDelete = (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      const updatedAddresses = addresses.filter(addr => addr.id !== addressId);
      setAddresses(updatedAddresses);
      saveAddressesToStorage(updatedAddresses);
    }
  };

  const handleSetDefault = (addressId) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    }));
    setAddresses(updatedAddresses);
    saveAddressesToStorage(updatedAddresses);
  };

  const getAddressTypeIcon = (type) => {
    switch (type) {
      case 'home': return <Home className="w-5 h-5" />;
      case 'work': return <Briefcase className="w-5 h-5" />;
      default: return <MapPinIcon className="w-5 h-5" />;
    }
  };

  const getAddressTypeColor = (type) => {
    switch (type) {
      case 'home': return 'text-green-600 bg-green-100';
      case 'work': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Delivery Addresses</h1>
            <p className="text-gray-600">Manage your saved delivery addresses</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all duration-200 flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Address
          </button>
        </div>

        {/* Address List */}
        {addresses.length === 0 && !showForm ? (
          <div className="text-center py-16">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No addresses saved</h2>
            <p className="text-gray-600 mb-8">Add your delivery addresses to make ordering faster</p>
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-8 py-3 rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all duration-200"
            >
              Add Your First Address
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {addresses.map((address) => (
              <div key={address.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${getAddressTypeColor(address.addressType)} mr-3`}>
                      {getAddressTypeIcon(address.addressType)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 capitalize">
                        {address.addressType}
                        {address.isDefault && (
                          <span className="ml-2 px-2 py-1 bg-pink-100 text-pink-600 text-xs rounded-full">
                            Default
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-600 text-sm">{address.fullName}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(address)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-gray-800 font-medium">{address.addressLine1}</p>
                  {address.addressLine2 && (
                    <p className="text-gray-600 text-sm">{address.addressLine2}</p>
                  )}
                  {address.landmark && (
                    <p className="text-gray-600 text-sm">Near {address.landmark}</p>
                  )}
                  <p className="text-gray-600 text-sm">
                    {address.city}, {address.state} {address.pincode}
                  </p>
                  <p className="text-gray-600 text-sm">{address.phone}</p>
                </div>

                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="text-pink-500 hover:text-pink-600 font-medium text-sm"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Address Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">
                  {editingAddress ? 'Edit Address' : 'Add New Address'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={addressForm.fullName}
                      onChange={(e) => setAddressForm({...addressForm, fullName: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={addressForm.phone}
                      onChange={(e) => setAddressForm({...addressForm, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="House/Flat/Block No."
                    value={addressForm.addressLine1}
                    onChange={(e) => setAddressForm({...addressForm, addressLine1: e.target.value})}
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
                    value={addressForm.addressLine2}
                    onChange={(e) => setAddressForm({...addressForm, addressLine2: e.target.value})}
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
                    value={addressForm.landmark}
                    onChange={(e) => setAddressForm({...addressForm, landmark: e.target.value})}
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
                      value={addressForm.city}
                      onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      value={addressForm.state}
                      onChange={(e) => setAddressForm({...addressForm, state: e.target.value})}
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
                      value={addressForm.pincode}
                      onChange={(e) => setAddressForm({...addressForm, pincode: e.target.value})}
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
                        onClick={() => setAddressForm({...addressForm, addressType: type})}
                        className={`px-4 py-2 rounded-lg border ${
                          addressForm.addressType === type
                            ? 'border-pink-500 bg-pink-50 text-pink-700'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all duration-200"
                  >
                    {editingAddress ? 'Update Address' : 'Save Address'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressBook;
