import React from 'react';
import { FaCheckDouble, FaTrash, FaSync } from 'react-icons/fa';

const NotificationActions = ({ 
  onMarkAllAsRead,
  onRefresh,
  onClearAll,
  isLoading = false,
  unreadCount = 0,
  className = ""
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {/* Mark All as Read */}
      <button
        onClick={onMarkAllAsRead}
        disabled={isLoading || unreadCount === 0}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow-md"
      >
        <FaCheckDouble className="w-4 h-4" />
        Mark All Read
        {unreadCount > 0 && (
          <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

    

      {/* Clear All (with confirmation) */}
      <button
        onClick={onClearAll}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 hover:border-red-300"
      >
        <FaTrash className="w-4 h-4" />
        Clear All
      </button>
    </div>
  );
};

export default NotificationActions;
