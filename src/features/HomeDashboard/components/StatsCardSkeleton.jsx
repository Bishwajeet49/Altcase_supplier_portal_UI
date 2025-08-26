import React from 'react';

const StatsCardSkeleton = () => {
  return (
    <div className="bg-theme-accentLight/5 rounded-xl p-4 sm:p-6 shadow-sm border border-theme-borderPrimary overflow-hidden relative">
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-theme-textPrimary/10 to-transparent -translate-x-full animate-shimmer"></div>
      
      {/* Icon skeleton */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-theme-textMuted/20 rounded-lg"></div>
        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-theme-textMuted/20 rounded-full"></div>
      </div>
      
      {/* Title skeleton */}
      <div className="h-3 sm:h-4 bg-theme-textMuted/20 rounded mb-2 w-3/4 relative z-10"></div>
      
      {/* Value skeleton */}
      <div className="h-6 sm:h-8 bg-theme-textMuted/20 rounded mb-2 w-1/2 relative z-10"></div>
      
      {/* Subtitle skeleton */}
      <div className="h-2 sm:h-3 bg-theme-textMuted/10 rounded w-2/3 relative z-10"></div>
    </div>
  );
};

export default StatsCardSkeleton; 