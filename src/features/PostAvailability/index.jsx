import React, { useState } from 'react';
import { FaPlus, FaChartBar, FaClock, FaHandshake, FaEye } from 'react-icons/fa';
import { 
  AvailabilityCard, 
  PostAvailabilityModal, 
  AvailabilityFilter, 
  AvailabilityFilterModal,
  ViewOffersModal 
} from './components';
import { usePostAvailability } from './hooks/usePostAvailability';

export default function PostAvailabilityFeature() {
  const {
    availabilities,
    stats,
    totalCount,
    filteredCount,
    isLoading,
    error,
    filters,
    setFilters,
    searchTerm,
    setSearchTerm,
    createAvailability,
    updateAvailabilityStatus,
    deleteAvailability,
    refreshAvailabilities
  } = usePostAvailability();

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isViewOffersModalOpen, setIsViewOffersModalOpen] = useState(false);
  const [editingAvailability, setEditingAvailability] = useState(null);
  const [selectedAvailability, setSelectedAvailability] = useState(null);

  const handleOpenPostModal = () => {
    setEditingAvailability(null);
    setIsPostModalOpen(true);
  };

  const handleClosePostModal = () => {
    setIsPostModalOpen(false);
    setEditingAvailability(null);
  };

  const handleAvailabilityPosted = () => {
    setIsPostModalOpen(false);
    setEditingAvailability(null);
    refreshAvailabilities();
  };

  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleEditAvailability = (availability) => {
    setEditingAvailability(availability);
    setIsPostModalOpen(true);
  };

  const handleUpdateStatus = async (availabilityId, status) => {
    try {
      await updateAvailabilityStatus(availabilityId, status);
    } catch (error) {
      console.error('Error updating availability status:', error);
    }
  };

  const handleDeleteAvailability = async (availabilityId) => {
    if (window.confirm('Are you sure you want to delete this availability? This action cannot be undone.')) {
      try {
        await deleteAvailability(availabilityId);
      } catch (error) {
        console.error('Error deleting availability:', error);
      }
    }
  };

  const handleViewOffers = (availability) => {
    setSelectedAvailability(availability);
    setIsViewOffersModalOpen(true);
  };

  const handleCloseViewOffersModal = () => {
    setIsViewOffersModalOpen(false);
    setSelectedAvailability(null);
  };

  // Calculate active filters count
  const activeFiltersCount = [
    filters.status, filters.sector, filters.minPrice, filters.maxPrice
  ].filter(Boolean).length;

  const getQuickStats = () => {
    const activeCount = availabilities.filter(a => a.status === 'active').length;
    const soldCount = availabilities.filter(a => a.status === 'sold').length;
    const totalOffers = availabilities.reduce((sum, a) => sum + (a.offers?.length || 0), 0);
    const totalViews = availabilities.reduce((sum, a) => sum + (a.viewCount || 0), 0);
    
    return { activeCount, soldCount, totalOffers, totalViews };
  };

  const { activeCount, soldCount, totalOffers, totalViews } = getQuickStats();

  if (error) {
    return (
      <div className="h-auto min-h-full w-full p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="text-red-400 text-xl mb-4">⚠️ Error Loading Availabilities</div>
            <p className="text-theme-textSecondary mb-4">{error}</p>
            <button
              onClick={refreshAvailabilities}
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
    <div className="h-auto min-h-full w-full p-4">
      {/* main conten area */}
      <div className="max-w-[1480px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Shares Availability
          </h1>
          <p className="text-green-200">
            Manage and track your posted share availabilities and received offers
          </p>
        </div>

        {/* Posts Activity Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Posts Activity</h2>
          <button
            onClick={handleOpenPostModal}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors font-medium"
          >
            <FaPlus className="w-4 h-4" />
            <span>Create Post</span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-800/50 rounded-xl p-4 border border-green-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <FaChartBar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{totalCount}</p>
                <p className="text-sm text-green-200">Total Posts</p>
              </div>
            </div>
          </div>

          <div className="bg-green-800/50 rounded-xl p-4 border border-green-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-400/10 rounded-lg flex items-center justify-center">
                <FaClock className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{activeCount}</p>
                <p className="text-sm text-green-200">Active Posts</p>
              </div>
            </div>
          </div>

          <div className="bg-green-800/50 rounded-xl p-4 border border-green-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-400/10 rounded-lg flex items-center justify-center">
                <FaHandshake className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{soldCount}</p>
                <p className="text-sm text-green-200">Sold</p>
              </div>
            </div>
          </div>

          <div className="bg-green-800/50 rounded-xl p-4 border border-green-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent-green/10 rounded-lg flex items-center justify-center">
                <FaEye className="w-5 h-5 text-accent-green" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{totalViews}</p>
                <p className="text-sm text-green-200">Total Views</p>
              </div>
            </div>
          </div>
        </div>

     

      
        {/* Availabilities Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-theme-accentLight/5 rounded-2xl p-4 sm:p-6 border border-theme-borderPrimary animate-pulse flex flex-col h-full">
                {/* Header Skeleton */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-theme-bgSecondary rounded-lg flex-shrink-0"></div>
                    <div className="h-6 bg-theme-bgSecondary rounded w-32"></div>
                  </div>
                  <div className="ml-10 mb-3">
                    <div className="h-4 bg-theme-bgSecondary rounded w-24"></div>
                  </div>
                  <div className="flex items-center gap-2 ml-10">
                    <div className="h-6 bg-theme-bgSecondary rounded-full w-16"></div>
                    <div className="h-6 bg-theme-bgSecondary rounded-full w-20"></div>
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
                    <div className="h-3 bg-theme-bgSecondary rounded w-16"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-theme-bgSecondary rounded flex-1"></div>
                    <div className="h-8 bg-theme-bgSecondary rounded flex-1"></div>
                    <div className="h-8 bg-theme-bgSecondary rounded flex-1"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : availabilities.length === 0 ? (
          <div className="text-center py-12">
            <FaChartBar className="w-16 h-16 text-theme-textMuted mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-theme-textPrimary mb-2">
              {searchTerm || filters.status || filters.sector ? 'No Matching Availabilities' : 'No Availabilities Posted'}
            </h3>
            <p className="text-theme-textSecondary mb-4">
              {searchTerm || filters.status || filters.sector 
                ? 'Try adjusting your filters to see more results.'
                : 'Start by posting your first share availability to attract potential buyers.'
              }
            </p>
            {(searchTerm || filters.status || filters.sector) ? (
              <button
                onClick={() => {
                  setFilters({
                    status: '',
                    sector: '',
                    sortBy: 'newest',
                    minPrice: '',
                    maxPrice: ''
                  });
                  setSearchTerm('');
                }}
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors mr-3"
              >
                Clear Filters
              </button>
            ) : (
              <button
                onClick={handleOpenPostModal}
                className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors font-medium"
              >
                <FaPlus className="w-4 h-4 inline mr-2" />
                Post Your First Availability
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {availabilities.map((availability) => (
              <AvailabilityCard
                key={availability.id}
                availability={availability}
                onUpdateStatus={handleUpdateStatus}
                onDelete={handleDeleteAvailability}
                onEdit={handleEditAvailability}
                onViewOffers={handleViewOffers}
              />
            ))}
          </div>
        )}

        {/* Post Availability Modal */}
        <PostAvailabilityModal
          isOpen={isPostModalOpen}
          onClose={handleClosePostModal}
          onSubmitSuccess={handleAvailabilityPosted}
          editingAvailability={editingAvailability}
        />

        {/* Filter Modal */}
        <AvailabilityFilterModal
          isOpen={isFilterModalOpen}
          onClose={handleCloseFilterModal}
          filters={filters}
          onFilterChange={setFilters}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* View Offers Modal */}
        <ViewOffersModal
          isOpen={isViewOffersModalOpen}
          onClose={handleCloseViewOffersModal}
          availability={selectedAvailability}
        />
      </div>
    </div>
  );
}
