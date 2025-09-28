import React, { useState } from 'react';

const UserProfile: React.FC = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'Uttam',
    lastName: 'gupta',
    email: 'uttamgupta628@gmial.com',
    address: 'Kingston, 5236, United State',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    console.log('Saving profile changes:', profileData);
    // Add save logic here
  };

  const handleCancel = () => {
    // Reset form or navigate back
    console.log('Cancelled changes');
  };

  const sidebarItems = [
    {
      title: 'Manage My Account',
      items: [
        { label: 'My Profile', key: 'profile', active: true },
        { label: 'Address Book', key: 'address' },
        { label: 'My Payment Options', key: 'payment' }
      ]
    },
    {
      title: 'My Orders',
      items: [
        { label: 'My Returns', key: 'returns' },
        { label: 'My Cancellations', key: 'cancellations' }
      ]
    },
    {
      title: 'My WishList',
      items: []
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              <span className="hover:text-orange-500 cursor-pointer">Home</span>
              <span className="mx-2">/</span>
              <span className="text-gray-900">My Account</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-600">Welcome! </span>
              <span className="text-orange-500 font-medium">{profileData.firstName}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {sidebarItems.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <h3 className="text-base font-semibold text-gray-900 mb-4">
                    {section.title}
                  </h3>
                  {section.items.length > 0 && (
                    <div className="space-y-2">
                      {section.items.map((item) => (
                        <button
                          key={item.key}
                          onClick={() => setActiveSection(item.key)}
                          className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                            item.key === 'profile' 
                              ? 'text-orange-500 bg-orange-50 font-medium' 
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white">
              <h2 className="text-xl font-semibold text-orange-500 mb-8">Edit Your Profile</h2>
              
              <div className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Email and Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Password Changes Section */}
                <div className="pt-6">
                  <h3 className="text-base font-medium text-gray-900 mb-4">Password Changes</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <input
                        type="password"
                        name="currentPassword"
                        placeholder="Current Password"
                        value={profileData.currentPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        value={profileData.newPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm New Password"
                        value={profileData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-8">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-8 py-3 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveChanges}
                    className="px-8 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors font-medium"
                  >
                    Save Changes
                  </button>
                </div>
                              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;