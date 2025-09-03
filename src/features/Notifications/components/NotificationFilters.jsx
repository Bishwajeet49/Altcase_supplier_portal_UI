import React from 'react';
import { FaFilter, FaCheck, FaQuoteLeft, FaHandshake, FaEye, FaCog } from 'react-icons/fa';
import { NOTIFICATION_CATEGORIES } from '../notifications.service';

const NotificationFilters = ({ 
  activeCategory, 
  onCategoryChange,
  showUnreadOnly,
  onToggleUnreadOnly,
  notificationCounts,
  className = ""
}) => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case NOTIFICATION_CATEGORIES.QUOTES:
        return <FaQuoteLeft className="w-4 h-4" />;
      case NOTIFICATION_CATEGORIES.OFFERS:
        return <FaHandshake className="w-4 h-4" />;
      case NOTIFICATION_CATEGORIES.AVAILABILITY:
        return <FaEye className="w-4 h-4" />;
      case NOTIFICATION_CATEGORIES.SYSTEM:
        return <FaCog className="w-4 h-4" />;
      default:
        return <FaFilter className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case NOTIFICATION_CATEGORIES.ALL:
        return 'All';
      case NOTIFICATION_CATEGORIES.QUOTES:
        return 'Quotes';
      case NOTIFICATION_CATEGORIES.OFFERS:
        return 'Offers';
      case NOTIFICATION_CATEGORIES.AVAILABILITY:
        return 'Availability';
      case NOTIFICATION_CATEGORIES.SYSTEM:
        return 'System';
      default:
        return category;
    }
  };

  const categories = Object.values(NOTIFICATION_CATEGORIES);

  return (
    <div className={`bg-theme-cardBg rounded-xl p-4 border border-theme-borderSecondary/50 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-theme-textPrimary flex items-center gap-2">
          <FaFilter className="w-4 h-4 text-primary" />
          Filters
        </h3>
        
        {/* Unread Toggle */}
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showUnreadOnly}
              onChange={(e) => onToggleUnreadOnly(e.target.checked)}
              className="sr-only"
            />
            <div className={`
              relative w-10 h-5 rounded-full transition-colors duration-200
              ${showUnreadOnly ? 'bg-primary' : 'bg-theme-bgTertiary'}
            `}>
              <div className={`
                absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200
                ${showUnreadOnly ? 'translate-x-5' : 'translate-x-0'}
              `} />
            </div>
            <span className="text-sm text-theme-textSecondary">Unread only</span>
          </label>
        </div>
      </div>

      {/* Category Filters */}
      <div className="space-y-2">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          const categoryData = notificationCounts?.categories?.[category] || { total: 0, unread: 0 };
          const count = category === NOTIFICATION_CATEGORIES.ALL 
            ? notificationCounts?.total || 0 
            : categoryData.total;
          const unreadCount = category === NOTIFICATION_CATEGORIES.ALL 
            ? notificationCounts?.totalUnread || 0 
            : categoryData.unread;

          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`
                w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-theme-bgSecondary hover:bg-theme-bgTertiary text-theme-textPrimary hover:text-primary'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`
                  w-8 h-8 rounded-lg flex items-center justify-center
                  ${isActive ? 'bg-white/20' : 'bg-primary/10'}
                `}>
                  {getCategoryIcon(category)}
                </div>
                <span className="font-medium">{getCategoryLabel(category)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Total count */}
                <span className={`
                  text-xs px-2 py-1 rounded-full
                  ${isActive 
                    ? 'bg-white/20 text-white' 
                    : 'bg-theme-bgTertiary text-theme-textSecondary'
                  }
                `}>
                  {count}
                </span>
                
                {/* Unread count badge */}
                {unreadCount > 0 && (
                  <span className={`
                    text-xs px-2 py-1 rounded-full font-medium
                    ${isActive 
                      ? 'bg-white text-primary' 
                      : 'bg-primary text-white'
                    }
                  `}>
                    {unreadCount}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-theme-borderSecondary/30">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">
              {notificationCounts?.totalUnread || 0}
            </div>
            <div className="text-xs text-theme-textSecondary">Unread</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-theme-textPrimary">
              {notificationCounts?.total || 0}
            </div>
            <div className="text-xs text-theme-textSecondary">Total</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationFilters;
