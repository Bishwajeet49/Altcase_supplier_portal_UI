import React, { useState } from 'react';
import { 
  NotificationList, 
  NotificationFilters, 
  NotificationActions 
} from './components';
import { useNotifications } from './hooks/useNotifications';
import { NOTIFICATION_CATEGORIES } from './notifications.service';
import { FaBell } from 'react-icons/fa';

const Notifications = () => {
  const {
    notifications,
    notificationCounts,
    isLoading,
    error,
    filters,
    updateFilters,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refresh,
    clearAllNotifications
  } = useNotifications();

  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  // Handle category filter change
  const handleCategoryChange = (category) => {
    updateFilters({ category, page: 1 });
  };

  // Handle unread only toggle
  const handleToggleUnreadOnly = (unreadOnly) => {
    setShowUnreadOnly(unreadOnly);
    updateFilters({ 
      isRead: unreadOnly ? false : undefined, 
      page: 1 
    });
  };

  // Handle notification click (could navigate to related page)
  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
    // TODO: Add navigation logic based on notification type
    // For example:
    // - Quote notifications -> navigate to quotes page
    // - Offer notifications -> navigate to offers page
    // - Availability notifications -> navigate to availability page
  };

  return (
    <div className="h-auto min-h-full">
      <div className="max-w-[1480px] mx-auto p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <FaBell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-theme-textPrimary">
                Notifications
              </h1>
              <p className="text-theme-textSecondary">
                Stay updated with your trading activities and system updates
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          {notificationCounts && (
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-theme-textSecondary">Total:</span>
                <span className="font-semibold text-theme-textPrimary">
                  {notificationCounts.total}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-theme-textSecondary">Unread:</span>
                <span className="font-semibold text-primary">
                  {notificationCounts.totalUnread}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="mb-6">
          <NotificationActions
            onMarkAllAsRead={() => markAllAsRead(
              filters.category === NOTIFICATION_CATEGORIES.ALL ? null : filters.category
            )}
            onRefresh={refresh}
            onClearAll={clearAllNotifications}
            isLoading={isLoading}
            unreadCount={notificationCounts?.totalUnread || 0}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <NotificationFilters
              activeCategory={filters.category}
              onCategoryChange={handleCategoryChange}
              showUnreadOnly={showUnreadOnly}
              onToggleUnreadOnly={handleToggleUnreadOnly}
              notificationCounts={notificationCounts}
            />
          </div>

          {/* Notifications List */}
          <div className="lg:col-span-3">
            <NotificationList
              notifications={notifications}
              isLoading={isLoading}
              error={error}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
              onNotificationClick={handleNotificationClick}
            />
          </div>
        </div>

        {/* Loading Overlay for Actions */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <span className="text-theme-textPrimary">Loading notifications...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
