import { useState, useEffect, useMemo } from 'react';
import postAvailabilityService from '../postAvailability.service';

export const usePostAvailability = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    sector: '',
    sortBy: 'newest',
    minPrice: '',
    maxPrice: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAvailabilities = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await postAvailabilityService.getAvailabilities();
      setAvailabilities(response.data || response);
    } catch (err) {
      setError('Failed to fetch availabilities');
      console.error('Error fetching availabilities:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await postAvailabilityService.getAvailabilityStats();
      setStats(response.data || response);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const createAvailability = async (availabilityData) => {
    try {
      const response = await postAvailabilityService.createAvailability(availabilityData);
      if (response.success) {
        await fetchAvailabilities();
        await fetchStats();
        return response;
      }
    } catch (err) {
      console.error('Error creating availability:', err);
      throw err;
    }
  };

  const updateAvailabilityStatus = async (availabilityId, status) => {
    try {
      const response = await postAvailabilityService.updateAvailabilityStatus(availabilityId, status);
      if (response.success) {
        await fetchAvailabilities();
        await fetchStats();
        return response;
      }
    } catch (err) {
      console.error('Error updating availability status:', err);
      throw err;
    }
  };

  const deleteAvailability = async (availabilityId) => {
    try {
      const response = await postAvailabilityService.deleteAvailability(availabilityId);
      if (response.success) {
        await fetchAvailabilities();
        await fetchStats();
        return response;
      }
    } catch (err) {
      console.error('Error deleting availability:', err);
      throw err;
    }
  };

  const refreshAvailabilities = () => {
    fetchAvailabilities();
    fetchStats();
  };

  // Filter and sort availabilities
  const filteredAvailabilities = useMemo(() => {
    let filtered = [...availabilities];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(availability =>
        availability.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        availability.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
        availability.shareType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter(availability => availability.status === filters.status);
    }

    // Sector filter
    if (filters.sector) {
      filtered = filtered.filter(availability => availability.sector === filters.sector);
    }

    // Price range filter
    if (filters.minPrice) {
      filtered = filtered.filter(availability => availability.pricePerShare >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(availability => availability.pricePerShare <= parseFloat(filters.maxPrice));
    }

    // Sort
    switch (filters.sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.postedAt) - new Date(b.postedAt));
        break;
      case 'price_high':
        filtered.sort((a, b) => b.pricePerShare - a.pricePerShare);
        break;
      case 'price_low':
        filtered.sort((a, b) => a.pricePerShare - b.pricePerShare);
        break;
      case 'quantity_high':
        filtered.sort((a, b) => b.quantity - a.quantity);
        break;
      case 'quantity_low':
        filtered.sort((a, b) => a.quantity - b.quantity);
        break;
      case 'most_viewed':
        filtered.sort((a, b) => b.viewCount - a.viewCount);
        break;
      case 'most_inquiries':
        filtered.sort((a, b) => b.inquiries - a.inquiries);
        break;
      default:
        break;
    }

    return filtered;
  }, [availabilities, searchTerm, filters]);

  useEffect(() => {
    fetchAvailabilities();
    fetchStats();
  }, []);

  return {
    availabilities: filteredAvailabilities,
    stats,
    totalCount: availabilities.length,
    filteredCount: filteredAvailabilities.length,
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
  };
};
