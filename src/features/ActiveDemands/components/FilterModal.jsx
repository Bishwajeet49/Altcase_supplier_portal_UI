import React from 'react';
import { FaTimes, FaFilter, FaSearch } from 'react-icons/fa';

const FilterModal = ({ isOpen, onClose, filters, onFilterChange, searchTerm, onSearchChange }) => {
  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const sectorOptions = [
    { value: '', label: 'All Sectors' },
    { value: 'Banking', label: 'Banking' },
    { value: 'Information Technology', label: 'Information Technology' },
    { value: 'Oil & Gas', label: 'Oil & Gas' },
    { value: 'Financial Services', label: 'Financial Services' },
    { value: 'Paints & Chemicals', label: 'Paints & Chemicals' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'priority', label: 'Priority' },
    { value: 'expiry', label: 'Expiring Soon' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'price_low', label: 'Price: Low to High' }
  ];

  const handleClearFilters = () => {
    onFilterChange({
      priority: '',
      sector: '',
      sortBy: 'newest',
      minPrice: '',
      maxPrice: ''
    });
    onSearchChange('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-theme-bgPrimary border border-theme-borderPrimary rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-theme-borderSecondary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <FaFilter className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-theme-textPrimary">Filter & Search</h2>
              <p className="text-sm text-theme-textSecondary">Refine your demands</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-theme-bgSecondary hover:bg-theme-bgTertiary rounded-lg flex items-center justify-center transition-colors"
          >
            <FaTimes className="w-4 h-4 text-theme-textSecondary" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-theme-textPrimary mb-2">
              Search Companies
            </label>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-textSecondary" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by company name..."
                className="w-full pl-10 pr-4 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary placeholder:text-theme-textMuted"
              />
            </div>
          </div>

          {/* Priority Filter */}
          <div>
            <label className="block text-sm font-medium text-theme-textPrimary mb-2">
              Priority
            </label>
            <select
              value={filters.priority}
              onChange={(e) => onFilterChange({ ...filters, priority: e.target.value })}
              className="w-full px-3 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary"
            >
              {priorityOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sector Filter */}
          <div>
            <label className="block text-sm font-medium text-theme-textPrimary mb-2">
              Sector
            </label>
            <select
              value={filters.sector}
              onChange={(e) => onFilterChange({ ...filters, sector: e.target.value })}
              className="w-full px-3 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary"
            >
              {sectorOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-theme-textPrimary mb-2">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
              className="w-full px-3 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-theme-textPrimary mb-2">
              Price Range (₹)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                value={filters.minPrice}
                onChange={(e) => onFilterChange({ ...filters, minPrice: e.target.value })}
                placeholder="Min"
                className="w-full px-3 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary placeholder:text-theme-textMuted"
              />
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => onFilterChange({ ...filters, maxPrice: e.target.value })}
                placeholder="Max"
                className="w-full px-3 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary placeholder:text-theme-textMuted"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 p-6 border-t border-theme-borderSecondary">
          <button
            onClick={handleClearFilters}
            className="flex-1 px-4 py-3 bg-theme-bgSecondary hover:bg-theme-bgTertiary text-theme-textPrimary border border-theme-borderSecondary rounded-lg transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors font-medium"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
