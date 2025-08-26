import { useState, useEffect, useMemo } from 'react';
import activeDemandsService from '../activeDemands.service';

export const useActiveDemands = () => {
  const [demands, setDemands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    priority: '',
    sector: '',
    sortBy: 'newest',
    minPrice: '',
    maxPrice: ''
  });

  // Fetch demands on component mount
  useEffect(() => {
    const fetchDemands = async () => {
      try {
        setIsLoading(true);
        const response = await activeDemandsService.getActiveDemands();
        
        if (response.success && response.data) {
          setDemands(response.data.demands || []);
        } else {
          setError('Failed to load demands');
        }
      } catch (err) {
        console.error('Error fetching demands:', err);
        setError('Failed to load demands. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDemands();
  }, []);

  // Filter and sort demands
  const filteredDemands = useMemo(() => {
    let filtered = [...demands];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(demand =>
        demand.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Priority filter
    if (filters.priority) {
      filtered = filtered.filter(demand =>
        demand.priority.toLowerCase() === filters.priority.toLowerCase()
      );
    }

    // Sector filter
    if (filters.sector) {
      filtered = filtered.filter(demand =>
        demand.sector === filters.sector
      );
    }

    // Price range filter
    if (filters.minPrice) {
      filtered = filtered.filter(demand =>
        demand.expectedPrice >= parseFloat(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(demand =>
        demand.expectedPrice <= parseFloat(filters.maxPrice)
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'oldest':
          return new Date(a.postedAt) - new Date(b.postedAt);
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          return (priorityOrder[b.priority.toLowerCase()] || 0) - (priorityOrder[a.priority.toLowerCase()] || 0);
        case 'expiry':
          return new Date(a.expiresAt) - new Date(b.expiresAt);
        case 'price_high':
          return b.expectedPrice - a.expectedPrice;
        case 'price_low':
          return a.expectedPrice - b.expectedPrice;
        case 'newest':
        default:
          return new Date(b.postedAt) - new Date(a.postedAt);
      }
    });

    return filtered;
  }, [demands, searchTerm, filters]);

  // Refresh demands
  const refreshDemands = async () => {
    try {
      setIsLoading(true);
      const response = await activeDemandsService.getActiveDemands();
      
      if (response.success && response.data) {
        setDemands(response.data.demands || []);
        setError(null);
      }
    } catch (err) {
      console.error('Error refreshing demands:', err);
      setError('Failed to refresh demands');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    demands: filteredDemands,
    allDemands: demands,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    refreshDemands,
    totalCount: demands.length,
    filteredCount: filteredDemands.length
  };
};
