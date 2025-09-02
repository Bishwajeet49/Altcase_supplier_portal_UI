import React from 'react';

const StatsCardSkeleton = ({ screenSize = 'xl' }) => {
  // Get responsive skeleton layout based on screen size
  const getSkeletonLayout = () => {
    switch (screenSize) {
      case 'xl': // 1280px+: Horizontal layout
        return (
          <div className="h-32 rounded-xl p-6 border border-theme-borderPrimary bg-theme-accentLight/5 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-theme-textPrimary/10 to-transparent -translate-x-full animate-shimmer"></div>
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-theme-textMuted/20 rounded-xl"></div>
                <div className="h-6 bg-theme-textMuted/20 rounded w-24"></div>
              </div>
              <div className="h-8 bg-theme-textMuted/20 rounded w-16"></div>
            </div>
          </div>
        );

      case 'lg': // 1024px-1279px: Vertical layout
        return (
          <div className="h-32 rounded-xl p-4 border border-theme-borderPrimary bg-theme-accentLight/5 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-theme-textPrimary/10 to-transparent -translate-x-full animate-shimmer"></div>
            <div className="flex flex-col justify-center relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 bg-theme-textMuted/20 rounded-lg"></div>
                <div className="h-6 bg-theme-textMuted/20 rounded w-12"></div>
              </div>
              <div className="h-4 bg-theme-textMuted/20 rounded w-20"></div>
            </div>
          </div>
        );

      case 'md': // 768px-1023px: Horizontal layout (smaller)
        return (
          <div className="h-28 rounded-xl p-4 border border-theme-borderPrimary bg-theme-accentLight/5 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-theme-textPrimary/10 to-transparent -translate-x-full animate-shimmer"></div>
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-theme-textMuted/20 rounded-lg"></div>
                <div className="h-5 bg-theme-textMuted/20 rounded w-20"></div>
              </div>
              <div className="h-6 bg-theme-textMuted/20 rounded w-12"></div>
            </div>
          </div>
        );

      default: // <768px: Clean layout without icon for mobile
        return (
          <div className="h-24 rounded-xl p-4 border border-theme-borderPrimary bg-theme-accentLight/5 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-theme-textPrimary/10 to-transparent -translate-x-full animate-shimmer"></div>
            <div className="flex flex-col justify-center items-center relative z-10">
              <div className="h-6 bg-theme-textMuted/20 rounded w-16 mb-3"></div>
              <div className="h-4 bg-theme-textMuted/20 rounded w-24"></div>
            </div>
          </div>
        );
    }
  };

  return getSkeletonLayout();
};

export default StatsCardSkeleton; 