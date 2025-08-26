import React from 'react';
import { FaTimes, FaFilter, FaSearch } from 'react-icons/fa';

const SharesFilterModal = ({ isOpen, onClose, filters, onFilterChange, searchTerm, onSearchChange }) => {
  const sectorOptions = [
    { value: '', label: 'All Sectors' },
    { value: 'Information Technology', label: 'Information Technology' },
    { value: 'Banking', label: 'Banking' },
    { value: 'Oil & Gas', label: 'Oil & Gas' },
    { value: 'Financial Services', label: 'Financial Services' },
    { value: 'Paints & Chemicals', label: 'Paints & Chemicals' },
    { value: 'Automobile', label: 'Automobile' },
    { value: 'Pharmaceuticals', label: 'Pharmaceuticals' },
    { value: 'Real Estate', label: 'Real Estate' },
    { value: 'Consumer Goods', label: 'Consumer Goods' },
    { value: 'Others', label: 'Others' }
  ];

  const priceRangeOptions = [
    { value: '', label: 'All Price Ranges' },
    { value: 'under-1000', label: 'Under ₹1,000' },
    { value: '1000-5000', label: '₹1,000 - ₹5,000' },
    { value: '5000-10000', label: '₹5,000 - ₹10,000' },
    { value: 'above-10000', label: 'Above ₹10,000' }
  ];

  const deliveryMethodOptions = [
    { value: '', label: 'All Delivery Methods' },
    { value: 'demat', label: 'Demat Form' },
    { value: 'physical', label: 'Physical Form' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest Listed' },
    { value: 'oldest', label: 'Oldest Listed' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'quantity_high', label: 'Quantity: High to Low' },
    { value: 'quantity_low', label: 'Quantity: Low to High' },
    { value: 'most_viewed', label: 'Most Viewed' },
    { value: 'rating_high', label: 'Highest Rated Supplier' },
    { value: 'expiry_soon', label: 'Expiring Soon' }
  ];

  const handleClearFilters = () => {
    onFilterChange({
      sector: '',
      priceRange: '',
      deliveryMethod: '',
      sortBy: 'newest',
      minPrice: '',
      maxPrice: '',
      minQuantity: '',
      maxQuantity: ''
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
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <FaFilter className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-lg font-bold text-theme-textPrimary">Filter Shares</h2>
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
            <label className="block text-sm font-medium text-theme-textPrimary mb-2">Search</label>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-textSecondary" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by company, sector, supplier..."
                className="w-full pl-10 pr-4 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary placeholder:text-theme-textMuted"
              />
            </div>
          </div>

          {/* Sector Filter */}
          <div>
            <label className="block text-sm font-medium text-theme-textPrimary mb-2">Sector</label>
            <select
              value={filters.sector}
              onChange={(e) => onFilterChange({ ...filters, sector: e.target.value })}
              className="w-full px-4 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary"
            >
              {sectorOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-theme-textPrimary mb-2">Price Range</label>
            <select
              value={filters.priceRange}
              onChange={(e) => onFilterChange({ ...filters, priceRange: e.target.value })}
              className="w-full px-4 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary"
            >
              {priceRangeOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          {/* Custom Price Range */}
          <div>
            <label className="block text-sm font-medium text-theme-textPrimary mb-2">Custom Price Range (₹)</label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                value={filters.minPrice}
                onChange={(e) => onFilterChange({ ...filters, minPrice: e.target.value })}
                placeholder="Min Price"
                className="w-full px-3 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary placeholder:text-theme-textMuted"
              />
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => onFilterChange({ ...filters, maxPrice: e.target.value })}
                placeholder="Max Price"
                className="w-full px-3 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary placeholder:text-theme-textMuted"
              />
            </div>
          </div>

          {/* Quantity Range */}
          <div>
            <label className="block text-sm font-medium text-theme-textPrimary mb-2">Available Quantity Range</label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                value={filters.minQuantity}
                onChange={(e) => onFilterChange({ ...filters, minQuantity: e.target.value })}
                placeholder="Min Qty"
                className="w-full px-3 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary placeholder:text-theme-textMuted"
              />
              <input
                type="number"
                value={filters.maxQuantity}
                onChange={(e) => onFilterChange({ ...filters, maxQuantity: e.target.value })}
                placeholder="Max Qty"
                className="w-full px-3 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary placeholder:text-theme-textMuted"
              />
            </div>
          </div>

          {/* Delivery Method Filter */}
          <div>
            <label className="block text-sm font-medium text-theme-textPrimary mb-2">Delivery Method</label>
            <select
              value={filters.deliveryMethod}
              onChange={(e) => onFilterChange({ ...filters, deliveryMethod: e.target.value })}
              className="w-full px-4 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary"
            >
              {deliveryMethodOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-theme-textPrimary mb-2">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
              className="w-full px-4 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
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

export default SharesFilterModal;
