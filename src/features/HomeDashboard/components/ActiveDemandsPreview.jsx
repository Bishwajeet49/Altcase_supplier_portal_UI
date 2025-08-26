import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaBuilding, FaRupeeSign, FaClock, FaExclamationTriangle, FaArrowRight } from 'react-icons/fa';
import activeDemandService from '../../ActiveDemands/activeDemands.service';

const ActiveDemandsPreview = () => {
  const [demands, setDemands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDemands = async () => {
      try {
        setIsLoading(true);
        const response = await activeDemandService.getDemands();
        // Get only the newest 3 demands
        const latestDemands = (response.data || response)
          .sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt))
          .slice(0, 3);
        setDemands(latestDemands);
      } catch (error) {
        console.error('Error fetching demands preview:', error);
        // Use dummy data fallback
        setDemands([
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
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDemands();
  }, []);

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

  const handleQuoteNow = (demandId) => {
    navigate('/demands', { state: { openQuoteModal: demandId } });
  };

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-theme-bgSecondary rounded-full animate-pulse"></div>
          </div>
          <div className="h-7 bg-theme-bgSecondary rounded w-40 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {[...Array(3)].map((_, index) => (
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
        <div className="flex justify-center">
          <div className="h-12 bg-theme-borderSecondary rounded-lg w-32 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          {/* Red Ping Animation */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </div>
        <h2 className="text-2xl font-bold text-theme-accentLight">Active Demands</h2>
      </div>

      {/* Demands Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {demands.map((demand) => (
          <div
            key={demand.id}
            className="bg-theme-cardBg rounded-xl p-6 border border-theme-borderSecondary/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
          >

            <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between mb-4 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FaBuilding className="w-4 h-4 text-primary" />
                </div>
                <div>
                <h3 className="font-semibold text-theme-textPrimary text-base">{demand.companyName}</h3>
           
                </div>
                
              </div>
           
            </div>
            {/* Company Header */}
         

            {/* Share Details */}


            {/* Key Info */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-theme-textSecondary">Quantity</span>
                <span className="text-sm font-medium text-theme-textPrimary">{demand.quantity.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-theme-textSecondary">Expected Price</span>
                <span className="text-sm font-medium text-primary">₹{demand.expectedPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-theme-textSecondary">TAT</span>
                <span className="text-sm font-medium text-theme-textPrimary">{demand.expectedTat}</span>
              </div>
            </div>

            {/* Priority and Date */}
        

            {/* Quote Button */}
            <button
              onClick={() => handleQuoteNow(demand.id)}
              className="w-full px-4 py-3 bg-primary hover:bg-primary/90 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Quote Now
            </button>
          </div>
        ))}
      </div>

      {/* Centered View All Button */}
      <div className="flex justify-center">
        <button
          onClick={handleViewAll}
          className="flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary/80 transition-colors font-medium rounded-lg border border-primary/20"
        >
          <span className="text-base">View All</span>
          <FaArrowRight className="w-4 h-4" />
        </button>
      </div>

      {demands.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <FaChartLine className="w-16 h-16 text-theme-textMuted mx-auto mb-4" />
          <p className="text-theme-textSecondary text-lg">No active demands available</p>
        </div>
      )}
    </div>
  );
};

export default ActiveDemandsPreview;
