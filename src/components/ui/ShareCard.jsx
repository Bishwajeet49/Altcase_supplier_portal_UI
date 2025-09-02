import React from 'react';
import { FaBuilding } from 'react-icons/fa';

const ShareCard = ({ 
  share, 
  onBuyNow,
  className = "",
  showBuyButton = true,
  buyButtonText = "Buy Now",
  buttonVariant = "primary"
}) => {
  const handleBuyClick = () => {
    if (onBuyNow) {
      onBuyNow(share.id);
    }
  };



  const getButtonStyles = (variant = buttonVariant) => {
    switch (variant) {
      case 'primary':
        return 'bg-primary hover:bg-primary/90 text-white';
      case 'secondary':
        return 'bg-theme-bgSecondary hover:bg-theme-bgSecondary/80 text-theme-textPrimary border border-theme-borderSecondary';
      case 'outline':
        return 'bg-transparent hover:bg-primary/10 text-primary border border-primary';
      default:
        return 'bg-primary hover:bg-primary/90 text-white';
    }
  };

  return (
    <div
      className={`bg-theme-cardBg rounded-xl p-6 border border-theme-borderSecondary/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg ${className}`}
    >
      {/* Company Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <FaBuilding className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-theme-textPrimary text-[1.2rem]">
              {share.companyName}
              <br />
              {/* sector */}    
              <span className="text-[1rem] text-theme-textSecondary">
                {share.sector}
              </span>
            </h3>
          </div>
        </div>
      </div>

      {/* Key Information */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-[1rem] text-theme-textSecondary">Available</span>
          <span className="text-[1.1rem] font-medium text-theme-textPrimary">
            {share.availableQuantity?.toLocaleString() || 'N/A'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[1rem] text-theme-textSecondary">Price</span>
          <div className="text-right">
            <span className="text-[1.1rem] font-medium text-primary">
              ₹{share.pricePerShare?.toLocaleString() || 'N/A'}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[1rem] text-theme-textSecondary">Min Order</span>
          <span className="text-[1.1rem] font-medium text-theme-textPrimary">
            {share.minQuantity?.toLocaleString() || 'N/A'}
          </span>
        </div>
      </div>


    

      {/* Action Button */}
      {showBuyButton && (
        <button
          onClick={handleBuyClick}
          className={`w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${getButtonStyles()}`}
        >
          {buyButtonText}
        </button>
      )}
    </div>
  );
};

export default ShareCard;
