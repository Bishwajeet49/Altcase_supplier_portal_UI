import React, { useState } from 'react';
import { FaTimes, FaBuilding, FaRupeeSign, FaClock, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaEye, FaHandshake } from 'react-icons/fa';

const OffersModal = ({ 
  isOpen, 
  onClose, 
  demand,
  onAcceptOffer,
  onRejectOffer,
  onViewOfferDetails
}) => {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !demand) return null;

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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'accepted':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'rejected':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      default:
        return 'text-theme-textSecondary bg-theme-bgSecondary border-theme-borderSecondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return <FaClock className="w-3 h-3" />;
      case 'accepted':
        return <FaCheckCircle className="w-3 h-3" />;
      case 'rejected':
        return <FaTimesCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const handleAcceptOffer = async (offerId) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      if (onAcceptOffer) {
        await onAcceptOffer(demand.id, offerId);
      }
    } catch (error) {
      console.error('Error accepting offer:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRejectOffer = async (offerId) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      if (onRejectOffer) {
        await onRejectOffer(demand.id, offerId);
      }
    } catch (error) {
      console.error('Error rejecting offer:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const pendingOffers = demand.offers?.filter(offer => offer.status === 'pending') || [];
  const acceptedOffers = demand.offers?.filter(offer => offer.status === 'accepted') || [];
  const rejectedOffers = demand.offers?.filter(offer => offer.status === 'rejected') || [];

  const renderOfferCard = (offer) => (
    <div key={offer.id} className="bg-theme-cardBg rounded-lg p-4 border border-theme-borderSecondary/50">
      {/* Offer Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <FaBuilding className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-theme-textPrimary">{offer.supplier}</h4>
            <p className="text-sm text-theme-textSecondary">Submitted {formatDate(offer.submittedAt)}</p>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(offer.status)}`}>
          {getStatusIcon(offer.status)}
          {offer.status?.charAt(0).toUpperCase() + offer.status?.slice(1)}
        </span>
      </div>

      {/* Offer Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <span className="text-sm text-theme-textSecondary">Quote Price</span>
          <p className="font-semibold text-primary text-lg">{formatCurrency(offer.price)}</p>
        </div>
        <div>
          <span className="text-sm text-theme-textSecondary">TAT Offered</span>
          <p className="font-semibold text-theme-textPrimary">{offer.tat}</p>
        </div>
      </div>

      {/* Remarks */}
      {offer.remarks && (
        <div className="mb-4">
          <span className="text-sm text-theme-textSecondary">Remarks</span>
          <p className="text-sm text-theme-textPrimary bg-theme-bgSecondary p-2 rounded mt-1">
            {offer.remarks}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      {offer.status === 'pending' && (
        <div className="flex gap-2">
          <button
            onClick={() => handleAcceptOffer(offer.id)}
            disabled={isProcessing}
            className="flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors bg-green-500 hover:bg-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <FaCheckCircle className="w-4 h-4" />
            Accept
          </button>
          <button
            onClick={() => handleRejectOffer(offer.id)}
            disabled={isProcessing}
            className="flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors bg-red-500 hover:bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <FaTimesCircle className="w-4 h-4" />
            Reject
          </button>
          <button
            onClick={() => onViewOfferDetails && onViewOfferDetails(offer)}
            className="px-3 py-2 text-sm font-medium rounded-lg transition-colors bg-theme-bgSecondary hover:bg-theme-bgTertiary text-theme-textPrimary border border-theme-borderSecondary hover:border-primary/30"
          >
            <FaEye className="w-4 h-4" />
          </button>
        </div>
      )}

      {offer.status !== 'pending' && (
        <div className="flex justify-end">
          <button
            onClick={() => onViewOfferDetails && onViewOfferDetails(offer)}
            className="px-3 py-2 text-sm font-medium rounded-lg transition-colors bg-theme-bgSecondary hover:bg-theme-bgTertiary text-theme-textPrimary border border-theme-borderSecondary hover:border-primary/30 flex items-center gap-2"
          >
            <FaEye className="w-4 h-4" />
            View Details
          </button>
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
        <div className="bg-theme-cardBg rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl sm:w-full sm:max-h-[90vh] flex flex-col mx-auto">
          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-theme-borderSecondary">
            <div>
              <h2 className="text-xl font-semibold text-theme-textPrimary">Offers for Demand</h2>
              <p className="text-sm text-theme-textSecondary mt-1">
                {demand.companyName} - {demand.sector}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-theme-textSecondary hover:text-theme-textPrimary transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto min-h-0 p-6">
            {/* Demand Summary */}
            <div className="bg-theme-bgSecondary rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-theme-textPrimary mb-2">Demand Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-theme-textSecondary">Expected Price</span>
                  <p className="font-medium text-theme-textPrimary">{formatCurrency(demand.expectedPrice)}</p>
                </div>
                <div>
                  <span className="text-theme-textSecondary">Quantity</span>
                  <p className="font-medium text-theme-textPrimary">{demand.quantity?.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-theme-textSecondary">Expected TAT</span>
                  <p className="font-medium text-theme-textPrimary">{demand.expectedTat}</p>
                </div>
                <div>
                  <span className="text-theme-textSecondary">Total Offers</span>
                  <p className="font-medium text-theme-textPrimary">{demand.offers?.length || 0}</p>
                </div>
              </div>
            </div>

            {/* Offers Sections */}
            {demand.offers && demand.offers.length > 0 ? (
              <div className="space-y-6">
                {/* Pending Offers */}
                {pendingOffers.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-theme-textPrimary mb-3 flex items-center gap-2">
                      <FaClock className="w-4 h-4 text-yellow-400" />
                      Pending Offers ({pendingOffers.length})
                    </h3>
                    <div className="space-y-3">
                      {pendingOffers.map(renderOfferCard)}
                    </div>
                  </div>
                )}

                {/* Accepted Offers */}
                {acceptedOffers.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-theme-textPrimary mb-3 flex items-center gap-2">
                      <FaCheckCircle className="w-4 h-4 text-green-400" />
                      Accepted Offers ({acceptedOffers.length})
                    </h3>
                    <div className="space-y-3">
                      {acceptedOffers.map(renderOfferCard)}
                    </div>
                  </div>
                )}

                {/* Rejected Offers */}
                {rejectedOffers.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-theme-textPrimary mb-3 flex items-center gap-2">
                      <FaTimesCircle className="w-4 h-4 text-red-400" />
                      Rejected Offers ({rejectedOffers.length})
                    </h3>
                    <div className="space-y-3">
                      {rejectedOffers.map(renderOfferCard)}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <FaHandshake className="w-16 h-16 text-theme-textMuted mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-theme-textPrimary mb-2">No Offers Yet</h3>
                <p className="text-theme-textSecondary">
                  No offers have been received for this demand yet.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 flex justify-end gap-3 p-6 border-t border-theme-borderSecondary">
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

export default OffersModal;

