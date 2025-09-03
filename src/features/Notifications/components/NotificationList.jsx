import React from 'react';
import NotificationItem from './NotificationItem';
import { FaBell, FaSpinner } from 'react-icons/fa';

const NotificationList = ({ 
  notifications = [],
  isLoading = false,
  error = null,
  onMarkAsRead,
  onDelete,
  onNotificationClick,
  className = ""
}) => {
  if (isLoading) {
    return (
      <div className={`bg-theme-cardBg rounded-xl border border-theme-borderSecondary/50 ${className}`}>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <FaSpinner className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
            <p className="text-theme-textSecondary">Loading notifications...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-theme-cardBg rounded-xl border border-theme-borderSecondary/50 ${className}`}>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaBell className="w-6 h-6 text-red-500" />
            </div>
            <p className="text-theme-textPrimary font-medium mb-1">Failed to load notifications</p>
            <p className="text-theme-textSecondary text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!notifications || notifications.length === 0) {
    return (
      <div className={`bg-theme-cardBg rounded-xl border border-theme-borderSecondary/50 ${className}`}>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-theme-bgSecondary rounded-full flex items-center justify-center mx-auto mb-3">
              <FaBell className="w-6 h-6 text-theme-textSecondary" />
            </div>
            <p className="text-theme-textPrimary font-medium mb-1">No notifications</p>
            <p className="text-theme-textSecondary text-sm">You're all caught up!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-theme-cardBg rounded-xl border border-theme-borderSecondary/50 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-theme-borderSecondary/30">
        <h2 className="text-lg font-semibold text-theme-textPrimary">
          Notifications ({notifications.length})
        </h2>
      </div>

      {/* Notification Items */}
      <div className="divide-y divide-theme-borderSecondary/30">
        {notifications.map((notification, index) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkAsRead={onMarkAsRead}
            onDelete={onDelete}
            onClick={onNotificationClick}
            className={index === notifications.length - 1 ? '' : 'border-b border-theme-borderSecondary/20'}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationList;
