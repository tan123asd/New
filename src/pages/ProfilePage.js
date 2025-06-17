import React, { useState, useEffect } from 'react';
import { FaEdit, FaSave, FaTimes, FaCamera } from 'react-icons/fa';
import { useProfile } from '../hooks';
import './ProfilePage.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    emergencyContact: '',
    sobrietyDate: '',
    bio: ''
  });
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);
  
  // Use custom hooks for better state management
  const { 
    profile: hookProfile, 
    loading, 
    error: profileError, 
    fetchProfile: hookFetchProfile, 
    updateProfile: hookUpdateProfile 
  } = useProfile();  useEffect(() => {
    fetchProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // We only want to run this once on mount

  // Enhanced profile fetching with better error handling
  const fetchProfile = async () => {
    try {
      setError(null);
      await hookFetchProfile();
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      setError(error.message || 'Failed to load profile data');
    }
  };

  // Transform hook profile data to local state
  useEffect(() => {
    if (hookProfile) {
      setProfile({
        name: hookProfile.fullname || hookProfile.name || '',
        email: hookProfile.email || '',
        phone: hookProfile.phone || '',
        dateOfBirth: hookProfile.dateOfBirth || hookProfile.birthDate || '',        emergencyContact: hookProfile.emergencyContact || '',
        sobrietyDate: hookProfile.sobrietyDate || '',
        bio: hookProfile.bio || hookProfile.description || ''
      });
    } else if (profileError) {
      // No fallback mock data - handle error appropriately
      console.error('Failed to load profile data:', profileError);
    }
  }, [hookProfile, profileError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  // Enhanced save profile with better error handling
  const handleSave = async () => {
    try {
      setError(null);
      
      // Transform local state back to API format
      const profileData = {
        fullname: profile.name,
        email: profile.email,
        phone: profile.phone,
        dateOfBirth: profile.dateOfBirth,
        emergencyContact: profile.emergencyContact,
        sobrietyDate: profile.sobrietyDate,
        bio: profile.bio
      };
      
      await hookUpdateProfile(profileData);
      setEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      setError(error.message || 'Failed to update profile');
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setError(null);
    fetchProfile(); // Reset to original data
  };

  // Retry function for error recovery
  const retryFunction = () => {
    setError(null);
    fetchProfile();
  };

  const calculateDaysSober = () => {
    if (!profile.sobrietyDate) return 0;
    const startDate = new Date(profile.sobrietyDate);
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  if (loading && !hookProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show error state with retry option
  if (error && !hookProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="error-message bg-white p-8 rounded-lg shadow-lg max-w-md">
            <div className="text-red-600 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Profile</h2>
            <p className="text-gray-600 mb-4">Error: {error}</p>
            <button 
              onClick={retryFunction}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </div>
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-300">
                <FaCamera />
              </button>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-800">{profile.name}</h1>
                <button
                  onClick={() => setEditing(!editing)}
                  className="mt-2 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                >
                  <FaEdit className="mr-2" />
                  {editing ? 'Cancel Edit' : 'Edit Profile'}
                </button>
              </div>
              
              <p className="text-gray-600 mb-4">{profile.email}</p>
              
              {profile.sobrietyDate && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Recovery Journey</h3>
                  <p className="text-green-700">
                    <strong>{calculateDaysSober()}</strong> days sober since {new Date(profile.sobrietyDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>        {/* Profile Details */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h2>
          
          {/* Error display for update operations */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                  <div className="mt-3">
                    <button
                      onClick={() => setError(null)}
                      className="bg-red-100 text-red-800 px-3 py-1 rounded-md text-sm hover:bg-red-200 transition duration-200"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              {editing ? (
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-800 py-2">{profile.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              {editing ? (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-800 py-2">{profile.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              {editing ? (
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-800 py-2">{profile.phone || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
              {editing ? (
                <input
                  type="date"
                  name="dateOfBirth"
                  value={profile.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-800 py-2">
                  {profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : 'Not provided'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
              {editing ? (
                <input
                  type="text"
                  name="emergencyContact"
                  value={profile.emergencyContact}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-800 py-2">{profile.emergencyContact || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sobriety Start Date</label>
              {editing ? (
                <input
                  type="date"
                  name="sobrietyDate"
                  value={profile.sobrietyDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-800 py-2">
                  {profile.sobrietyDate ? new Date(profile.sobrietyDate).toLocaleDateString() : 'Not provided'}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            {editing ? (
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tell us about yourself and your recovery journey..."
              />
            ) : (
              <p className="text-gray-800 py-2">{profile.bio || 'No bio provided'}</p>
            )}
          </div>

          {editing && (
            <div className="flex space-x-4 mt-8">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300 flex items-center"
              >
                <FaSave className="mr-2" />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-300 flex items-center"
              >
                <FaTimes className="mr-2" />
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
          <div className="space-y-4">
            <button className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              Change Password
            </button>
            <button className="w-full md:w-auto bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-300 md:ml-4">
              Privacy Settings
            </button>
            <button className="w-full md:w-auto bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300 md:ml-4">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
