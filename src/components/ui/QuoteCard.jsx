import React from 'react';
import { FaBuilding, FaRupeeSign, FaClock, FaCalendarAlt, FaEye } from 'react-icons/fa';

const QuoteCard = ({ 
  quote, 
  onViewDetails,
  getStatusColor,
  getStatusIcon,
  className = ""
}) => {
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(quote);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusDisplay = () => {
    const status = quote.status?.toLowerCase();
    const colorClass = getStatusColor ? getStatusColor(quote.status) : 'text-theme-textSecondary bg-theme-bgSecondary border-theme-borderSecondary';
    const icon = getStatusIcon ? getStatusIcon(quote.status) : null;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
        {icon}
        {quote.status?.charAt(0).toUpperCase() + quote.status?.slice(1) || 'Unknown'}
      </span>
    );
  };

  return (
    <div
      className={`bg-theme-cardBg rounded-xl p-6 border border-theme-borderSecondary/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg ${className}`}
    >
      {/* Header with Company and Status */}
      <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between mb-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <FaBuilding className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-theme-textPrimary text-[1.2rem]">
              {quote.demand?.companyName || quote.companyName}
            </h3>
            <p className="text-[0.9rem] text-theme-textSecondary">
              {quote.demand?.sector || quote.sector}
            </p>
          </div>
        </div>
        {getStatusDisplay()}
      </div>

      {/* Quote Details */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-[1rem] text-theme-textSecondary">Your Quote</span>
          <span className="text-[1.1rem] font-medium text-primary">
            {formatCurrency(quote.price)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-[1rem] text-theme-textSecondary">Demand Price</span>
          <span className="text-[1.1rem] font-medium text-theme-textPrimary">
            {formatCurrency(quote.demand?.expectedPrice || quote.expectedPrice)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-[1rem] text-theme-textSecondary">TAT Offered</span>
          <span className="text-[1.1rem] font-medium text-theme-textPrimary">
            {quote.tat || 'N/A'}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-[1rem] text-theme-textSecondary">Submitted</span>
          <span className="text-[1rem] font-medium text-theme-textPrimary">
            {formatDate(quote.submittedAt)}
          </span>
        </div>
      </div>

      {/* Additional Info */}
      {quote.remarks && (
        <div className="mb-4">
          <p className="text-sm text-theme-textSecondary">
            <strong>Remarks:</strong> {quote.remarks}
          </p>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleViewDetails}
        className="w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors bg-theme-bgSecondary hover:bg-theme-bgTertiary text-theme-textPrimary border border-theme-borderSecondary hover:border-primary/30 flex items-center justify-center gap-2"
      >
        <FaEye className="w-4 h-4" />
        View Details
      </button>
    </div>
  );
};

export default QuoteCard;
