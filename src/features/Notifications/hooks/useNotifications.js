import { useState, useEffect, useCallback } from 'react';
import notificationsService, { NOTIFICATION_CATEGORIES } from '../notifications.service';

export const useNotifications = (initialFilters = {}) => {
  const [notifications, setNotifications] = useState([]);
  const [notificationCounts, setNotificationCounts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: NOTIFICATION_CATEGORIES.ALL,
    isRead: undefined,
    page: 1,
    limit: 20,
    ...initialFilters
  });

  // Fetch notifications based on current filters
  const fetchNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await notificationsService.getNotifications(filters);
      
      if (response.success) {
        setNotifications(response.data.notifications);
      } else {
        setError(response.error || 'Failed to fetch notifications');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  // Fetch notification counts
  const fetchNotificationCounts = useCallback(async () => {
    try {
      const response = await notificationsService.getNotificationCounts();
      
      if (response.success) {
        setNotificationCounts(response.data);
      }
    } catch (err) {
      console.error('Error fetching notification counts:', err);
    }
  }, []);

  // Mark notification as read
  const markAsRead = useCallback(async (notificationId) => {
    try {
      const response = await notificationsService.markAsRead(notificationId);
      
      if (response.success) {
        setNotifications(prev => 
          prev.map(notification => 
            notification.id === notificationId 
              ? { ...notification, isRead: true }
              : notification
          )
        );
        
        // Update counts
        setNotificationCounts(prev => prev ? {
          ...prev,
          totalUnread: Math.max(0, prev.totalUnread - 1)
        } : null);
        
        // Refresh counts for accuracy
        fetchNotificationCounts();
      }
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  }, [fetchNotificationCounts]);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async (category = null) => {
    try {
      const response = await notificationsService.markAllAsRead(category);
      
      if (response.success) {
        setNotifications(prev => 
          prev.map(notification => ({ ...notification, isRead: true }))
        );
        
        // Refresh data
        fetchNotifications();
        fetchNotificationCounts();
      }
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  }, [fetchNotifications, fetchNotificationCounts]);

  // Delete notification
  const deleteNotification = useCallback(async (notificationId) => {
    try {
      const response = await notificationsService.deleteNotification(notificationId);
      
      if (response.success) {
        setNotifications(prev => 
          prev.filter(notification => notification.id !== notificationId)
        );
        
        // Refresh counts
        fetchNotificationCounts();
      }
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  }, [fetchNotificationCounts]);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Refresh notifications
  const refresh = useCallback(() => {
    fetchNotifications();
    fetchNotificationCounts();
  }, [fetchNotifications, fetchNotificationCounts]);

  // Clear all notifications (with confirmation)
  const clearAllNotifications = useCallback(async () => {
    if (window.confirm('Are you sure you want to delete all notifications? This action cannot be undone.')) {
      try {
        // Delete all current notifications
        const deletePromises = notifications.map(notification => 
          notificationsService.deleteNotification(notification.id)
        );
        
        await Promise.all(deletePromises);
        
        // Refresh data
        refresh();
      } catch (err) {
        console.error('Error clearing all notifications:', err);
      }
    }
  }, [notifications, refresh]);

  // Initial data fetch
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    fetchNotificationCounts();
  }, [fetchNotificationCounts]);

  return {
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
  };
};
