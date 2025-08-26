import React from 'react';
import { FaBuilding, FaClock, FaRupeeSign, FaEye, FaEnvelope, FaHandshake, FaPlay, FaPause, FaTrash, FaEdit } from 'react-icons/fa';

const AvailabilityCard = ({ availability, onUpdateStatus, onDelete, onEdit, onViewOffers }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'sold':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'expired':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'paused':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      default:
        return 'text-theme-textSecondary bg-theme-bgSecondary border-theme-borderSecondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return <FaPlay className="w-3 h-3" />;
      case 'sold':
        return <FaHandshake className="w-3 h-3" />;
      case 'paused':
        return <FaPause className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const isExpiringSoon = () => {
    const expiryDate = new Date(availability.validity);
    const now = new Date();
    const diffInDays = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
    return diffInDays <= 3 && diffInDays > 0;
  };

  const isExpired = () => {
    const expiryDate = new Date(availability.validity);
    const now = new Date();
    return now > expiryDate;
  };

  const pendingOffers = availability.offers?.filter(offer => offer.status === 'pending').length || 0;
  const acceptedOffers = availability.offers?.filter(offer => offer.status === 'accepted').length || 0;

  return (
    <div className="bg-theme-accentLight/5 rounded-2xl p-4 sm:p-6 border border-theme-borderPrimary hover:border-primary/30 transition-all duration-300 hover:shadow-lg flex flex-col h-full">
      {/* Header */}
      <div className="mb-4">
        {/* Company Name Row */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <FaBuilding className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-theme-textPrimary">
            {availability.companyName}
          </h3>
        </div>
        
 

        {/* Status and Expiry Badges */}
        <div className="flex items-center gap-2 ml-10 flex-wrap">
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(availability.status)}`}>
            {getStatusIcon(availability.status)}
            {availability.status.charAt(0).toUpperCase() + availability.status.slice(1)}
          </span>
          {isExpiringSoon() && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-orange-400 bg-orange-400/10 border border-orange-400/20">
              <FaClock className="w-3 h-3 mr-1" />
              Expiring Soon
            </span>
          )}
          {isExpired() && availability.status !== 'expired' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-red-400 bg-red-400/10 border border-red-400/20">
              Expired
            </span>
          )}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-theme-bgSecondary/50 rounded-xl p-3 border border-theme-borderSecondary/50 h-20 flex flex-col justify-center">
          <div className="text-xs text-theme-textSecondary mb-1 font-medium">Available Qty</div>
          <div className="text-sm sm:text-base font-bold text-theme-textPrimary">
            {availability.quantity.toLocaleString()}
          </div>
          <div className="text-xs text-theme-textMuted">shares</div>
        </div>
        
        <div className="bg-theme-bgSecondary/50 rounded-xl p-3 border border-theme-borderSecondary/50 h-20 flex flex-col justify-center">
          <div className="text-xs text-theme-textSecondary mb-1 font-medium">Price per Share</div>
          <div className="text-sm sm:text-base font-bold text-primary">
            ₹{availability.pricePerShare.toLocaleString()}
          </div>
        </div>
        
        <div className="bg-theme-bgSecondary/50 rounded-xl p-3 border border-theme-borderSecondary/50 h-20 flex flex-col justify-center">
          <div className="text-xs text-theme-textSecondary mb-1 font-medium">Min Quantity</div>
          <div className="text-sm sm:text-base font-bold text-theme-textPrimary">
            {availability.minQuantity.toLocaleString()}
          </div>
          <div className="text-xs text-theme-textMuted">shares</div>
        </div>
        
        <div className="bg-theme-bgSecondary/50 rounded-xl p-3 border border-theme-borderSecondary/50 h-20 flex flex-col justify-center">
          <div className="text-xs text-theme-textSecondary mb-1 font-medium">Valid Until</div>
          <div className="text-sm sm:text-base font-bold text-theme-textPrimary">
            {formatDate(availability.validity)}
          </div>
        </div>
      </div>

   

      {/* Content Area - Flexible */}
      <div className="flex-1 flex flex-col">
        {/* Description */}
        <div className="mb-4">
          <p className="text-sm text-theme-textSecondary leading-relaxed line-clamp-2">
            {availability.description}
          </p>
        </div>

        {/* Offers Summary */}
        {availability.offers && availability.offers.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-theme-textMuted mb-2">
              <span>Recent Activity</span>
              <button
                onClick={() => onViewOffers(availability)}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                View All
              </button>
            </div>
            <div className="flex gap-2 text-xs">
              {pendingOffers > 0 && (
                <span className="px-2 py-1 bg-yellow-400/10 text-yellow-400 rounded-full">
                  {pendingOffers} Pending
                </span>
              )}
              {acceptedOffers > 0 && (
                <span className="px-2 py-1 bg-green-400/10 text-green-400 rounded-full">
                  {acceptedOffers} Accepted
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer - Always at bottom */}
      <div className="pt-4 border-t border-theme-borderSecondary/50 mt-auto">
        <div className="flex items-center justify-between text-xs text-theme-textMuted mb-3">
          <span>Posted: {formatDate(availability.postedAt)}</span>

        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
         
        
          <button
            onClick={() => onEdit(availability)}
            className="flex-1 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-medium rounded-lg transition-colors border border-primary/20"
          >
            <FaEdit className="w-3 h-3 inline mr-1" />
            Edit
          </button>
          <button
            onClick={() => onDelete(availability.id)}
            className="flex-1 px-3 py-2 bg-red-400/10 hover:bg-red-400/20 text-red-400 text-xs font-medium rounded-lg transition-colors border border-red-400/20"
          >
            <FaTrash className="w-3 h-3 inline mr-1" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCard;
