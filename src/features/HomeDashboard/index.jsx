import React, { useState, useEffect } from 'react';
import BannerCarousel from './components/BannerCarousel';
import StatsGrid from './components/StatsGrid';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';
import ActiveDemandsPreview from './components/ActiveDemandsPreview';
import SharesToBuyPreview from './components/SharesToBuyPreview';
import homeDashboardService from './homeDashboard.service';

export default function HomeDashboard() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        // TODO: Update API endpoint for supplier stats
        const response = await homeDashboardService.getSupplierStats();
        setStats(response.data?.stats || response);
        setError(null);
      } catch (err) {
        console.error('Error fetching supplier dashboard stats:', err);
        // Use dummy data for now
        setStats({
          active_demands: 12,
          pending_quotes: 3,
          accepted_deals: 8,
          rejected_quotes: 2,
          availability_posts: 5,
          completed_deals: 15
        });
        setError(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const getUserName = () => {
    try {
      const userData = localStorage.getItem('user_data');
      if (userData) {
        const user = JSON.parse(userData);
        return user.username || user.name || 'Supplier';
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
    return 'Supplier';
  };

  return (
    <div className="h-auto min-h-full">
      {/* Main Dashboard Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* Banner Carousel */}
        <BannerCarousel />
        
        {/* Stats Grid */}
        <StatsGrid 
          stats={stats} 
          isLoading={isLoading} 
          error={error} 
        />
        
        {/* Quick Actions */}
        <QuickActions />

        {/* Preview Sections */}
        <div className="space-y-12 mb-12">
          {/* Active Demands Preview */}
          <ActiveDemandsPreview />
          
          {/* Shares to Buy Preview */}
          <SharesToBuyPreview />
        </div>
        
        {/* Bottom Section - Recent Activity and Additional Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Recent Activity - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            {/* <RecentActivity /> */}
          </div>
          
          {/* Additional Info Panel - Takes 1 column on large screens */}
          
        </div>
      </div>
    </div>
  );
}
