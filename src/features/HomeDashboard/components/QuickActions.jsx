import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaCalendarAlt, FaUsers, FaChartBar } from 'react-icons/fa';

// Hook to get screen size for responsive layouts
const useResponsiveQuickActions = () => {
  const [screenSize, setScreenSize] = useState('xl');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setScreenSize('xl'); // 1280px+
      } else if (width >= 1024) {
        setScreenSize('lg'); // 1024px-1279px
      } else if (width >= 768) {
        setScreenSize('md'); // 768px-1023px
      } else {
        setScreenSize('sm'); // <768px
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};

const QuickActions = () => {
  const screenSize = useResponsiveQuickActions();
  
  const actions = [
    {
      title: 'View Demands',
      description: 'Browse active demands',
      path: '/demands',
      icon: FaCalendarAlt,
      color: 'primary'
    },
    {
      title: 'Post Availability',
      description: 'Sell your shares',
      path: '/availability',
      icon: FaUsers,
      color: 'accent-blue'
    },
    {
      title: 'My Quotes',
      description: 'Track your quotes',
      path: '/my-quotes?tab=quotes',
      icon: FaChartBar,
      color: 'accent-purple'
    },
    {
      title: 'My Demands',
      description: 'Track your demands',
      path: '/my-quotes?tab=demands',
      icon: FaPlus,
      color: 'accent-green'
    }
  ];

  // Get responsive grid classes based on screen size
  const getGridClasses = () => {
    switch (screenSize) {
      case 'xl': // 1280px+: 4 cards in 1 row
        return 'grid grid-cols-4 gap-6';
      case 'lg': // 1024px-1279px: 4 cards in 1 row (vertical card layout)
        return 'grid grid-cols-4 gap-4';
      case 'md': // 768px-1023px: 2 rows, 2 cards each
        return 'grid grid-cols-2 gap-4';
      default: // <768px: 2 rows, 2 cards each (icon-less layout)
        return 'grid grid-cols-2 gap-3';
    }
  };

  // Get responsive card layout for each action
  const getActionCard = (action, index) => {
    const baseClasses = "group block";
    
    switch (screenSize) {
      case 'xl': // 1280px+: Horizontal layout (current)
        return (
          <Link key={index} to={action.path} className={baseClasses}>
            <div className="bg-theme-bgSecondary/50 hover:bg-theme-bgSecondary/70 rounded-lg p-6 transition-all duration-200 border border-theme-borderSecondary/50 hover:border-primary/30 hover:shadow-lg">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  action.color === 'primary' ? 'bg-primary/10 text-primary' :
                  action.color === 'accent-blue' ? 'bg-accent-blue/10 text-accent-blue' :
                  action.color === 'accent-green' ? 'bg-accent-green/10 text-accent-green' :
                  action.color === 'accent-purple' ? 'bg-accent-purple/10 text-accent-purple' :
                  'bg-primary/10 text-primary'
                } group-hover:scale-110 transition-transform duration-200`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-theme-textPrimary text-base group-hover:text-primary transition-colors duration-200">
                    {action.title}
                  </h3>
                  <p className="text-theme-textMuted text-sm">
                    {action.description}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        );

      case 'lg': // 1024px-1279px: Vertical layout for better space utilization
        return (
          <Link key={index} to={action.path} className={baseClasses}>
            <div className="bg-theme-bgSecondary/50 hover:bg-theme-bgSecondary/70 rounded-lg p-4 transition-all duration-200 border border-theme-borderSecondary/50 hover:border-primary/30 hover:shadow-lg">
              <div className="flex flex-col items-center text-center">
                {/* Icon and Title Row */}
                <div className="flex items-center justify-between w-full mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    action.color === 'primary' ? 'bg-primary/10 text-primary' :
                    action.color === 'accent-blue' ? 'bg-accent-blue/10 text-accent-blue' :
                    action.color === 'accent-green' ? 'bg-accent-green/10 text-accent-green' :
                    action.color === 'accent-purple' ? 'bg-accent-purple/10 text-accent-purple' :
                    'bg-primary/10 text-primary'
                  } group-hover:scale-110 transition-transform duration-200`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="font-semibold text-theme-textPrimary text-sm group-hover:text-primary transition-colors duration-200 leading-tight">
                      {action.title}
                    </h3>
                  </div>
                </div>
                {/* Description Row */}
                <div className="w-full">
                  <p className="text-theme-textMuted text-xs text-left">
                    {action.description}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        );

      case 'md': // 768px-1023px: Horizontal layout (same as xl but smaller)
        return (
          <Link key={index} to={action.path} className={baseClasses}>
            <div className="bg-theme-bgSecondary/50 hover:bg-theme-bgSecondary/70 rounded-lg p-4 transition-all duration-200 border border-theme-borderSecondary/50 hover:border-primary/30 hover:shadow-lg">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  action.color === 'primary' ? 'bg-primary/10 text-primary' :
                  action.color === 'accent-blue' ? 'bg-accent-blue/10 text-accent-blue' :
                  action.color === 'accent-green' ? 'bg-accent-green/10 text-accent-green' :
                  action.color === 'accent-purple' ? 'bg-accent-purple/10 text-accent-purple' :
                  'bg-primary/10 text-primary'
                } group-hover:scale-110 transition-transform duration-200`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-theme-textPrimary text-sm group-hover:text-primary transition-colors duration-200">
                    {action.title}
                  </h3>
                  <p className="text-theme-textMuted text-xs">
                    {action.description}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        );

      default: // <768px: Clean layout without icons for mobile
        return (
          <Link key={index} to={action.path} className={baseClasses}>
            <div className="bg-theme-bgSecondary/50 hover:bg-theme-bgSecondary/70 rounded-lg p-4 transition-all duration-200 border border-theme-borderSecondary/50 hover:border-primary/30 hover:shadow-lg">
              <div className="text-center">
                <h3 className="font-semibold text-theme-textPrimary text-sm group-hover:text-primary transition-colors duration-200 mb-2">
                  {action.title}
                </h3>
                <p className="text-theme-textMuted text-xs">
                  {action.description}
                </p>
              </div>
            </div>
          </Link>
        );
    }
  };

  return (
    <div className=" mb-8">
      <div className="mb-3 ">
        <h2 className="text-2xl font-bold  text-theme-accentLight">Quick Actions</h2>
      </div>
      
      <div className={getGridClasses()}>
        {actions.map((action, index) => getActionCard(action, index))}
      </div>
    </div>
  );
};

export default QuickActions; 