import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaBuilding, FaRupeeSign, FaClock, FaExclamationTriangle, FaArrowRight } from 'react-icons/fa';
import activeDemandService from '../../ActiveDemands/activeDemands.service';
import DemandCard from '../../../components/ui/DemandCard';
import SubmitQuoteModal from '../../../components/ui/SubmitQuoteModal';

// Hook to get screen size and determine card count
const useResponsiveCards = () => {
  const [screenSize, setScreenSize] = useState('xl');
  const [cardCount, setCardCount] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setScreenSize('xl');
        setCardCount(3);
      } else if (width >= 1024) {
        setScreenSize('lg');
        setCardCount(3);
      } else if (width >= 768) {
        setScreenSize('md');
        setCardCount(4);
      } else {
        setScreenSize('sm');
        setCardCount(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { screenSize, cardCount };
};

const ActiveDemandsPreview = () => {
  const [demands, setDemands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDemand, setSelectedDemand] = useState(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const navigate = useNavigate();
  const { screenSize, cardCount } = useResponsiveCards();

  useEffect(() => {
    const fetchDemands = async () => {
      try {
        setIsLoading(true);
        const response = await activeDemandService.getDemands();
        // Get demands based on screen size
        const latestDemands = (response.data || response)
          .sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt))
          .slice(0, cardCount);
        setDemands(latestDemands);
      } catch (error) {
        console.error('Error fetching demands preview:', error);
        // Use dummy data fallback
        const dummyData = [
          {
            id: 'd1',
            companyName: 'Reliance Industries',
            shareType: 'Equity',
            sector: 'Oil & Gas',
            quantity: 500,
            expectedPrice: 2450,
            expectedTat: '3 days',
            priority: 'Urgent',
            postedAt: '2024-07-20T10:00:00Z'
          },
          {
            id: 'd2',
            companyName: 'TCS',
            shareType: 'Equity',
            sector: 'Information Technology',
            quantity: 1000,
            expectedPrice: 3800,
            expectedTat: '1 week',
            priority: 'High',
            postedAt: '2024-07-18T11:30:00Z'
          },
          {
            id: 'd3',
            companyName: 'HDFC Bank',
            shareType: 'Equity',
            sector: 'Banking',
            quantity: 200,
            expectedPrice: 1600,
            expectedTat: '5 days',
            priority: 'Medium',
            postedAt: '2024-07-21T09:00:00Z'
          },
          {
            id: 'd4',
            companyName: 'Infosys',
            shareType: 'Equity',
            sector: 'Information Technology',
            quantity: 750,
            expectedPrice: 1850,
            expectedTat: '2 days',
            priority: 'High',
            postedAt: '2024-07-22T14:00:00Z'
          }
        ];
        setDemands(dummyData.slice(0, cardCount));
      } finally {
        setIsLoading(false);
      }
    };

    fetchDemands();
  }, [cardCount]);

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'urgent':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'high':
        return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'medium':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'low':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      default:
        return 'text-theme-textSecondary bg-theme-bgSecondary border-theme-borderSecondary';
    }
  };

  const getPriorityIcon = (priority) => {
    if (priority?.toLowerCase() === 'urgent') {
      return <FaExclamationTriangle className="w-3 h-3" />;
    }
    return null;
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
      month: 'short'
    });
  };

  const handleViewAll = () => {
    navigate('/demands');
  };

  const handleQuoteNow = (demand) => {
    setSelectedDemand(demand);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setSelectedDemand(null);
  };

  // Get responsive grid classes based on screen size
  const getGridClasses = () => {
    switch (screenSize) {
      case 'xl': // 1280px+: 4 cards in 1 row
        return 'grid grid-cols-3 gap-6';
      case 'lg': // 1024px-1279px: 3 cards in 1 row
        return 'grid grid-cols-3 gap-6';
      case 'md': // 768px-1023px: 4 cards in 2 rows (2x2)
        return 'grid grid-cols-2 gap-4';
      default: // <768px: 4 cards in 4 rows (1x4)
        return 'grid grid-cols-1 gap-4';
    }
  };

  if (isLoading) {
    return (
      <div className="py-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 bg-theme-bgSecondary rounded-full animate-pulse"></div>
            </div>
            <div className="h-7 bg-theme-bgSecondary rounded w-40 animate-pulse"></div>
          </div>
          <div className="h-8 bg-theme-bgSecondary rounded w-20 animate-pulse"></div>
        </div>
        <div className={`${getGridClasses()} mb-4`}>
          {[...Array(cardCount)].map((_, index) => (
            <div key={index} className="bg-theme-cardBg rounded-xl p-6 border border-theme-borderSecondary/50 animate-pulse">
              <div className="h-6 bg-theme-borderSecondary rounded mb-4 w-32"></div>
              <div className="h-4 bg-theme-borderSecondary rounded mb-4 w-full"></div>
              <div className="h-4 bg-theme-borderSecondary rounded mb-4 w-3/4"></div>
              <div className="flex justify-between items-center mb-4">
                <div className="h-4 bg-theme-borderSecondary rounded w-20"></div>
                <div className="h-4 bg-theme-borderSecondary rounded w-16"></div>
              </div>
              <div className="h-10 bg-theme-borderSecondary rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Section Header */}
      <div className="flex items-center mb-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {/* Red Ping Animation */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>
          <h2 className="text-2xl font-bold text-theme-accentLight">Active Demands</h2>
        </div>
      </div>

      {/* Demands Cards */}
      <div className={`${getGridClasses()} mb-4`}>
        {demands.map((demand) => (
          <DemandCard
            key={demand.id}
            demand={demand}
            onQuoteNow={handleQuoteNow}
            showQuoteButton={true}
            buttonText="Quote Now"
            buttonVariant="primary"
          />
        ))}
      </div>

      {/* Centered View All Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleViewAll}
          className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary/80 transition-colors font-medium rounded-lg border border-primary/20"
        >
          <span className="text-sm">View All</span>
          <FaArrowRight className="w-3 h-3" />
        </button>
      </div>

      {demands.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <FaChartLine className="w-16 h-16 text-theme-textMuted mx-auto mb-4" />
          <p className="text-theme-textSecondary text-lg">No active demands available</p>
        </div>
      )}

      {/* Submit Quote Modal */}
      <SubmitQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuoteModal}
        demand={selectedDemand}
        onSubmitSuccess={activeDemandService.submitQuote}
      />
    </div>
  );
};

export default ActiveDemandsPreview;
