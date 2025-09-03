// Notification types
export const NOTIFICATION_TYPES = {
  QUOTE_SUBMITTED: 'quote_submitted',
  QUOTE_ACCEPTED: 'quote_accepted',
  QUOTE_REJECTED: 'quote_rejected',
  OFFER_RECEIVED: 'offer_received',
  OFFER_ACCEPTED: 'offer_accepted',
  OFFER_REJECTED: 'offer_rejected',
  DEMAND_EXPIRED: 'demand_expired',
  AVAILABILITY_VIEWED: 'availability_viewed',
  AVAILABILITY_EXPIRED: 'availability_expired',
  DEAL_COMPLETED: 'deal_completed',
  PAYMENT_RECEIVED: 'payment_received',
  SYSTEM_UPDATE: 'system_update'
};

// Notification categories
export const NOTIFICATION_CATEGORIES = {
  QUOTES: 'quotes',
  OFFERS: 'offers',
  AVAILABILITY: 'availability',
  SYSTEM: 'system',
  ALL: 'all'
};

// Dummy notification data
const dummyNotifications = [
  {
    id: '1',
    type: NOTIFICATION_TYPES.QUOTE_ACCEPTED,
    category: NOTIFICATION_CATEGORIES.QUOTES,
    title: 'Quote Accepted!',
    message: 'Your quote for Reliance Industries shares has been accepted by the buyer.',
    data: {
      companyName: 'Reliance Industries',
      quoteAmount: 2850000,
      quantity: 1000,
      buyerName: 'Mutual Fund XYZ'
    },
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    priority: 'high'
  },
  {
    id: '2',
    type: NOTIFICATION_TYPES.OFFER_RECEIVED,
    category: NOTIFICATION_CATEGORIES.OFFERS,
    title: 'New Offer Received',
    message: 'You received a new offer on your posted availability for TCS shares.',
    data: {
      companyName: 'Tata Consultancy Services',
      offerAmount: 3200000,
      quantity: 800,
      buyerName: 'Investment Corp ABC'
    },
    isRead: false,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    priority: 'high'
  },
  {
    id: '3',
    type: NOTIFICATION_TYPES.QUOTE_SUBMITTED,
    category: NOTIFICATION_CATEGORIES.QUOTES,
    title: 'Quote Submitted Successfully',
    message: 'Your quote for HDFC Bank shares has been submitted to the buyer.',
    data: {
      companyName: 'HDFC Bank',
      quoteAmount: 1850000,
      quantity: 1200,
      buyerName: 'Portfolio Management Ltd'
    },
    isRead: true,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    priority: 'medium'
  },
  {
    id: '4',
    type: NOTIFICATION_TYPES.AVAILABILITY_VIEWED,
    category: NOTIFICATION_CATEGORIES.AVAILABILITY,
    title: 'Your Availability was Viewed',
    message: 'Your posted availability for Infosys shares was viewed by 3 potential buyers.',
    data: {
      companyName: 'Infosys',
      quantity: 500,
      viewCount: 3
    },
    isRead: true,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    priority: 'low'
  },
  {
    id: '5',
    type: NOTIFICATION_TYPES.OFFER_REJECTED,
    category: NOTIFICATION_CATEGORIES.OFFERS,
    title: 'Offer Rejected',
    message: 'Your offer for Wipro shares was rejected by the seller.',
    data: {
      companyName: 'Wipro',
      offerAmount: 950000,
      quantity: 2000,
      rejectionReason: 'Price too low'
    },
    isRead: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    priority: 'medium'
  },
  {
    id: '6',
    type: NOTIFICATION_TYPES.DEAL_COMPLETED,
    category: NOTIFICATION_CATEGORIES.QUOTES,
    title: 'Deal Completed!',
    message: 'Your deal for ICICI Bank shares has been successfully completed.',
    data: {
      companyName: 'ICICI Bank',
      dealAmount: 2100000,
      quantity: 2500,
      buyerName: 'Pension Fund DEF'
    },
    isRead: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    priority: 'high'
  },
  {
    id: '7',
    type: NOTIFICATION_TYPES.PAYMENT_RECEIVED,
    category: NOTIFICATION_CATEGORIES.SYSTEM,
    title: 'Payment Received',
    message: 'Payment of ₹21,00,000 has been credited to your account for ICICI Bank deal.',
    data: {
      amount: 2100000,
      transactionId: 'TXN123456789',
      companyName: 'ICICI Bank'
    },
    isRead: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 - 2 * 60 * 60 * 1000).toISOString(), // 2 days 2 hours ago
    priority: 'high'
  },
  {
    id: '8',
    type: NOTIFICATION_TYPES.DEMAND_EXPIRED,
    category: NOTIFICATION_CATEGORIES.QUOTES,
    title: 'Demand Expired',
    message: 'The demand for SBI shares you quoted on has expired without selection.',
    data: {
      companyName: 'State Bank of India',
      demandAmount: 1200000,
      quantity: 3000
    },
    isRead: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    priority: 'low'
  },
  {
    id: '9',
    type: NOTIFICATION_TYPES.SYSTEM_UPDATE,
    category: NOTIFICATION_CATEGORIES.SYSTEM,
    title: 'Platform Maintenance',
    message: 'Scheduled maintenance will occur tonight from 12:00 AM to 2:00 AM IST.',
    data: {
      maintenanceStart: '2024-01-15T18:30:00.000Z',
      maintenanceEnd: '2024-01-15T20:30:00.000Z'
    },
    isRead: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    priority: 'medium'
  },
  {
    id: '10',
    type: NOTIFICATION_TYPES.AVAILABILITY_EXPIRED,
    category: NOTIFICATION_CATEGORIES.AVAILABILITY,
    title: 'Availability Expired',
    message: 'Your posted availability for Bharti Airtel shares has expired.',
    data: {
      companyName: 'Bharti Airtel',
      quantity: 1500,
      expiryDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    isRead: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    priority: 'low'
  }
];

