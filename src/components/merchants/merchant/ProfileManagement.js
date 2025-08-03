import React, { useState } from 'react';
import { User, Camera, MapPin, Phone, Mail, Clock, Star, Edit2, Save, X } from 'lucide-react';

const ProfileManagement = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John's Kitchen",
    description: "Authentic Italian cuisine with a modern twist. We serve fresh, locally sourced ingredients prepared with traditional recipes passed down through generations.",
    cuisine: ['Italian', 'Mediterranean', 'Vegetarian'],
    address: '123 Main Street, Downtown, City 12345',
    phone: '+1 (555) 123-4567',
    email: 'contact@johnskitchen.com',
    website: 'www.johnskitchen.com',
    openingHours: {
      monday: { open: '11:00', close: '22:00', isOpen: true },
      tuesday: { open: '11:00', close: '22:00', isOpen: true },
      wednesday: { open: '11:00', close: '22:00', isOpen: true },
      thursday: { open: '11:00', close: '22:00', isOpen: true },
      friday: { open: '11:00', close: '23:00', isOpen: true },
      saturday: { open: '10:00', close: '23:00', isOpen: true },
      sunday: { open: '10:00', close: '21:00', isOpen: true }
    },
    socialMedia: {
      facebook: 'facebook.com/johnskitchen',
      instagram: '@johnskitchen',
      twitter: '@johnskitchen'
    },
    images: {
      logo: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200',
      cover: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
      gallery: [
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=300'
      ]
    },
    rating: 4.8,
    totalReviews: 1247
  });
  const [editedProfile, setEditedProfile] = useState(profile);
  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };
  const updateOpeningHours = (day, field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day],
          [field]: value
        }
      }
    }));
  };
  const cuisineOptions = ['Italian', 'Chinese', 'Indian', 'Mexican', 'Thai', 'Japanese', 'Mediterranean', 'American', 'French', 'Vegetarian', 'Vegan'];
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Restaurant Profile</h2>
          <p className="text-gray-600">Manage your restaurant information and settings</p>
        </div>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all duration-200 flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all duration-200 flex items-center"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </div>
      {/* Cover Image */}
      <div className="relative h-64 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl overflow-hidden">
        <img
          src={profile.images.cover}
          alt="Restaurant cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-6 left-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-white rounded-full p-2">
              <img
                src={profile.images.logo}
                alt="Restaurant logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{profile.name}</h1>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                  <span className="font-semibold">{profile.rating}</span>
                  <span className="text-gray-200 ml-1">({profile.totalReviews} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.cuisine.map(type => (
                    <span key={type} className="px-2 py-1 bg-white/20 rounded-full text-sm">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {isEditing && (
          <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors">
            <Camera className="w-5 h-5" />
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-600">{profile.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                {isEditing ? (
                  <textarea
                    rows={4}
                    value={editedProfile.description}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-600">{profile.description}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine Types</label>
                {isEditing ? (
                  <div className="flex flex-wrap gap-2">
                    {cuisineOptions.map(cuisine => (
                      <button
                        key={cuisine}
                        type="button"
                        onClick={() => {
                          const isSelected = editedProfile.cuisine.includes(cuisine);
                          if (isSelected) {
                            setEditedProfile(prev => ({
                              ...prev,
                              cuisine: prev.cuisine.filter(c => c !== cuisine)
                            }));
                          } else {
                            setEditedProfile(prev => ({
                              ...prev,
                              cuisine: [...prev.cuisine, cuisine]
                            }));
                          }
                        }}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          editedProfile.cuisine.includes(cuisine)
                            ? 'bg-pink-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {cuisine}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.cuisine.map(type => (
                      <span key={type} className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">
                        {type}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    rows={3}
                    value={editedProfile.address}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-600">{profile.address}</p>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedProfile.phone}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-600">{profile.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-600">{profile.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={editedProfile.website}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, website: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-600">{profile.website}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Opening Hours */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Opening Hours
            </h3>
            <div className="space-y-3">
              {Object.entries(profile.openingHours).map(([day, hours]) => (
                <div key={day} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {isEditing && (
                      <input
                        type="checkbox"
                        checked={editedProfile.openingHours[day].isOpen}
                        onChange={(e) => updateOpeningHours(day, 'isOpen', e.target.checked)}
                        className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
                      />
                    )}
                    <span className="capitalize font-medium text-gray-700 w-20">
                      {day}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {hours.isOpen ? (
                      <>
                        {isEditing ? (
                          <>
                            <input
                              type="time"
                              value={editedProfile.openingHours[day].open}
                              onChange={(e) => updateOpeningHours(day, 'open', e.target.value)}
                              className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            />
                            <span className="text-gray-500">-</span>
                            <input
                              type="time"
                              value={editedProfile.openingHours[day].close}
                              onChange={(e) => updateOpeningHours(day, 'close', e.target.value)}
                              className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            />
                          </>
                        ) : (
                          <span className="text-gray-600 text-sm">
                            {hours.open} - {hours.close}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-red-500 text-sm">Closed</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Social Media */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Social Media</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.socialMedia.facebook}
                    onChange={(e) => setEditedProfile(prev => ({
                      ...prev,
                      socialMedia: { ...prev.socialMedia, facebook: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                  />
                ) : (
                  <p className="text-gray-600 text-sm">{profile.socialMedia.facebook}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.socialMedia.instagram}
                    onChange={(e) => setEditedProfile(prev => ({
                      ...prev,
                      socialMedia: { ...prev.socialMedia, instagram: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                  />
                ) : (
                  <p className="text-gray-600 text-sm">{profile.socialMedia.instagram}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.socialMedia.twitter}
                    onChange={(e) => setEditedProfile(prev => ({
                      ...prev,
                      socialMedia: { ...prev.socialMedia, twitter: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                  />
                ) : (
                  <p className="text-gray-600 text-sm">{profile.socialMedia.twitter}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileManagement;