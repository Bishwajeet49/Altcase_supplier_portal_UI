import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBuilding, FaRupeeSign, FaStar, FaShieldAlt, FaArrowRight, FaTag } from 'react-icons/fa';
import sharesToBuyService from '../../SharesToBuy/sharesToBuy.service';
import ShareCard from '../../../components/ui/ShareCard';
import PurchaseModal from '../../../components/ui/PurchaseModal';

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

const SharesToBuyPreview = () => {
  const [shares, setShares] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [selectedShare, setSelectedShare] = useState(null);
  const navigate = useNavigate();
  const { screenSize, cardCount } = useResponsiveCards();

  useEffect(() => {
    const fetchShares = async () => {
      try {
        setIsLoading(true);
        const response = await sharesToBuyService.getApprovedShares();
        // Get shares based on screen size
        const latestShares = (response.data || response)
          .sort((a, b) => new Date(b.listedAt) - new Date(a.listedAt))
          .slice(0, cardCount);
        setShares(latestShares);
      } catch (error) {
        console.error('Error fetching shares preview:', error);
        // Use dummy data fallback
        const dummyData = [
          {
            id: 'as1',
            companyName: 'Reliance Industries',
            shareType: 'Equity',
            sector: 'Oil & Gas',
            availableQuantity: 800,
            pricePerShare: 2520,
            originalPrice: 2400,
            minQuantity: 100,
            maxQuantity: 800,
            supplierName: 'Premium Shares Ltd.',
            supplierRating: 4.8,
            listedAt: '2024-07-21T12:00:00Z',
            tags: ['blue-chip', 'dividend-paying'],
            compliance: { regulatoryApproved: true },
            deliveryMethod: 'demat'
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
            maxQuantity: 500,
            supplierName: 'Tech Equity Partners',
            supplierRating: 4.9,
            listedAt: '2024-07-19T11:00:00Z',
            tags: ['tech-stock', 'growth'],
            compliance: { regulatoryApproved: true },
            deliveryMethod: 'demat'
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
            maxQuantity: 250,
            supplierName: 'Banking Securities Co.',
            supplierRating: 4.6,
            listedAt: '2024-07-16T16:00:00Z',
            tags: ['banking', 'large-cap'],
            compliance: { regulatoryApproved: true },
            deliveryMethod: 'demat'
          },
          {
            id: 'as4',
            companyName: 'Infosys',
            shareType: 'Equity',
            sector: 'Information Technology',
            availableQuantity: 600,
            pricePerShare: 1850,
            originalPrice: 1750,
            minQuantity: 75,
            maxQuantity: 600,
            supplierName: 'Tech Equity Partners',
            supplierRating: 4.7,
            listedAt: '2024-07-23T10:00:00Z',
            tags: ['tech-stock', 'growth'],
            compliance: { regulatoryApproved: true },
            deliveryMethod: 'demat'
          }
        ];
        setShares(dummyData.slice(0, cardCount));
      } finally {
        setIsLoading(false);
      }
    };

    fetchShares();
  }, [cardCount]);

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

  const handleBuyNow = (share) => {
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
    // You could show a success toast here
    console.log('Purchase successful:', result);
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
      </div>
    );
  }

  return (
    <div className="mt-8">
      {/* Section Header */}
      <div className="flex items-center mb-3 ">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {/* Red Ping Animation */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>
          <h2 className="text-2xl font-bold text-theme-accentLight">Shares to Buy</h2>
        </div>
      </div>

      {/* Shares Cards */}
      <div className={`${getGridClasses()} mb-4`}>
        {shares.map((share) => (
          <ShareCard
            key={share.id}
            share={share}
            onBuyNow={handleBuyNow}
            showBuyButton={true}
            buyButtonText="Buy Now"
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

      {shares.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <FaShoppingCart className="w-16 h-16 text-theme-textMuted mx-auto mb-4" />
          <p className="text-theme-textSecondary text-lg">No shares available for purchase</p>
        </div>
      )}

      {/* Purchase Modal */}
      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={handleClosePurchaseModal}
        onPurchaseSuccess={handlePurchaseSuccess}
        share={selectedShare}
      />
    </div>
  );
};

export default SharesToBuyPreview;
