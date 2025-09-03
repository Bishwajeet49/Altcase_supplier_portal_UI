import React from 'react';
import { 
  FaCheckCircle, 
  FaTimes, 
  FaQuoteLeft, 
  FaHandshake, 
  FaEye, 
  FaClock, 
  FaRupeeSign,
  FaBell,
  FaExclamationTriangle,
  FaInfoCircle
} from 'react-icons/fa';

const NotificationItem = ({ 
  notification, 
  onMarkAsRead, 
  onDelete, 
  onClick,
  className = "" 
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
  };

  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'quote_submitted':
        return <FaQuoteLeft className="w-4 h-4 text-blue-500" />;
      case 'quote_accepted':
        return <FaCheckCircle className="w-4 h-4 text-green-500" />;
      case 'quote_rejected':
        return <FaTimes className="w-4 h-4 text-red-500" />;
      case 'offer_received':
        return <FaHandshake className="w-4 h-4 text-purple-500" />;
      case 'offer_accepted':
        return <FaCheckCircle className="w-4 h-4 text-green-500" />;
      case 'offer_rejected':
        return <FaTimes className="w-4 h-4 text-red-500" />;
      case 'availability_viewed':
        return <FaEye className="w-4 h-4 text-indigo-500" />;
      case 'availability_expired':
      case 'demand_expired':
        return <FaClock className="w-4 h-4 text-orange-500" />;
      case 'deal_completed':
        return <FaCheckCircle className="w-4 h-4 text-green-500" />;
      case 'payment_received':
        return <FaRupeeSign className="w-4 h-4 text-green-600" />;
      case 'system_update':
        return <FaInfoCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <FaBell className="w-4 h-4 text-theme-textSecondary" />;
    }
  };

  const getPriorityColor = () => {
    switch (notification.priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-orange-500';
      case 'low':
        return 'border-l-blue-500';
      default:
        return 'border-l-theme-borderSecondary';
    }
  };

  const getNotificationContent = () => {
    const { data } = notification;
    
    switch (notification.type) {
      case 'quote_accepted':
      case 'quote_submitted':
      case 'quote_rejected':
        return (
          <div className="space-y-1">
            <p className="text-sm text-theme-textSecondary">{data?.companyName}</p>
            <p className="text-sm font-medium text-theme-textPrimary">
              Amount: {formatCurrency(data?.quoteAmount)}
            </p>
            {data?.buyerName && (
              <p className="text-xs text-theme-textSecondary">Buyer: {data.buyerName}</p>
            )}
          </div>
        );
      
      case 'offer_received':
      case 'offer_accepted':
      case 'offer_rejected':
        return (
          <div className="space-y-1">
            <p className="text-sm text-theme-textSecondary">{data?.companyName}</p>
            <p className="text-sm font-medium text-theme-textPrimary">
              Offer: {formatCurrency(data?.offerAmount)}
            </p>
            {data?.buyerName && (
              <p className="text-xs text-theme-textSecondary">From: {data.buyerName}</p>
            )}
          </div>
        );
      
      case 'availability_viewed':
        return (
          <div className="space-y-1">
            <p className="text-sm text-theme-textSecondary">{data?.companyName}</p>
            <p className="text-sm font-medium text-theme-textPrimary">
              {data?.viewCount} views • {data?.quantity} shares
            </p>
          </div>
        );
      
      case 'deal_completed':
        return (
          <div className="space-y-1">
            <p className="text-sm text-theme-textSecondary">{data?.companyName}</p>
            <p className="text-sm font-medium text-green-600">
              {formatCurrency(data?.dealAmount)}
            </p>
            {data?.buyerName && (
              <p className="text-xs text-theme-textSecondary">With: {data.buyerName}</p>
            )}
          </div>
        );
      
      case 'payment_received':
        return (
          <div className="space-y-1">
            <p className="text-sm font-medium text-green-600">
              {formatCurrency(data?.amount)}
            </p>
            <p className="text-xs text-theme-textSecondary">
              Transaction ID: {data?.transactionId}
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  const handleMarkAsRead = (e) => {
    e.stopPropagation();
    if (onMarkAsRead && !notification.isRead) {
      onMarkAsRead(notification.id);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(notification.id);
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick(notification);
    }
    // Auto mark as read when clicked
    if (onMarkAsRead && !notification.isRead) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <div
      className={`
        bg-theme-cardBg border-l-4 ${getPriorityColor()} 
        hover:bg-theme-bgSecondary transition-all duration-200 
        cursor-pointer group relative
        ${!notification.isRead ? 'bg-opacity-95 shadow-sm' : 'opacity-90'}
        ${className}
      `}
      onClick={handleClick}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-3 flex-1">
            {/* Icon */}
            <div className={`
              w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
              ${!notification.isRead ? 'bg-primary/10' : 'bg-theme-bgTertiary'}
            `}>
              {getNotificationIcon()}
            </div>
            
            {/* Title and timestamp */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className={`
                  text-sm font-medium truncate
                  ${!notification.isRead ? 'text-theme-textPrimary' : 'text-theme-textSecondary'}
                `}>
                  {notification.title}
                </h4>
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                )}
              </div>
              <p className="text-xs text-theme-textSecondary">
                {formatDate(notification.createdAt)}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {!notification.isRead && (
              <button
                onClick={handleMarkAsRead}
                className="p-1 text-theme-textSecondary hover:text-primary transition-colors"
                title="Mark as read"
              >
                <FaCheckCircle className="w-3 h-3" />
              </button>
            )}
            <button
              onClick={handleDelete}
              className="p-1 text-theme-textSecondary hover:text-red-500 transition-colors"
              title="Delete notification"
            >
              <FaTimes className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Message */}
        <p className="text-sm text-theme-textSecondary mb-2 leading-relaxed">
          {notification.message}
        </p>

        {/* Additional Content */}
        {getNotificationContent()}
      </div>
    </div>
  );
};

export default NotificationItem;
