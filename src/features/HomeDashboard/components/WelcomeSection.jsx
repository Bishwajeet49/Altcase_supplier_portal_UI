import React from 'react';
import { FaSun, FaMoon, FaCloud } from 'react-icons/fa';

const WelcomeSection = ({ userName = "Organizer" }) => {
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getTimeIcon = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) {
      return <FaSun className="w-5 h-5 text-accent-yellow" />;
    } else {
      return <FaMoon className="w-5 h-5 text-theme-textSecondary" />;
    }
  };

  return (
    <div className="bg-theme-accentLight/5 rounded-xl p-6 mb-6 border border-theme-borderPrimary">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <div className="flex items-center gap-3 mb-2">
            {getTimeIcon()}
            <h1 className="text-2xl sm:text-3xl font-bold text-theme-textPrimary">
              {getGreeting()}, {userName}! 👋
            </h1>
          </div>
          <p className="text-theme-textSecondary text-sm sm:text-base">
          Track your quotes, explore new demands, and manage your unlisted share deals with Altcase.
          </p>
        </div>
        
        <div className="flex flex-col items-start sm:items-end gap-1">
          <div className="flex items-center gap-2 text-theme-textSecondary">
            <FaCloud className="w-4 h-4" />
            <span className="text-sm font-medium">{getCurrentTime()}</span>
          </div>
          <p className="text-theme-textMuted text-sm">{getCurrentDate()}</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection; 