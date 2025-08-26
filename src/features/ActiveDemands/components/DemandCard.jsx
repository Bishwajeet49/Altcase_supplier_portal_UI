import React from 'react';
import { FaBuilding, FaClock, FaRupeeSign, FaExclamationTriangle } from 'react-icons/fa';

const DemandCard = ({ demand, onSubmitQuote }) => {
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'urgent':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'high':
        return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'medium':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'low':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      default:
        return 'text-theme-textSecondary bg-theme-bgSecondary border-theme-borderSecondary';
    }
  };

  const getPriorityIcon = (priority) => {
    if (priority?.toLowerCase() === 'urgent') {
      return <FaExclamationTriangle className="w-3 h-3" />;
    }
    return null;
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
    const expiryDate = new Date(demand.expiresAt);
    const now = new Date();
    const diffInDays = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
    return diffInDays <= 2;
  };

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
            {demand.companyName}
          </h3>
        </div>
        
        {/* Share Type and Sector */}
        <p className="text-sm text-theme-textSecondary ml-10 mb-3">
          {demand.shareType} • {demand.sector}
        </p>

        {/* Badges Row */}
        <div className="flex items-center gap-2 ml-10">
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(demand.priority)}`}>
            {getPriorityIcon(demand.priority)}
            {demand.priority}
          </span>
          {isExpiringSoon() && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-red-400 bg-red-400/10 border border-red-400/20">
              Expiring Soon
            </span>
          )}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-theme-bgSecondary/50 rounded-xl p-3 border border-theme-borderSecondary/50 h-20 flex flex-col justify-center">
          <div className="text-xs text-theme-textSecondary mb-1 font-medium">Quantity</div>
          <div className="text-sm sm:text-base font-bold text-theme-textPrimary">
            {demand.quantity.toLocaleString()}
          </div>
          <div className="text-xs text-theme-textMuted">shares</div>
        </div>
        
        <div className="bg-theme-bgSecondary/50 rounded-xl p-3 border border-theme-borderSecondary/50 h-20 flex flex-col justify-center">
          <div className="text-xs text-theme-textSecondary mb-1 font-medium">Expected Price</div>
          <div className="text-sm sm:text-base font-bold text-primary">
            ₹{demand.expectedPrice.toLocaleString()}
          </div>
        </div>
        
        <div className="bg-theme-bgSecondary/50 rounded-xl p-3 border border-theme-borderSecondary/50 h-20 flex flex-col justify-center">
          <div className="flex items-center gap-1 text-xs text-theme-textSecondary mb-1 font-medium">
            <FaRupeeSign className="w-3 h-3" />
            Max Price
          </div>
          <div className="text-sm sm:text-base font-bold text-accent-green">
            ₹{demand.maxPrice.toLocaleString()}
          </div>
        </div>
        
        <div className="bg-theme-bgSecondary/50 rounded-xl p-3 border border-theme-borderSecondary/50 h-20 flex flex-col justify-center">
          <div className="text-xs text-theme-textSecondary mb-1 font-medium">Expected TAT</div>
          <div className="text-sm sm:text-base font-bold text-theme-textPrimary">
            {demand.expectedTat}
          </div>
        </div>
      </div>

      {/* Content Area - Flexible */}
      <div className="flex-1 flex flex-col">
        {/* Description */}
        <div className="mb-4">
          <p className="text-sm text-theme-textSecondary leading-relaxed line-clamp-2">
            {demand.description}
          </p>
        </div>


      </div>

      {/* Footer - Always at bottom */}
      <div className="pt-4 border-t border-theme-borderSecondary/50 mt-auto">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-theme-textMuted mb-3">
          <span>Posted: {formatDate(demand.postedAt)}</span>
          <span>Expires: {formatDate(demand.expiresAt)}</span>
        </div>
        
        <button
          onClick={() => onSubmitQuote(demand)}
          className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 hover:shadow-lg"
        >
          Submit Quote
        </button>
      </div>
    </div>
  );
};

export default DemandCard;
