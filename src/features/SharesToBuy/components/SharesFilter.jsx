import React from 'react';
import { FaFilter, FaSearch } from 'react-icons/fa';

const SharesFilter = ({ onOpenFilterModal, searchTerm, onSearchChange, activeFiltersCount }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 max-w-[500px]">
      {/* Search Bar */}
      <div className="flex-1 relative">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-textSecondary" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search shares by company, sector, or supplier..."
          className="w-full pl-10 pr-4 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary placeholder:text-theme-textMuted"
        />
      </div>

   
    </div>
  );
};

export default SharesFilter;