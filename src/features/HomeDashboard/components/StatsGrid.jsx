import React from 'react';
import StatsCard from './StatsCard';
import StatsCardSkeleton from './StatsCardSkeleton';

const StatsGrid = ({ stats, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
        {[...Array(3)].map((_, index) => (
          <StatsCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-8 mb-12">
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

  // Select top 3 most relevant stats
  const topStatsData = [
    {
      title: 'Active Demands',
      value: stats.active_demands || 0,
      description: 'Available demands from Altcase to quote on',
      type: 'total'
    },
    {
      title: 'Pending Quotes',
      value: stats.pending_quotes || 0,
      description: 'Your quotes awaiting Altcase review',
      type: 'pending'
    },
    {
      title: 'Accepted Deals',
      value: stats.accepted_deals || 0,
      description: 'Successful deals this month',
      type: 'approved'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
      {topStatsData.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          type={stat.type}
        />
      ))}
    </div>
  );
};

export default StatsGrid; 