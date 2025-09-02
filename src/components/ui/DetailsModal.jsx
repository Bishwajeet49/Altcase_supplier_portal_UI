import React from 'react';
import { FaTimes, FaBuilding, FaRupeeSign, FaClock, FaCalendarAlt, FaEye, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const DetailsModal = ({ 
  isOpen, 
  onClose, 
  data, 
  type = 'quote', // 'quote' or 'demand'
  getStatusColor,
  getStatusIcon
}) => {
  if (!isOpen || !data) return null;

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
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusDisplay = (status) => {
    const colorClass = getStatusColor ? getStatusColor(status) : 'text-theme-textSecondary bg-theme-bgSecondary border-theme-borderSecondary';
    const icon = getStatusIcon ? getStatusIcon(status) : null;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
        {icon}
        {status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown'}
      </span>
    );
  };

  const renderQuoteDetails = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <FaBuilding className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-theme-textPrimary">
              {data.demand?.companyName || data.companyName}
            </h3>
            <p className="text-theme-textSecondary">{data.demand?.sector || data.sector}</p>
          </div>
        </div>
        {getStatusDisplay(data.status)}
      </div>

      {/* Quote Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-theme-textPrimary">Quote Details</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-theme-textSecondary">Your Quote Price</span>
              <span className="font-semibold text-primary text-lg">
                {formatCurrency(data.price)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-theme-textSecondary">Demand Expected Price</span>
              <span className="font-semibold text-theme-textPrimary">
                {formatCurrency(data.demand?.expectedPrice || data.expectedPrice)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-theme-textSecondary">TAT Offered</span>
              <span className="font-semibold text-theme-textPrimary">{data.tat}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-theme-textSecondary">Submitted On</span>
              <span className="font-semibold text-theme-textPrimary">
                {formatDate(data.submittedAt)}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-theme-textPrimary">Demand Information</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-theme-textSecondary">Quantity Required</span>
              <span className="font-semibold text-theme-textPrimary">
                {data.demand?.quantity?.toLocaleString() || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-theme-textSecondary">Expected TAT</span>
              <span className="font-semibold text-theme-textPrimary">
                {data.demand?.expectedTat || 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Remarks */}
      {data.remarks && (
        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-theme-textPrimary">Remarks</h4>
          <p className="text-theme-textSecondary bg-theme-bgSecondary p-4 rounded-lg">
            {data.remarks}
          </p>
        </div>
      )}
    </div>
  );

  const renderDemandDetails = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <FaBuilding className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-theme-textPrimary">{data.companyName}</h3>
            <p className="text-theme-textSecondary">{data.sector}</p>
          </div>
        </div>
        {getStatusDisplay(data.status)}
      </div>

      {/* Demand Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-theme-textPrimary">Demand Details</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-theme-textSecondary">Expected Price</span>
              <span className="font-semibold text-primary text-lg">
                {formatCurrency(data.expectedPrice)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-theme-textSecondary">Quantity Required</span>
              <span className="font-semibold text-theme-textPrimary">
                {data.quantity?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-theme-textSecondary">Expected TAT</span>
              <span className="font-semibold text-theme-textPrimary">{data.expectedTat}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-theme-textSecondary">Posted On</span>
              <span className="font-semibold text-theme-textPrimary">
                {formatDate(data.postedAt)}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-theme-textPrimary">Engagement Stats</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-theme-textSecondary">Views</span>
              <span className="font-semibold text-theme-textPrimary">{data.viewCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-theme-textSecondary">Inquiries</span>
              <span className="font-semibold text-theme-textPrimary">{data.inquiries}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-theme-textSecondary">Offers Received</span>
              <span className="font-semibold text-theme-textPrimary">{data.offers?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Offers */}
      {data.offers && data.offers.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-theme-textPrimary">Offers Received</h4>
          <div className="space-y-3">
            {data.offers.map((offer, index) => (
              <div key={offer.id || index} className="bg-theme-bgSecondary p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-theme-textPrimary">{offer.supplier}</span>
                  {getStatusDisplay(offer.status)}
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-theme-textSecondary">Price: {formatCurrency(offer.price)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal content */}
        <div className="inline-block align-bottom bg-theme-cardBg rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-theme-borderSecondary">
            <h2 className="text-xl font-semibold text-theme-textPrimary">
              {type === 'quote' ? 'Quote Details' : 'Demand Details'}
            </h2>
            <button
              onClick={onClose}
              className="text-theme-textSecondary hover:text-theme-textPrimary transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            {type === 'quote' ? renderQuoteDetails() : renderDemandDetails()}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 border-t border-theme-borderSecondary">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-lg transition-colors bg-theme-bgSecondary hover:bg-theme-bgTertiary text-theme-textPrimary border border-theme-borderSecondary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
