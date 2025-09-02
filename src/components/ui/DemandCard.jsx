import React from 'react';
import { FaBuilding, FaEye, FaCheckCircle, FaTimesCircle, FaHandshake } from 'react-icons/fa';

const DemandCard = ({ 
  demand, 
  onQuoteNow,
  className = "",
  showQuoteButton = true,
  buttonText = "Quote Now",
  buttonVariant = "primary",
  onClick,
  onViewOffers,
  onAcceptOffer,
  onRejectOffer
}) => {
  const handleQuoteClick = (e) => {
    e.stopPropagation();
    try{
      if (onQuoteNow) {
        onQuoteNow(demand);
      }
    }catch(error){
      console.log(error);
    }
  };

  const handleViewOffers = (e) => {
    e.stopPropagation();
    if (onViewOffers) {
      onViewOffers(demand);
    }
  };

  const handleAcceptOffer = (e, offerId) => {
    e.stopPropagation();
    if (onAcceptOffer) {
      onAcceptOffer(demand.id, offerId);
    }
  };

  const handleRejectOffer = (e, offerId) => {
    e.stopPropagation();
    if (onRejectOffer) {
      onRejectOffer(demand.id, offerId);
    }
  };

  const getButtonStyles = () => {
    switch (buttonVariant) {
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

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'completed':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'cancelled':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      default:
        return 'text-theme-textSecondary bg-theme-bgSecondary border-theme-borderSecondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return <FaHandshake className="w-3 h-3" />;
      case 'completed':
        return <FaCheckCircle className="w-3 h-3" />;
      case 'cancelled':
        return <FaTimesCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const pendingOffers = demand.offers?.filter(offer => offer.status === 'pending').length || 0;
  const acceptedOffers = demand.offers?.filter(offer => offer.status === 'accepted').length || 0;

  return (
    <div
      className={`bg-theme-cardBg rounded-xl p-6 border border-theme-borderSecondary/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg ${className}`}
      onClick={onClick}
    >
      {/* Company Header */}
      <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between mb-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <FaBuilding className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-theme-textPrimary text-[1.2rem]">
              {demand.companyName}
            </h3>
            <span className="text-[1rem] text-theme-textSecondary">
              {demand.sector}
            </span>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(demand.status)}`}>
          {getStatusIcon(demand.status)}
          {demand.status?.charAt(0).toUpperCase() + demand.status?.slice(1)}
        </span>
      </div>

      {/* Key Information */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-[1rem] text-theme-textSecondary">Quantity</span>
          <span className="text-[1.1rem] font-medium text-theme-textPrimary">
            {demand.quantity?.toLocaleString() || 'N/A'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[1rem] text-theme-textSecondary">Expected Price</span>
          <span className="text-[1.1rem] font-medium text-primary">
            ₹{demand.expectedPrice?.toLocaleString() || 'N/A'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[1rem] text-theme-textSecondary">TAT</span>
          <span className="text-[1.1rem] font-medium text-theme-textPrimary">
            {demand.expectedTat || 'N/A'}
          </span>
        </div>
      </div>

      {/* Offers Summary */}
      {demand.offers && demand.offers.length > 0 && (
        <div className="mb-4 p-3 bg-theme-bgSecondary rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-theme-textPrimary">Offers Received</span>
            <span className="text-sm text-theme-textSecondary">{demand.offers.length}</span>
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

      {/* Action Buttons */}
      <div className="space-y-2">
        {showQuoteButton && (
          <button
            onClick={handleQuoteClick}
            className={`w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${getButtonStyles()}`}
          >
            {buttonText}
          </button>
        )}
        
        {demand.offers && demand.offers.length > 0 && (
          <button
            onClick={handleViewOffers}
            className="w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors bg-theme-bgSecondary hover:bg-theme-bgTertiary text-theme-textPrimary border border-theme-borderSecondary hover:border-primary/30 flex items-center justify-center gap-2"
          >
            <FaEye className="w-4 h-4" />
            View All Offers ({demand.offers.length})
          </button>
        )}
      </div>
    </div>
  );
};

export default DemandCard;
