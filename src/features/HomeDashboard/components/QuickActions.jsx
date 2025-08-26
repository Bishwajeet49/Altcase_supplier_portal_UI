import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaCalendarAlt, FaUsers, FaChartBar } from 'react-icons/fa';

const QuickActions = () => {
  const actions = [
    {
      title: 'View Demands',
      description: 'Browse active demands',
      path: '/active-demands',
      icon: FaCalendarAlt,
      color: 'primary'
    },
    {
      title: 'Submit Quote',
      description: 'Quote on demands',
      path: '/submit-quote',
      icon: FaPlus,
      color: 'accent-green'
    },
    {
      title: 'Post Availability',
      description: 'Sell your shares',
      path: '/post-availability',
      icon: FaUsers,
      color: 'accent-blue'
    },
    {
      title: 'My Quotes',
      description: 'Track your quotes',
      path: '/my-quotes',
      icon: FaChartBar,
      color: 'accent-purple'
    }
  ];

  return (
    <div className="py-8 mb-8">
      <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-3 text-theme-accentLight">Quick Actions</h2>

      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action, index) => (
          <Link 
            key={index} 
            to={action.path}
            className="group block"
          >
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
        ))}
      </div>
    </div>
  );
};

export default QuickActions; 