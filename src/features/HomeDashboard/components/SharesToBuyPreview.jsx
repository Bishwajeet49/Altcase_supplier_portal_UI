import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBuilding, FaRupeeSign, FaStar, FaShieldAlt, FaArrowRight, FaTag } from 'react-icons/fa';
import sharesToBuyService from '../../SharesToBuy/sharesToBuy.service';

const SharesToBuyPreview = () => {
  const [shares, setShares] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShares = async () => {
      try {
        setIsLoading(true);
        const response = await sharesToBuyService.getApprovedShares();
        // Get only the newest 3 shares
        const latestShares = (response.data || response)
          .sort((a, b) => new Date(b.listedAt) - new Date(a.listedAt))
          .slice(0, 3);
        setShares(latestShares);
      } catch (error) {
        console.error('Error fetching shares preview:', error);
        // Use dummy data fallback
        setShares([
          {
            id: 'as1',
            companyName: 'Reliance Industries',
            shareType: 'Equity',
            sector: 'Oil & Gas',
            availableQuantity: 800,
            pricePerShare: 2520,
            originalPrice: 2400,
            minQuantity: 100,
            supplierName: 'Premium Shares Ltd.',
            supplierRating: 4.8,
            listedAt: '2024-07-21T12:00:00Z',
            tags: ['blue-chip', 'dividend-paying'],
            compliance: { regulatoryApproved: true }
          },
          {
            id: 'as2',
            companyName: 'TCS',
            shareType: 'Equity',
            sector: 'Information Technology',
            availableQuantity: 500,
            pricePerShare: 3900,
            originalPrice: 3750,
            minQuantity: 50,
            supplierName: 'Tech Equity Partners',
            supplierRating: 4.9,
            listedAt: '2024-07-19T11:00:00Z',
            tags: ['tech-stock', 'growth'],
            compliance: { regulatoryApproved: true }
          },
          {
            id: 'as3',
            companyName: 'HDFC Bank',
            shareType: 'Equity',
            sector: 'Banking',
            availableQuantity: 250,
            pricePerShare: 1680,
            originalPrice: 1580,
            minQuantity: 25,
            supplierName: 'Banking Securities Co.',
            supplierRating: 4.6,
            listedAt: '2024-07-16T16:00:00Z',
            tags: ['banking', 'large-cap'],
            compliance: { regulatoryApproved: true }
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShares();
  }, []);

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
    navigate('/shares-to-buy');
  };

  const handleBuyNow = (shareId) => {
    navigate('/shares-to-buy', { state: { openPurchaseModal: shareId } });
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
              <div className="flex items-center justify-between mb-4">
                <div className="h-6 bg-theme-borderSecondary rounded w-32"></div>
                <div className="h-4 bg-theme-borderSecondary rounded w-10"></div>
              </div>
              <div className="h-4 bg-theme-borderSecondary rounded mb-3 w-full"></div>
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
        <h2 className="text-2xl font-bold text-theme-accentLight">Shares to Buy</h2>
      </div>

      {/* Shares Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {shares.map((share) => (
          <div
            key={share.id}
            className="bg-theme-cardBg rounded-xl p-6 border border-theme-borderSecondary/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
          >
            {/* Company Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FaBuilding className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-theme-textPrimary text-base">{share.companyName}</h3>
              </div>
             
            </div>

       

       

         

            {/* Key Info */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-theme-textSecondary">Available</span>
                <span className="text-sm font-medium text-theme-textPrimary">{share.availableQuantity.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-theme-textSecondary">Price</span>
                <div className="text-right">
                  <span className="text-sm font-medium text-primary">₹{share.pricePerShare.toLocaleString()}</span>
                
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-theme-textSecondary">Min Order</span>
                <span className="text-sm font-medium text-theme-textPrimary">{share.minQuantity.toLocaleString()}</span>
              </div>
            </div>

     

            {/* Buy Button */}
            <button
              onClick={() => handleBuyNow(share.id)}
              className="w-full px-4 py-3 bg-primary hover:bg-primary/90 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Buy Now
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

      {shares.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <FaShoppingCart className="w-16 h-16 text-theme-textMuted mx-auto mb-4" />
          <p className="text-theme-textSecondary text-lg">No shares available for purchase</p>
        </div>
      )}
    </div>
  );
};

export default SharesToBuyPreview;