class NotificationsService {
  constructor() {
    this.notifications = [...dummyNotifications];
  }

  // Get all notifications with optional filtering
  async getNotifications(filters = {}) {
    try {
      let filteredNotifications = [...this.notifications];

      // Filter by category
      if (filters.category && filters.category !== NOTIFICATION_CATEGORIES.ALL) {
        filteredNotifications = filteredNotifications.filter(
          notification => notification.category === filters.category
        );
      }

      // Filter by read status
      if (filters.isRead !== undefined) {
        filteredNotifications = filteredNotifications.filter(
          notification => notification.isRead === filters.isRead
        );
      }

      // Filter by priority
      if (filters.priority) {
        filteredNotifications = filteredNotifications.filter(
          notification => notification.priority === filters.priority
        );
      }

      // Sort by creation date (newest first)
      filteredNotifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // Pagination
      const page = filters.page || 1;
      const limit = filters.limit || 20;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      const paginatedNotifications = filteredNotifications.slice(startIndex, endIndex);

      return {
        success: true,
        data: {
          notifications: paginatedNotifications,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(filteredNotifications.length / limit),
            totalItems: filteredNotifications.length,
            hasNextPage: endIndex < filteredNotifications.length,
            hasPreviousPage: page > 1
          }
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get notification counts by category and status
  async getNotificationCounts() {
    try {
      const unreadCount = this.notifications.filter(n => !n.isRead).length;
      const categoryCount = {};

      Object.values(NOTIFICATION_CATEGORIES).forEach(category => {
        if (category === NOTIFICATION_CATEGORIES.ALL) return;
        
        categoryCount[category] = {
          total: this.notifications.filter(n => n.category === category).length,
          unread: this.notifications.filter(n => n.category === category && !n.isRead).length
        };
      });

      return {
        success: true,
        data: {
          totalUnread: unreadCount,
          total: this.notifications.length,
          categories: categoryCount
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Mark notification as read
  async markAsRead(notificationId) {
    try {
      const notification = this.notifications.find(n => n.id === notificationId);
      if (notification) {
        notification.isRead = true;
      }
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Mark all notifications as read
  async markAllAsRead(category = null) {
    try {
      this.notifications.forEach(notification => {
        if (!category || notification.category === category) {
          notification.isRead = true;
        }
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Delete notification
  async deleteNotification(notificationId) {
    try {
      const index = this.notifications.findIndex(n => n.id === notificationId);
      if (index !== -1) {
        this.notifications.splice(index, 1);
      }
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get single notification by ID
  async getNotificationById(notificationId) {
    try {
      const notification = this.notifications.find(n => n.id === notificationId);
      return {
        success: true,
        data: notification
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default new NotificationsService();
