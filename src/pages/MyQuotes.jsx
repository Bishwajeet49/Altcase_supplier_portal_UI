import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaFileAlt, FaChartLine, FaClock, FaCheckCircle, FaTimesCircle, FaEye, FaBuilding, FaRupeeSign, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import QuoteCard from '../components/ui/QuoteCard';
import DemandCard from '../components/ui/DemandCard';
import DetailsModal from '../components/ui/DetailsModal';
import OffersModal from '../components/ui/OffersModal';
import myQuotesService from '../services/myQuotesService';

export default function MyQuotes() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get tab from URL parameters, default to 'quotes'
  const getTabFromUrl = () => {
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get('tab');
    return tab === 'demands' ? 'demands' : 'quotes';
  };
  
  const [activeTab, setActiveTab] = useState(getTabFromUrl());
  const [quotes, setQuotes] = useState([]);
  const [demands, setDemands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemType, setSelectedItemType] = useState('quote');
  const [isOffersModalOpen, setIsOffersModalOpen] = useState(false);
  const [selectedDemand, setSelectedDemand] = useState(null);
  const [stats, setStats] = useState({
    totalQuotes: 0,
    pendingQuotes: 0,
    acceptedQuotes: 0,
    rejectedQuotes: 0,
    totalDemands: 0,
    activeDemands: 0,
    completedDemands: 0,
    cancelledDemands: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  // Update active tab when URL changes
  useEffect(() => {
    const tabFromUrl = getTabFromUrl();
    if (tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [location.search]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const [quotesData, demandsData, statsData] = await Promise.all([
        myQuotesService.getMyQuotes(),
        myQuotesService.getMyDemands(),
        myQuotesService.getStats()
      ]);

      setQuotes(quotesData.data || []);
      setDemands(demandsData.data || []);
      setStats(statsData.data || {});
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'accepted':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'rejected':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'active':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'completed':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'cancelled':
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
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
      case 'active':
        return <FaExclamationTriangle className="w-3 h-3" />;
      case 'completed':
        return <FaCheckCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Update URL with the selected tab
    const newUrl = tab === 'quotes' ? '/my-quotes' : `/my-quotes?tab=${tab}`;
    navigate(newUrl, { replace: true });
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setSelectedItemType(activeTab === 'quotes' ? 'quote' : 'demand');
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedItem(null);
  };

  const handleViewOffers = (demand) => {
    setSelectedDemand(demand);
    setIsOffersModalOpen(true);
  };

  const handleCloseOffersModal = () => {
    setIsOffersModalOpen(false);
    setSelectedDemand(null);
  };

  const handleAcceptOffer = async (demandId, offerId) => {
    try {
      const result = await myQuotesService.acceptOffer(demandId, offerId);
      if (result.success) {
        toast.success('Offer accepted successfully!');
        // Refresh the data to show updated status
        fetchData();
        // Update the selected demand if it's currently open
        if (selectedDemand && selectedDemand.id === demandId) {
          const updatedDemand = { ...selectedDemand };
          const offer = updatedDemand.offers.find(o => o.id === offerId);
          if (offer) {
            offer.status = 'accepted';
            setSelectedDemand(updatedDemand);
          }
        }
      } else {
        toast.error(result.message || 'Failed to accept offer');
      }
    } catch (error) {
      console.error('Error accepting offer:', error);
      toast.error('Failed to accept offer. Please try again.');
    }
  };

  const handleRejectOffer = async (demandId, offerId) => {
    try {
      const result = await myQuotesService.rejectOffer(demandId, offerId);
      if (result.success) {
        toast.success('Offer rejected successfully!');
        // Refresh the data to show updated status
        fetchData();
        // Update the selected demand if it's currently open
        if (selectedDemand && selectedDemand.id === demandId) {
          const updatedDemand = { ...selectedDemand };
          const offer = updatedDemand.offers.find(o => o.id === offerId);
          if (offer) {
            offer.status = 'rejected';
            setSelectedDemand(updatedDemand);
          }
        }
      } else {
        toast.error(result.message || 'Failed to reject offer');
      }
    } catch (error) {
      console.error('Error rejecting offer:', error);
      toast.error('Failed to reject offer. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="flex space-x-4 mb-6">
            <div className="h-10 bg-gray-200 rounded w-24"></div>
            <div className="h-10 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <FaExclamationTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-theme-textPrimary mb-2">Error Loading Data</h3>
          <p className="text-theme-textSecondary mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1480px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-theme-textPrimary mb-2">My Quotes & Demands</h1>
        <p className="text-theme-textSecondary">Track your submitted quotes and demands</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-theme-textSecondary">Total Quotes</p>
              <p className="text-2xl font-bold text-primary">{stats.totalQuotes}</p>
            </div>
            <FaFileAlt className="w-8 h-8 text-primary" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-400/5 to-yellow-400/10 border border-yellow-400/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-theme-textSecondary">Pending</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.pendingQuotes}</p>
            </div>
            <FaClock className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-400/5 to-green-400/10 border border-green-400/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-theme-textSecondary">Accepted</p>
              <p className="text-2xl font-bold text-green-400">{stats.acceptedQuotes}</p>
            </div>
            <FaCheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-400/5 to-blue-400/10 border border-blue-400/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-theme-textSecondary">My Demands</p>
              <p className="text-2xl font-bold text-blue-400">{stats.totalDemands}</p>
            </div>
            <FaChartLine className="w-8 h-8 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-theme-borderSecondary">
          <div className="flex space-x-8">
            <button
              onClick={() => handleTabChange('quotes')}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'quotes'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-theme-textSecondary hover:text-theme-textPrimary hover:border-theme-borderSecondary'
              }`}
            >
              <div className="flex items-center gap-2">
                <FaFileAlt className="w-4 h-4" />
                My Quotes ({quotes.length})
              </div>
            </button>
            <button
              onClick={() => handleTabChange('demands')}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'demands'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-theme-textSecondary hover:text-theme-textPrimary hover:border-theme-borderSecondary'
              }`}
            >
              <div className="flex items-center gap-2">
                <FaChartLine className="w-4 h-4" />
                My Demands ({demands.length})
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'quotes' ? (
        <div>
          {quotes.length === 0 ? (
            <div className="text-center py-12">
              <FaFileAlt className="w-16 h-16 text-theme-textMuted mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-theme-textPrimary mb-2">No Quotes Found</h3>
              <p className="text-theme-textSecondary mb-4">
                You haven't submitted any quotes yet. Start by browsing active demands.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {quotes.map((quote) => (
                <QuoteCard
                  key={quote.id}
                  quote={quote}
                  onViewDetails={handleViewDetails}
                  getStatusColor={getStatusColor}
                  getStatusIcon={getStatusIcon}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          {demands.length === 0 ? (
            <div className="text-center py-12">
              <FaChartLine className="w-16 h-16 text-theme-textMuted mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-theme-textPrimary mb-2">No Demands Found</h3>
              <p className="text-theme-textSecondary mb-4">
                You haven't created any demands yet. Start by posting your availability.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {demands.map((demand) => (
                <DemandCard
                  key={demand.id}
                  demand={demand}
                  showQuoteButton={false}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleViewDetails(demand)}
                  onViewOffers={handleViewOffers}
                  onAcceptOffer={handleAcceptOffer}
                  onRejectOffer={handleRejectOffer}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Details Modal */}
      <DetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        data={selectedItem}
        type={selectedItemType}
        getStatusColor={getStatusColor}
        getStatusIcon={getStatusIcon}
      />

      {/* Offers Modal */}
      <OffersModal
        isOpen={isOffersModalOpen}
        onClose={handleCloseOffersModal}
        demand={selectedDemand}
        onAcceptOffer={handleAcceptOffer}
        onRejectOffer={handleRejectOffer}
      />
    </div>
  );
}


