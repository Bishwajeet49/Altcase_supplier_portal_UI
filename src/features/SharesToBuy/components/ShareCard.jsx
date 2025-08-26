import React from 'react';
import { FaBuilding, FaClock, FaRupeeSign, FaEye, FaUsers, FaStar, FaShoppingCart, FaHeart, FaTag, FaShieldAlt } from 'react-icons/fa';

const ShareCard = ({ share, onPurchase, onExpressInterest }) => {
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
    const expiryDate = new Date(share.validity);
    const now = new Date();
    const diffInDays = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
    return diffInDays <= 7 && diffInDays > 0;
  };

  const getAvailabilityPercentage = () => {
    return Math.round((share.availableQuantity / share.originalQuantity) * 100);
  };

  const getAvailabilityColor = () => {
    const percentage = getAvailabilityPercentage();
    if (percentage > 70) return 'text-green-400 bg-green-400/10';
    if (percentage > 30) return 'text-yellow-400 bg-yellow-400/10';
    return 'text-red-400 bg-red-400/10';
  };

  const calculateTotalValue = (quantity) => {
    return quantity * share.pricePerShare;
  };

  return (
    <div className="bg-theme-accentLight/5 rounded-2xl p-4 sm:p-6 border border-theme-borderPrimary hover:border-primary/30 transition-all duration-300 hover:shadow-lg flex flex-col h-full group">
      {/* Header */}
      <div className="mb-4">
        {/* Company Name and Rating Row */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <FaBuilding className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-theme-textPrimary">
                {share.companyName}
              </h3>

            </div>
          </div>
       
        </div>

      

   
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-theme-bgSecondary/50 rounded-xl p-3 border border-theme-borderSecondary/50 h-20 flex flex-col justify-center">
          <div className="text-xs text-theme-textSecondary mb-1 font-medium">Available Qty</div>
          <div className="text-sm sm:text-base font-bold text-theme-textPrimary">
            {share.availableQuantity.toLocaleString()}
          </div>
          <div className="text-xs text-theme-textMuted">of {share.originalQuantity.toLocaleString()}</div>
        </div>
        
        <div className="bg-theme-bgSecondary/50 rounded-xl p-3 border border-theme-borderSecondary/50 h-20 flex flex-col justify-center">
          <div className="text-xs text-theme-textSecondary mb-1 font-medium">Price per Share</div>
          <div className="text-sm sm:text-base font-bold text-primary">
            ₹{share.pricePerShare.toLocaleString()}
          </div>
          {share.originalPrice && (
            <div className="text-xs text-theme-textMuted line-through">
              ₹{share.originalPrice.toLocaleString()}
            </div>
          )}
        </div>
        
        <div className="bg-theme-bgSecondary/50 rounded-xl p-3 border border-theme-borderSecondary/50 h-20 flex flex-col justify-center">
          <div className="text-xs text-theme-textSecondary mb-1 font-medium">Min Order</div>
          <div className="text-sm sm:text-base font-bold text-theme-textPrimary">
            {share.minQuantity.toLocaleString()}
          </div>
          <div className="text-xs text-theme-textMuted">shares</div>
        </div>
        
        <div className="bg-theme-bgSecondary/50 rounded-xl p-3 border border-theme-borderSecondary/50 h-20 flex flex-col justify-center">
          <div className="text-xs text-theme-textSecondary mb-1 font-medium">Max Order</div>
          <div className="text-sm sm:text-base font-bold text-theme-textPrimary">
            {share.maxQuantity.toLocaleString()}
          </div>
          <div className="text-xs text-theme-textMuted">shares</div>
        </div>
      </div>

      {/* Value Calculation */}
      {/* <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
        <div className="text-xs text-theme-textSecondary mb-1">Minimum Investment</div>
        <div className="text-lg font-bold text-primary">
          {formatCurrency(calculateTotalValue(share.minQuantity))}
        </div>
        <div className="text-xs text-theme-textMuted">
          {share.minQuantity.toLocaleString()} shares × ₹{share.pricePerShare.toLocaleString()}
        </div>
      </div> */}

      {/* Performance Stats */}
      {/* <div className="mb-4">
        <div className="grid grid-cols-2 gap-4 p-3 bg-theme-bgSecondary/30 rounded-lg border border-theme-borderSecondary/30">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-theme-textSecondary mb-1">
              <FaEye className="w-3 h-3" />
              <span className="text-xs">Views</span>
            </div>
            <div className="text-sm font-bold text-theme-textPrimary">{share.viewCount}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-theme-textSecondary mb-1">
              <FaUsers className="w-3 h-3" />
              <span className="text-xs">Interested</span>
            </div>
            <div className="text-sm font-bold text-theme-textPrimary">{share.interestedBuyers}</div>
          </div>
        </div>
      </div> */}

      {/* Content Area - Flexible */}
      <div className="flex-1 flex flex-col">
        {/* Description */}
        <div className="mb-4">
          <p className="text-sm text-theme-textSecondary leading-relaxed line-clamp-2">
            {share.description}
          </p>
        </div>

        {/* Recent Activity */}
        {/* {share.recentPurchases && share.recentPurchases.length > 0 && (
          <div className="mb-4">
            <div className="text-xs text-theme-textMuted mb-2">Recent Activity</div>
            <div className="bg-green-400/5 rounded-lg p-2 border border-green-400/20">
              <div className="text-xs text-green-400">
                {share.recentPurchases[0].quantity} shares purchased by {share.recentPurchases[0].buyerType}
              </div>
              <div className="text-xs text-theme-textMuted">
                {formatDate(share.recentPurchases[0].purchasedAt)}
              </div>
            </div>
          </div>
        )} */}
      </div>

      {/* Footer - Always at bottom */}
      <div className="pt-4 border-t border-theme-borderSecondary/50 mt-auto">
        <div className="flex items-center justify-between text-xs text-theme-textMuted mb-3">
          <span>Listed: {formatDate(share.listedAt)}</span>
          <span>Expires: {formatDate(share.validity)}</span>
        </div>
    
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
    
          <button
            onClick={() => onPurchase(share)}
            className="flex-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white text-xs font-medium rounded-lg transition-colors"
          >
            <FaShoppingCart className="w-3 h-3 inline mr-1" />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareCard;
