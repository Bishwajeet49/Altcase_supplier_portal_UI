import React, { useState, useEffect } from 'react';
import StatsCard from './StatsCard';
import StatsCardSkeleton from './StatsCardSkeleton';

// Hook to get screen size for responsive layouts
const useResponsiveStats = () => {
  const [screenSize, setScreenSize] = useState('xl');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setScreenSize('xl'); // 1280px+
      } else if (width >= 1024) {
        setScreenSize('lg'); // 1024px-1279px
      } else if (width >= 768) {
        setScreenSize('md'); // 768px-1023px
      } else {
        setScreenSize('sm'); // <768px
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};

const StatsGrid = ({ stats, isLoading, error }) => {
  const screenSize = useResponsiveStats();

  // Get responsive grid classes based on screen size
  const getGridClasses = () => {
    switch (screenSize) {
      case 'xl': // 1280px+: 4 cards in 1 row (current layout)
        return 'grid grid-cols-4 gap-6';
      case 'lg': // 1024px-1279px: 4 cards in 1 row (vertical card layout)
        return 'grid grid-cols-4 gap-4';
      case 'md': // 768px-1023px: 2 rows, 2 cards each (horizontal card layout)
        return 'grid grid-cols-2 gap-4';
      default: // <768px: 2 rows, 2 cards each (vertical card layout)
        return 'grid grid-cols-2 gap-3';
    }
  };

  if (isLoading) {
    return (
      <div className={`${getGridClasses()} mb-8`}>
        {[...Array(4)].map((_, index) => (
          <StatsCardSkeleton key={index} screenSize={screenSize} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-8 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-red-400 font-semibold text-lg">Failed to load statistics</h3>
            <p className="text-red-300 text-base">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  // Select top 4 most relevant stats
  const topStatsData = [
    {
      title: 'Active Demands',
      value: stats.active_demands || 0,
      description: 'Available demands to quote on',
      type: 'total'
    },
    {
      title: 'Pending Quotes',
      value: stats.pending_quotes || 0,
      description: 'Awaiting Altcase review',
      type: 'pending'
    },
    {
      title: 'Accepted Deals',
      value: stats.accepted_deals || 0,
      description: 'Successful deals this month',
      type: 'approved'
    },
    {
      title: 'Rejected Quotes',
      value: stats.rejected_quotes || 0,
      description: 'Quotes rejected by Altcase',
      type: 'rejected'
    }
  ];

  return (
    <div className={`${getGridClasses()} mb-8`}>
      {topStatsData.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          type={stat.type}
          screenSize={screenSize}
        />
      ))}
    </div>
  );
};

export default StatsGrid; 