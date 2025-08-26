import React from 'react';
import { FaFilter, FaSearch } from 'react-icons/fa';

const AvailabilityFilter = ({ onOpenFilterModal, searchTerm, onSearchChange, activeFiltersCount }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
      {/* Search Bar */}
      <div className="flex-1 relative">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-textSecondary" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search your availabilities by company name..."
          className="w-full pl-10 pr-4 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary placeholder:text-theme-textMuted"
        />
      </div>

      {/* Filter Button */}
      <button
        onClick={onOpenFilterModal}
        className="flex items-center gap-2 px-4 py-3 bg-theme-accentLight/5 hover:bg-theme-accentLight/10 border border-theme-borderPrimary rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <FaFilter className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-theme-textPrimary">Filters</span>
        {activeFiltersCount > 0 && (
          <span className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-medium">
            {activeFiltersCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default AvailabilityFilter;
