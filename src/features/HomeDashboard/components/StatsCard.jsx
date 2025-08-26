import React from 'react';
import { FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle, FaCalendarCheck, FaHistory } from 'react-icons/fa';

const StatsCard = ({ type, title, value, description, isLoading = false }) => {
  // Define icon styles based on type
  const getIconStyles = () => {
    const baseStyles = "w-16 h-16 rounded-xl flex items-center justify-center";
    
    switch (type) {
      case 'total':
        return `${baseStyles} bg-primary/15 text-primary`;
      case 'pending':
        return `${baseStyles} bg-accent-yellow/15 text-accent-yellow`;
      case 'approved':
        return `${baseStyles} bg-accent-green/15 text-accent-green`;
      case 'rejected':
        return `${baseStyles} bg-red-500/15 text-red-500`;
      case 'upcoming':
        return `${baseStyles} bg-accent-blue/15 text-accent-blue`;
      case 'past':
        return `${baseStyles} bg-theme-textMuted/15 text-theme-textMuted`;
      default:
        return `${baseStyles} bg-primary/15 text-primary`;
    }
  };

  // Define value styles based on type
  const getValueStyles = () => {
    const baseStyles = "text-4xl font-bold";
    
    switch (type) {
      case 'total':
        return `${baseStyles} text-primary`;
      case 'pending':
        return `${baseStyles} text-accent-yellow`;
      case 'approved':
        return `${baseStyles} text-accent-green`;
      case 'rejected':
        return `${baseStyles} text-red-500`;
      case 'upcoming':
        return `${baseStyles} text-accent-blue`;
      case 'past':
        return `${baseStyles} text-theme-textMuted`;
      default:
        return `${baseStyles} text-primary`;
    }
  };

  // Get icon component with appropriate size
  const getIcon = () => {
    const iconClass = "w-8 h-8";
    
    switch (type) {
      case 'total':
        return <FaCalendarAlt className={iconClass} />;
      case 'pending':
        return <FaClock className={iconClass} />;
      case 'approved':
        return <FaCheckCircle className={iconClass} />;
      case 'rejected':
        return <FaTimesCircle className={iconClass} />;
      case 'upcoming':
        return <FaCalendarCheck className={iconClass} />;
      case 'past':
        return <FaHistory className={iconClass} />;
      default:
        return <FaCalendarAlt className={iconClass} />;
    }
  };

  // Define card background based on type
  const getCardBackground = () => {
    switch (type) {
      case 'total':
        return 'bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20';
      case 'pending':
        return 'bg-gradient-to-br from-accent-yellow/5 to-accent-yellow/10 border-accent-yellow/20';
      case 'approved':
        return 'bg-gradient-to-br from-accent-green/5 to-accent-green/10 border-accent-green/20';
      case 'rejected':
        return 'bg-gradient-to-br from-red-500/5 to-red-500/10 border-red-500/20';
      case 'upcoming':
        return 'bg-gradient-to-br from-accent-blue/5 to-accent-blue/10 border-accent-blue/20';
      case 'past':
        return 'bg-gradient-to-br from-theme-textMuted/5 to-theme-textMuted/10 border-theme-textMuted/20';
      default:
        return 'bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20';
    }
  };

  if (isLoading) {
    return (
      <div className="h-32 bg-theme-bgSecondary/30 rounded-xl p-6 border border-theme-borderSecondary/50 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="w-16 h-16 bg-theme-textMuted/20 rounded-xl"></div>
          <div className="w-20 h-10 bg-theme-textMuted/20 rounded"></div>
        </div>
        <div className="mt-4">
          <div className="w-28 h-6 bg-theme-textMuted/20 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-32 rounded-xl p-6 border ${getCardBackground()} flex items-center justify-between`}>
      <div className="flex items-center gap-4">
        <div className={getIconStyles()}>
          {getIcon()}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-theme-textPrimary">
            {title}
          </h3>
        </div>
      </div>
      
      <div className={getValueStyles()}>
        {value}
      </div>
    </div>
  );
};

export default StatsCard; 