import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import FormSection from '../components/ui/FormSection';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    bio: 'Event organizer with 5+ years of experience in creating memorable experiences.',
    company: 'EventPro Solutions',
    website: 'www.eventpro.com'
  });

  const [formData, setFormData] = useState(userData);

  useEffect(() => {
    // Load user data from localStorage or API
    const user = localStorage.getItem('user_data');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUserData(prev => ({
          ...prev,
          name: parsedUser.username || prev.name,
          email: parsedUser.email || prev.email
        }));
        setFormData(prev => ({
          ...prev,
          name: parsedUser.username || prev.name,
          email: parsedUser.email || prev.email
        }));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setUserData(formData);
    setIsEditing(false);
    // Here you would typically save to API
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  return (
    <div className="h-auto min-h-full w-full y p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-theme-textPrimary mb-2">Profile</h1>
          <p className="text-theme-textSecondary">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-theme-accentLight/5 rounded-lg shadow-sm border border-theme-borderPrimary p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUser className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-theme-textPrimary">{userData.name}</h2>
                <p className="text-theme-textSecondary">{userData.email}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-theme-textSecondary">
                  <FaPhone className="w-4 h-4 mr-3" />
                  <span className="text-sm">{userData.phone}</span>
                </div>
                <div className="flex items-center text-theme-textSecondary">
                  <FaMapMarkerAlt className="w-4 h-4 mr-3" />
                  <span className="text-sm">{userData.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <FormSection title="Personal Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  name="name"
                  value={isEditing ? formData.name : userData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={!isEditing}
                  useFormik={false}
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={isEditing ? formData.email : userData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  useFormik={false}
                />
                <Input
                  label="Phone"
                  name="phone"
                  value={isEditing ? formData.phone : userData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  useFormik={false}
                />
                <Input
                  label="Location"
                  name="location"
                  value={isEditing ? formData.location : userData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  disabled={!isEditing}
                  useFormik={false}
                />
              </div>
            </FormSection>

            {/* Company Information */}
            <FormSection title="Company Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Company"
                  name="company"
                  value={isEditing ? formData.company : userData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  disabled={!isEditing}
                  useFormik={false}
                />
                <Input
                  label="Website"
                  name="website"
                  value={isEditing ? formData.website : userData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  disabled={!isEditing}
                  useFormik={false}
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-theme-textPrimary mb-1">
                  Bio
                </label>
                <textarea
                  value={isEditing ? formData.bio : userData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-4 py-2 border border-theme-borderSecondary rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-theme-bgSecondary text-theme-textPrimary placeholder:text-theme-textMuted"
                />
              </div>
            </FormSection>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>
                  <FaEdit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button variant="secondary" onClick={handleCancel}>
                    <FaTimes className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <FaSave className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 