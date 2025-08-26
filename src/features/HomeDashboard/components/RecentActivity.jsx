import React from 'react';
import { FaCalendarAlt, FaUsers, FaCheckCircle, FaClock } from 'react-icons/fa';

const RecentActivity = () => {
  // Mock data for recent activities - in real app this would come from API
  const activities = [
    {
      id: 1,
      type: 'quote_submitted',
      title: 'Quote Submitted',
      description: 'Reliance Industries - 1000 shares at ₹2,450/share',
      time: '2 hours ago',
      icon: FaCalendarAlt,
      color: 'primary'
    },
    {
      id: 2,
      type: 'deal_accepted',
      title: 'Deal Accepted',
      description: 'TCS shares - Contract generated',
      time: '4 hours ago',
      icon: FaCheckCircle,
      color: 'accent-green'
    },
    {
      id: 3,
      type: 'availability_posted',
      title: 'Availability Posted',
      description: 'HDFC Bank - 500 shares available for sale',
      time: '1 day ago',
      icon: FaUsers,
      color: 'accent-blue'
    },
    {
      id: 4,
      type: 'quote_pending',
      title: 'Quote Under Review',
      description: 'Infosys shares - Awaiting Altcase decision',
      time: '2 days ago',
      icon: FaClock,
      color: 'accent-yellow'
    }
  ];

  const getActivityIcon = (activity) => {
    const IconComponent = activity.icon;
    return (
      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
        activity.color === 'primary' ? 'bg-primary/10 text-primary' :
        activity.color === 'accent-green' ? 'bg-accent-green/10 text-accent-green' :
        activity.color === 'accent-yellow' ? 'bg-accent-yellow/10 text-accent-yellow' :
        'bg-primary/10 text-primary'
      }`}>
        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
    );
  };

  return (
    <div className="bg-theme-accentLight/5 rounded-xl p-4 sm:p-6 shadow-sm border border-theme-borderPrimary">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-theme-textPrimary mb-2">Recent Activity</h2>
        <p className="text-theme-textSecondary text-sm">Latest updates from your events</p>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-theme-accentLight/10 transition-colors duration-200">
            {getActivityIcon(activity)}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-theme-textPrimary text-sm mb-1">
                    {activity.title}
                  </h3>
                  <p className="text-theme-textSecondary text-sm">
                    {activity.description}
                  </p>
                </div>
                <span className="text-theme-textMuted text-xs whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-theme-borderPrimary">
        <button className="text-primary hover:text-secondary-600 text-sm font-medium transition-colors duration-200">
          View all activity →
        </button>
      </div>
    </div>
  );
};

export default RecentActivity; 