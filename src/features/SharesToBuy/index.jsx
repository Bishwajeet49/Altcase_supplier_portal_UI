import React, { useState } from 'react';
import { FaShoppingCart, FaChartBar, FaEye, FaUsers, FaRocket } from 'react-icons/fa';
import { 
  ShareCard, 
  PurchaseModal, 
  SharesFilter, 
  SharesFilterModal,
  ExpressInterestModal 
} from './components';
import { useSharesToBuy } from './hooks/useSharesToBuy';

export default function SharesToBuyFeature() {
  const {
    shares,
    stats,
    totalCount,
    filteredCount,
    isLoading,
    error,
    filters,
    setFilters,
    searchTerm,
    setSearchTerm,
    purchaseShares,
    expressInterest,
    refreshShares,
    getQuickStats
  } = useSharesToBuy();

  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);
  const [selectedShare, setSelectedShare] = useState(null);

  const handlePurchase = (share) => {
    setSelectedShare(share);
    setIsPurchaseModalOpen(true);
  };

  const handleClosePurchaseModal = () => {
    setIsPurchaseModalOpen(false);
    setSelectedShare(null);
  };

  const handlePurchaseSuccess = (result) => {
    setIsPurchaseModalOpen(false);
    setSelectedShare(null);
    refreshShares();
    // You could show a success toast here
    console.log('Purchase successful:', result);
  };

  const handleExpressInterest = (share) => {
    setSelectedShare(share);
    setIsInterestModalOpen(true);
  };

  const handleCloseInterestModal = () => {
    setIsInterestModalOpen(false);
    setSelectedShare(null);
  };

  const handleInterestSuccess = (result) => {
    setIsInterestModalOpen(false);
    setSelectedShare(null);
    refreshShares();
    // You could show a success toast here
    console.log('Interest expressed:', result);
  };

  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  // Calculate active filters count
  const activeFiltersCount = [
    filters.sector, filters.priceRange, filters.deliveryMethod, 
    filters.minPrice, filters.maxPrice, filters.minQuantity, filters.maxQuantity
  ].filter(Boolean).length;

  const quickStats = getQuickStats();

  if (error) {
    return (
      <div className="h-auto min-h-full w-full bg-theme-bgPrimary p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="text-red-400 text-xl mb-4">⚠️ Error Loading Shares</div>
            <p className="text-theme-textSecondary mb-4">{error}</p>
            <button
              onClick={refreshShares}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-auto min-h-full w-full  p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-theme-textPrimary mb-2">
              Shares to Buy
            </h1>
            <p className="text-theme-textSecondary">
              Browse and purchase verified shares from trusted suppliers on Altcase marketplace
            </p>
          </div>
       
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-theme-accentLight/5 rounded-xl p-4 border border-theme-borderPrimary">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <FaChartBar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-theme-textPrimary">{quickStats.totalShares}</p>
                <p className="text-sm text-theme-textSecondary">Available Shares</p>
              </div>
            </div>
          </div>

          <div className="bg-theme-accentLight/5 rounded-xl p-4 border border-theme-borderPrimary">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-400/10 rounded-lg flex items-center justify-center">
                <FaShoppingCart className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-theme-textPrimary">{quickStats.totalQuantity.toLocaleString()}</p>
                <p className="text-sm text-theme-textSecondary">Total Quantity</p>
              </div>
            </div>
          </div>

          <div className="bg-theme-accentLight/5 rounded-xl p-4 border border-theme-borderPrimary">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent-green/10 rounded-lg flex items-center justify-center">
                <FaUsers className="w-5 h-5 text-accent-green" />
              </div>
              <div>
                <p className="text-2xl font-bold text-theme-textPrimary">{quickStats.uniqueSuppliers}</p>
                <p className="text-sm text-theme-textSecondary">Active Suppliers</p>
              </div>
            </div>
          </div>

          <div className="bg-theme-accentLight/5 rounded-xl p-4 border border-theme-borderPrimary">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-400/10 rounded-lg flex items-center justify-center">
                <FaEye className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-theme-textPrimary">₹{(quickStats.avgPrice || 0).toLocaleString()}</p>
                <p className="text-sm text-theme-textSecondary">Avg. Price</p>
              </div>
            </div>
          </div>
        </div>


        {/* Filters */}
        <SharesFilter
          onOpenFilterModal={handleOpenFilterModal}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeFiltersCount={activeFiltersCount}
        />

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-theme-textSecondary">
            {filteredCount === totalCount ? (
              <>Showing all {totalCount} shares</>
            ) : (
              <>Showing {filteredCount} of {totalCount} shares</>
            )}
          </div>
     
        </div>

        {/* Shares Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-theme-accentLight/5 rounded-2xl p-4 sm:p-6 border border-theme-borderPrimary animate-pulse flex flex-col h-full">
                {/* Header Skeleton */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-theme-bgSecondary rounded-lg flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-theme-bgSecondary rounded w-32 mb-1"></div>
                      <div className="h-4 bg-theme-bgSecondary rounded w-20"></div>
                    </div>
                    <div className="h-4 bg-theme-bgSecondary rounded w-8"></div>
                  </div>
                  <div className="ml-10 mb-3">
                    <div className="h-4 bg-theme-bgSecondary rounded w-24 mb-2"></div>
                    <div className="flex gap-1">
                      <div className="h-5 bg-theme-bgSecondary rounded w-12"></div>
                      <div className="h-5 bg-theme-bgSecondary rounded w-16"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-10">
                    <div className="h-6 bg-theme-bgSecondary rounded-full w-20"></div>
                    <div className="h-6 bg-theme-bgSecondary rounded-full w-16"></div>
                  </div>
                </div>

                {/* Key Metrics Grid Skeleton */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-theme-bgSecondary/50 rounded-xl p-3 border border-theme-borderSecondary/50 h-20 flex flex-col justify-center">
                      <div className="h-3 bg-theme-borderSecondary rounded mb-1 w-16"></div>
                      <div className="h-4 bg-theme-borderSecondary rounded mb-1 w-20"></div>
                      <div className="h-3 bg-theme-borderSecondary rounded w-12"></div>
                    </div>
                  ))}
                </div>

                {/* Value Calculation Skeleton */}
                <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="h-3 bg-theme-bgSecondary rounded w-20 mb-1"></div>
                  <div className="h-6 bg-theme-bgSecondary rounded w-24 mb-1"></div>
                  <div className="h-3 bg-theme-bgSecondary rounded w-32"></div>
                </div>

                {/* Performance Stats Skeleton */}
                <div className="mb-4">
                  <div className="h-16 bg-theme-bgSecondary/30 rounded-lg"></div>
                </div>

                {/* Content Area Skeleton */}
                <div className="flex-1 flex flex-col">
                  <div className="mb-4">
                    <div className="h-4 bg-theme-bgSecondary rounded mb-2 w-full"></div>
                    <div className="h-4 bg-theme-bgSecondary rounded w-3/4"></div>
                  </div>
                </div>

                {/* Footer Skeleton */}
                <div className="pt-4 border-t border-theme-borderSecondary/50 mt-auto">
                  <div className="flex justify-between items-center mb-3">
                    <div className="h-3 bg-theme-bgSecondary rounded w-20"></div>
                    <div className="h-3 bg-theme-bgSecondary rounded w-20"></div>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="h-3 bg-theme-bgSecondary rounded w-16"></div>
                    <div className="h-3 bg-theme-bgSecondary rounded w-24"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-theme-bgSecondary rounded flex-1"></div>
                    <div className="h-8 bg-theme-bgSecondary rounded flex-2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : shares.length === 0 ? (
          <div className="text-center py-12">
            <FaShoppingCart className="w-16 h-16 text-theme-textMuted mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-theme-textPrimary mb-2">
              {searchTerm || Object.values(filters).some(Boolean) ? 'No Matching Shares' : 'No Shares Available'}
            </h3>
            <p className="text-theme-textSecondary mb-4">
              {searchTerm || Object.values(filters).some(Boolean) 
                ? 'Try adjusting your filters to see more results.'
                : 'No approved shares are currently available for purchase.'
              }
            </p>
            {(searchTerm || Object.values(filters).some(Boolean)) && (
              <button
                onClick={() => {
                  setFilters({
                    sector: '',
                    priceRange: '',
                    deliveryMethod: '',
                    sortBy: 'newest',
                    minPrice: '',
                    maxPrice: '',
                    minQuantity: '',
                    maxQuantity: ''
                  });
                  setSearchTerm('');
                }}
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {shares.map((share) => (
              <ShareCard
                key={share.id}
                share={share}
                onPurchase={handlePurchase}
                onExpressInterest={handleExpressInterest}
              />
            ))}
          </div>
        )}

        {/* Purchase Modal */}
        <PurchaseModal
          isOpen={isPurchaseModalOpen}
          onClose={handleClosePurchaseModal}
          onPurchaseSuccess={handlePurchaseSuccess}
          share={selectedShare}
        />

        {/* Express Interest Modal */}
        <ExpressInterestModal
          isOpen={isInterestModalOpen}
          onClose={handleCloseInterestModal}
          onInterestSuccess={handleInterestSuccess}
          share={selectedShare}
        />

        {/* Filter Modal */}
        <SharesFilterModal
          isOpen={isFilterModalOpen}
          onClose={handleCloseFilterModal}
          filters={filters}
          onFilterChange={setFilters}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>
    </div>
  );
}
