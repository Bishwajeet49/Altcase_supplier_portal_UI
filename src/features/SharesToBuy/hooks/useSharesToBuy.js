import { useState, useEffect, useMemo } from 'react';
import sharesToBuyService from '../sharesToBuy.service';

export const useSharesToBuy = () => {
  const [shares, setShares] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    sector: '',
    priceRange: '',
    deliveryMethod: '',
    sortBy: 'newest',
    minPrice: '',
    maxPrice: '',
    minQuantity: '',
    maxQuantity: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  const fetchShares = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await sharesToBuyService.getApprovedShares();
      setShares(response.data || response);
    } catch (err) {
      setError('Failed to fetch shares');
      console.error('Error fetching shares:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await sharesToBuyService.getMarketplaceStats();
      setStats(response.data || response);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const purchaseShares = async (purchaseData) => {
    try {
      const response = await sharesToBuyService.purchaseShares(purchaseData);
      if (response.success) {
        // Refresh shares data after purchase
        await fetchShares();
        await fetchStats();
        return response;
      }
    } catch (err) {
      console.error('Error purchasing shares:', err);
      throw err;
    }
  };

  const expressInterest = async (shareId, contactInfo) => {
    try {
      const response = await sharesToBuyService.expressInterest(shareId, contactInfo);
      if (response.success) {
        // Optionally refresh data
        await fetchShares();
        return response;
      }
    } catch (err) {
      console.error('Error expressing interest:', err);
      throw err;
    }
  };

  const refreshShares = () => {
    fetchShares();
    fetchStats();
  };

  // Filter and sort shares
  const filteredShares = useMemo(() => {
    let filtered = [...shares];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(share =>
        share.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        share.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
        share.shareType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        share.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        share.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sector filter
    if (filters.sector) {
      filtered = filtered.filter(share => share.sector === filters.sector);
    }

    // Delivery method filter
    if (filters.deliveryMethod) {
      filtered = filtered.filter(share => share.deliveryMethod === filters.deliveryMethod);
    }

    // Price range filter
    if (filters.minPrice) {
      filtered = filtered.filter(share => share.pricePerShare >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(share => share.pricePerShare <= parseFloat(filters.maxPrice));
    }

    // Quantity range filter
    if (filters.minQuantity) {
      filtered = filtered.filter(share => share.availableQuantity >= parseInt(filters.minQuantity));
    }
    if (filters.maxQuantity) {
      filtered = filtered.filter(share => share.availableQuantity <= parseInt(filters.maxQuantity));
    }

    // Predefined price range filter
    if (filters.priceRange) {
      switch (filters.priceRange) {
        case 'under-1000':
          filtered = filtered.filter(share => share.pricePerShare < 1000);
          break;
        case '1000-5000':
          filtered = filtered.filter(share => share.pricePerShare >= 1000 && share.pricePerShare <= 5000);
          break;
        case '5000-10000':
          filtered = filtered.filter(share => share.pricePerShare >= 5000 && share.pricePerShare <= 10000);
          break;
        case 'above-10000':
          filtered = filtered.filter(share => share.pricePerShare > 10000);
          break;
        default:
          break;
      }
    }

    // Sort
    switch (filters.sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.listedAt) - new Date(a.listedAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.listedAt) - new Date(b.listedAt));
        break;
      case 'price_high':
        filtered.sort((a, b) => b.pricePerShare - a.pricePerShare);
        break;
      case 'price_low':
        filtered.sort((a, b) => a.pricePerShare - b.pricePerShare);
        break;
      case 'quantity_high':
        filtered.sort((a, b) => b.availableQuantity - a.availableQuantity);
        break;
      case 'quantity_low':
        filtered.sort((a, b) => a.availableQuantity - b.availableQuantity);
        break;
      case 'most_viewed':
        filtered.sort((a, b) => b.viewCount - a.viewCount);
        break;
      case 'rating_high':
        filtered.sort((a, b) => b.supplierRating - a.supplierRating);
        break;
      case 'expiry_soon':
        filtered.sort((a, b) => new Date(a.validity) - new Date(b.validity));
        break;
      default:
        break;
    }

    return filtered;
  }, [shares, searchTerm, filters]);

  // Calculate additional stats
  const getQuickStats = () => {
    const totalShares = shares.length;
    const totalQuantity = shares.reduce((sum, share) => sum + share.availableQuantity, 0);
    const totalValue = shares.reduce((sum, share) => sum + (share.availableQuantity * share.pricePerShare), 0);
    const avgPrice = totalShares > 0 ? Math.round(totalValue / totalQuantity) : 0;
    const uniqueSuppliers = [...new Set(shares.map(share => share.supplierName))].length;
    const recentlyListed = shares.filter(share => {
      const listedDate = new Date(share.listedAt);
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      return listedDate > threeDaysAgo;
    }).length;

    return {
      totalShares,
      totalQuantity,
      totalValue,
      avgPrice,
      uniqueSuppliers,
      recentlyListed
    };
  };

  useEffect(() => {
    fetchShares();
    fetchStats();
  }, []);

  return {
    shares: filteredShares,
    stats,
    totalCount: shares.length,
    filteredCount: filteredShares.length,
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
  };
};
