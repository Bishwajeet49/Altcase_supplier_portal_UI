import React from 'react';
import { FaTimes, FaHandshake, FaUser, FaCalendarAlt, FaRupeeSign, FaCheck, FaTimes as FaReject } from 'react-icons/fa';

const ViewOffersModal = ({ isOpen, onClose, availability }) => {
  if (!isOpen || !availability) return null;

  const getOfferStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepted':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'rejected':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      default:
        return 'text-theme-textSecondary bg-theme-bgSecondary border-theme-borderSecondary';
    }
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const offers = availability.offers || [];
  const pendingOffers = offers.filter(offer => offer.status === 'pending');
  const acceptedOffers = offers.filter(offer => offer.status === 'accepted');
  const rejectedOffers = offers.filter(offer => offer.status === 'rejected');

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-theme-bgPrimary border border-theme-borderPrimary rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col">
        {/* Fixed Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-theme-borderSecondary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <FaHandshake className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-theme-textPrimary">Offers Received</h2>
              <p className="text-sm text-theme-textSecondary">{availability.companyName} - {offers.length} offers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-theme-bgSecondary hover:bg-theme-bgTertiary rounded-lg flex items-center justify-center transition-colors"
          >
            <FaTimes className="w-4 h-4 text-theme-textSecondary" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Availability Summary */}
          <div className="p-6 bg-theme-accentLight/5 border-b border-theme-borderSecondary">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-xs text-theme-textSecondary mb-1">Available Quantity</p>
                <p className="text-lg font-bold text-theme-textPrimary">{availability.quantity.toLocaleString()}</p>
                <p className="text-xs text-theme-textSecondary">shares</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-theme-textSecondary mb-1">Your Price</p>
                <p className="text-lg font-bold text-primary">{formatCurrency(availability.pricePerShare)}</p>
                <p className="text-xs text-theme-textSecondary">per share</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-theme-textSecondary mb-1">Min Quantity</p>
                <p className="text-lg font-bold text-theme-textPrimary">{availability.minQuantity.toLocaleString()}</p>
                <p className="text-xs text-theme-textSecondary">shares</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-theme-textSecondary mb-1">Total Offers</p>
                <p className="text-lg font-bold text-accent-green">{offers.length}</p>
                <p className="text-xs text-theme-textSecondary">received</p>
              </div>
            </div>
          </div>

          {/* Offers List */}
          <div className="p-6">
            {offers.length === 0 ? (
              <div className="text-center py-12">
                <FaHandshake className="w-16 h-16 text-theme-textMuted mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-theme-textPrimary mb-2">No Offers Yet</h3>
                <p className="text-theme-textSecondary">
                  Once buyers start showing interest, their offers will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Pending Offers */}
                {pendingOffers.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-theme-textPrimary mb-3 flex items-center gap-2">
                      <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                      Pending Offers ({pendingOffers.length})
                    </h3>
                    <div className="space-y-3">
                      {pendingOffers.map((offer) => (
                        <div key={offer.id} className="bg-theme-accentLight/5 rounded-xl p-4 border border-theme-borderPrimary">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <FaUser className="w-4 h-4 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-theme-textPrimary">{offer.buyerName}</h4>
                                <p className="text-sm text-theme-textSecondary flex items-center gap-1">
                                  <FaCalendarAlt className="w-3 h-3" />
                                  {formatDate(offer.createdAt)}
                                </p>
                              </div>
                            </div>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getOfferStatusColor(offer.status)}`}>
                              {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div className="bg-theme-bgSecondary/50 rounded-lg p-3">
                              <p className="text-xs text-theme-textSecondary mb-1">Quantity Requested</p>
                              <p className="font-bold text-theme-textPrimary">{offer.quantity.toLocaleString()} shares</p>
                            </div>
                            <div className="bg-theme-bgSecondary/50 rounded-lg p-3">
                              <p className="text-xs text-theme-textSecondary mb-1">Offered Price</p>
                              <p className="font-bold text-primary flex items-center gap-1">
                                <FaRupeeSign className="w-3 h-3" />
                                {offer.offeredPrice.toLocaleString()}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button className="flex-1 px-3 py-2 bg-green-400/10 hover:bg-green-400/20 text-green-400 text-sm font-medium rounded-lg transition-colors border border-green-400/20">
                              <FaCheck className="w-3 h-3 inline mr-1" />
                              Accept
                            </button>
                            <button className="flex-1 px-3 py-2 bg-red-400/10 hover:bg-red-400/20 text-red-400 text-sm font-medium rounded-lg transition-colors border border-red-400/20">
                              <FaReject className="w-3 h-3 inline mr-1" />
                              Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Accepted Offers */}
                {acceptedOffers.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-theme-textPrimary mb-3 flex items-center gap-2">
                      <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                      Accepted Offers ({acceptedOffers.length})
                    </h3>
                    <div className="space-y-3">
                      {acceptedOffers.map((offer) => (
                        <div key={offer.id} className="bg-green-400/5 rounded-xl p-4 border border-green-400/20">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-green-400/10 rounded-lg flex items-center justify-center">
                                <FaUser className="w-4 h-4 text-green-400" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-theme-textPrimary">{offer.buyerName}</h4>
                                <p className="text-sm text-theme-textSecondary flex items-center gap-1">
                                  <FaCalendarAlt className="w-3 h-3" />
                                  {formatDate(offer.createdAt)}
                                </p>
                              </div>
                            </div>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getOfferStatusColor(offer.status)}`}>
                              <FaCheck className="w-3 h-3 mr-1" />
                              {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-theme-bgSecondary/50 rounded-lg p-3">
                              <p className="text-xs text-theme-textSecondary mb-1">Quantity Sold</p>
                              <p className="font-bold text-theme-textPrimary">{offer.quantity.toLocaleString()} shares</p>
                            </div>
                            <div className="bg-theme-bgSecondary/50 rounded-lg p-3">
                              <p className="text-xs text-theme-textSecondary mb-1">Final Price</p>
                              <p className="font-bold text-green-400 flex items-center gap-1">
                                <FaRupeeSign className="w-3 h-3" />
                                {offer.offeredPrice.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rejected Offers */}
                {rejectedOffers.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-theme-textPrimary mb-3 flex items-center gap-2">
                      <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                      Rejected Offers ({rejectedOffers.length})
                    </h3>
                    <div className="space-y-3">
                      {rejectedOffers.map((offer) => (
                        <div key={offer.id} className="bg-red-400/5 rounded-xl p-4 border border-red-400/20 opacity-75">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-red-400/10 rounded-lg flex items-center justify-center">
                                <FaUser className="w-4 h-4 text-red-400" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-theme-textPrimary">{offer.buyerName}</h4>
                                <p className="text-sm text-theme-textSecondary flex items-center gap-1">
                                  <FaCalendarAlt className="w-3 h-3" />
                                  {formatDate(offer.createdAt)}
                                </p>
                              </div>
                            </div>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getOfferStatusColor(offer.status)}`}>
                              <FaReject className="w-3 h-3 mr-1" />
                              {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-theme-bgSecondary/50 rounded-lg p-3">
                              <p className="text-xs text-theme-textSecondary mb-1">Quantity Requested</p>
                              <p className="font-bold text-theme-textPrimary">{offer.quantity.toLocaleString()} shares</p>
                            </div>
                            <div className="bg-theme-bgSecondary/50 rounded-lg p-3">
                              <p className="text-xs text-theme-textSecondary mb-1">Offered Price</p>
                              <p className="font-bold text-red-400 flex items-center gap-1">
                                <FaRupeeSign className="w-3 h-3" />
                                {offer.offeredPrice.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 flex justify-end p-6 border-t border-theme-borderSecondary">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewOffersModal;
