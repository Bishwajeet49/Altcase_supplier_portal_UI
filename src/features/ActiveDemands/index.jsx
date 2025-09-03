import React, { useState } from 'react';
import { FaPlus, FaChartBar, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import { DemandsFilter, FilterModal, GenerateDemandModal } from './components';
import SubmitQuoteModal from '../../components/ui/SubmitQuoteModal';
import DemandCard from '../../components/ui/DemandCard';
import { useActiveDemands } from './hooks/useActiveDemands';
import activeDemandsService from './activeDemands.service';

const ActiveDemands = () => {
  const {
    demands,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    refreshDemands,
    totalCount,
    filteredCount
  } = useActiveDemands();

  const [selectedDemand, setSelectedDemand] = useState(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isGenerateDemandModalOpen, setIsGenerateDemandModalOpen] = useState(false);

  const handleSubmitQuote = (demand) => {
    setSelectedDemand(demand);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setSelectedDemand(null);
    // Refresh demands after quote submission
    refreshDemands();
  };

  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleOpenGenerateDemandModal = () => {
    setIsGenerateDemandModalOpen(true);
  };
  const handleCloseGenerateDemandModal = () => {
    setIsGenerateDemandModalOpen(false);
  };
  const handleDemandGenerated = () => {
    setIsGenerateDemandModalOpen(false);
    // Optionally refresh the demands list
    refreshDemands();
  };

  const getQuickStats = () => {
    const urgentCount = demands.filter(d => d.priority.toLowerCase() === 'urgent').length;
    const expiringSoon = demands.filter(d => {
      const expiryDate = new Date(d.expiresAt);
      const now = new Date();
      const diffInDays = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
      return diffInDays <= 2;
    }).length;
    const highValueCount = demands.filter(d => d.expectedPrice * d.quantity >= 1000000).length;

    return { urgentCount, expiringSoon, highValueCount };
  };

  const { urgentCount, expiringSoon, highValueCount } = getQuickStats();

  // Calculate active filters count
  const activeFiltersCount = [
    filters.priority,
    filters.sector,
    filters.minPrice,
    filters.maxPrice
  ].filter(Boolean).length;

  if (error) {
    return (
      <div className="h-auto min-h-full w-full bg-theme-bgPrimary p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-400/10 border border-red-400/20 rounded-xl p-6 text-center">
            <FaExclamationTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-400 mb-2">Failed to Load Demands</h3>
            <p className="text-theme-textSecondary mb-4">{error}</p>
            <button
              onClick={refreshDemands}
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
      {/* main content container */}
      <div className="max-w-[1480px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-theme-textPrimary mb-2">
              Active Demands
            </h1>
            <p className="text-theme-textSecondary">
              Browse and submit quotes for active share demands from Altcase
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <button
              onClick={handleOpenGenerateDemandModal}
              className="flex items-center gap-2 px-4 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors font-medium"
            >
              <FaPlus className="w-4 h-4" />
              <span>Post Demand</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-theme-accentLight/5 rounded-xl p-4 border border-theme-borderPrimary">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <FaChartBar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-theme-textPrimary">{totalCount}</p>
                <p className="text-sm text-theme-textSecondary">Total Demands</p>
              </div>
            </div>
          </div>

          <div className="bg-theme-accentLight/5 rounded-xl p-4 border border-theme-borderPrimary">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-400/10 rounded-lg flex items-center justify-center">
                <FaExclamationTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-theme-textPrimary">{urgentCount}</p>
                <p className="text-sm text-theme-textSecondary">Urgent Priority</p>
              </div>
            </div>
          </div>

          <div className="bg-theme-accentLight/5 rounded-xl p-4 border border-theme-borderPrimary">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-400/10 rounded-lg flex items-center justify-center">
                <FaClock className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-theme-textPrimary">{expiringSoon}</p>
                <p className="text-sm text-theme-textSecondary">Expiring Soon</p>
              </div>
            </div>
          </div>

          <div className="bg-theme-accentLight/5 rounded-xl p-4 border border-theme-borderPrimary">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent-green/10 rounded-lg flex items-center justify-center">
                <FaChartBar className="w-5 h-5 text-accent-green" />
              </div>
              <div>
                <p className="text-2xl font-bold text-theme-textPrimary">{highValueCount}</p>
                <p className="text-sm text-theme-textSecondary">High Value (₹10L+)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <DemandsFilter
          onOpenFilterModal={handleOpenFilterModal}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeFiltersCount={activeFiltersCount}
        />


      

        {/* Demands Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-theme-accentLight/5 rounded-2xl p-4 sm:p-6 border border-theme-borderPrimary animate-pulse flex flex-col h-full">
                {/* Header Skeleton */}
                <div className="mb-4">
                  {/* Company Name Row */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-theme-bgSecondary rounded-lg flex-shrink-0"></div>
                    <div className="h-6 bg-theme-bgSecondary rounded w-32"></div>
                  </div>
                  
                  {/* Share Type and Sector */}
                  <div className="ml-10 mb-3">
                    <div className="h-4 bg-theme-bgSecondary rounded w-24"></div>
                  </div>

                  {/* Badges Row */}
                  <div className="flex items-center gap-2 ml-10">
                    <div className="h-6 bg-theme-bgSecondary rounded-full w-16"></div>
                    <div className="h-6 bg-theme-bgSecondary rounded-full w-20"></div>
                  </div>
                </div>

                {/* Content Area Skeleton - This will grow to fill available space */}
                <div className="flex-1 flex flex-col">
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

                  {/* Description */}
                  <div className="mb-4">
                    <div className="h-4 bg-theme-bgSecondary rounded mb-2 w-full"></div>
                    <div className="h-4 bg-theme-bgSecondary rounded w-3/4"></div>
                  </div>
                </div>

                {/* Footer Skeleton - Always at the bottom */}
                <div className="pt-4 border-t border-theme-borderSecondary/50 mt-auto">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                    <div className="h-3 bg-theme-bgSecondary rounded w-20"></div>
                    <div className="h-3 bg-theme-bgSecondary rounded w-20"></div>
                  </div>
                  
                  <div className="h-12 bg-theme-bgSecondary rounded-xl w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : demands.length === 0 ? (
          <div className="text-center py-12">
            <FaChartBar className="w-16 h-16 text-theme-textMuted mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-theme-textPrimary mb-2">
              {searchTerm || filters.priority || filters.sector ? 'No Matching Demands' : 'No Active Demands'}
            </h3>
            <p className="text-theme-textSecondary mb-4">
              {searchTerm || filters.priority || filters.sector 
                ? 'Try adjusting your filters to see more results.'
                : 'There are currently no active demands available.'
              }
            </p>
            {(searchTerm || filters.priority || filters.sector) && (
              <button
                onClick={() => {
                  setFilters({
                    priority: '',
                    sector: '',
                    sortBy: 'newest',
                    minPrice: '',
                    maxPrice: ''
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
            {demands.map((demand) => (
              <DemandCard
                key={demand.id}
                demand={demand}
                onQuoteNow={handleSubmitQuote}
                showQuoteButton={true}
                buttonText="Submit Quote"
                buttonVariant="primary"
              />
            ))}
          </div>
        )}

        {/* Submit Quote Modal */}
        <SubmitQuoteModal
          isOpen={isQuoteModalOpen}
          onClose={handleCloseQuoteModal}
          demand={selectedDemand}
          onSubmitSuccess={activeDemandsService.submitQuote}
        />

        {/* Filter Modal */}
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={handleCloseFilterModal}
          filters={filters}
          onFilterChange={setFilters}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Generate Demand Modal */}
        <GenerateDemandModal
          isOpen={isGenerateDemandModalOpen}
          onClose={handleCloseGenerateDemandModal}
          onSubmitSuccess={handleDemandGenerated}
        />
      </div>
    </div>
  );
};

export default ActiveDemands;
