import React from 'react';
import { 
  FaClock, 
  FaRupeeSign, 
  FaTrash, 
  FaEdit,
  FaHourglassHalf,
  FaSyncAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
  FaFileAlt,
  FaHandshake,
  FaPause
} from 'react-icons/fa';

const AvailabilityCard = ({ availability, onUpdateStatus, onDelete, onEdit, onViewOffers }) => {
  const {
    id,
    companyName,
    sector,
    quantity,
    pricePerShare,
    postedAt,
    validity,
    status
  } = availability;

  // Format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    const statusConfig = {
      'active': {
        icon: <FaCheckCircle className="w-3 h-3" />,
        text: 'Active',
        className: 'bg-green-500 text-white'
      },
      'pending': {
        icon: <FaHourglassHalf className="w-3 h-3" />,
        text: 'Pending',
        className: 'bg-orange-500 text-white'
      },
      'processing': {
        icon: <FaSyncAlt className="w-3 h-3" />,
        text: 'Processing',
        className: 'bg-blue-500 text-white'
      },
      'paused': {
        icon: <FaPause className="w-3 h-3" />,
        text: 'Paused',
        className: 'bg-yellow-500 text-white'
      },
      'sold': {
        icon: <FaHandshake className="w-3 h-3" />,
        text: 'Sold',
        className: 'bg-purple-500 text-white'
      },
      'expired': {
        icon: <FaTimesCircle className="w-3 h-3" />,
        text: 'Expired',
        className: 'bg-red-500 text-white'
      }
    };

    const config = statusConfig[status] || statusConfig['pending'];
    return (
      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
        {config.icon}
        <span>{config.text}</span>
      </div>
    );
  };

  // Check if card should show action buttons
  const shouldShowActions = ['active', 'pending', 'paused'].includes(status);

  return (
    <div className="bg-theme-cardBg rounded-xl border border-primary/30 transition-all duration-300 hover:shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-bold text-theme-textSecondary text-xl mb-1">{companyName}</h3>
            <p className="text-green-200 text-sm">{sector}</p>
          </div>
          {getStatusBadge(status)}
        </div>
      </div>

      {/* Details */}
      <div className="px-4 pb-4 space-y-3">
        {/* Quantity */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-theme-textSecondary">
            <FaFileAlt className="w-4 h-4 text-green-300" />
            <span className="text-sm font-medium">Quantity</span>
          </div>
          <span className="font-semibold text-theme-textSecondary">{quantity.toLocaleString()} shares</span>
        </div>

        {/* Posted Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-theme-textSecondary">
            <FaRupeeSign className="w-4 h-4 text-green-300" />
            <span className="text-sm font-medium">Posted Price</span>
          </div>
          <span className="font-semibold text-theme-textSecondary">₹{pricePerShare.toLocaleString()}</span>
        </div>

        {/* Posted Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-theme-textSecondary">
            <FaCalendarAlt className="w-4 h-4 text-green-300" />
            <span className="text-sm font-medium">Posted on</span>
          </div>
          <span className="text-sm text-theme-textSecondary">{formatDate(postedAt)}</span>
        </div>

        {/* Validity */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-theme-textSecondary">
            <FaClock className="w-4 h-4 text-green-300" />
            <span className="text-sm font-medium">Valid until</span>
          </div>
          <span className="text-sm text-theme-textSecondary">{formatDate(validity)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      {shouldShowActions && (
        <div className="p-4 border-t border-green-700">
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(availability)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-green-500 text-green-400 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <FaEdit className="w-4 h-4" />
              <span className="text-sm font-medium">Edit</span>
            </button>
            <button
              onClick={() => onDelete(id)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-red-500 text-red-400 rounded-lg hover:bg-red-900 transition-colors duration-200"
            >
              <FaTrash className="w-4 h-4" />
              <span className="text-sm font-medium">Delete</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailabilityCard;
