import React from 'react';
import { Link } from 'react-router-dom';

const SidebarSubmenu = ({ item, isOpen, location }) => {
  // Function to check if a menu item should be active
  const isPathActive = (itemPath, currentPath) => {
    // Simple exact match - this is the safest approach
    if (itemPath === currentPath) {
      return true;
    }
    // Check if currentPath is a subpath of itemPath
    // return currentPath.startsWith(itemPath) && currentPath.charAt(itemPath.length) === '/';
  };

  return (
    <div className="relative mt-2 ml-7 space-y-1 pb-1 ">
      {/* Vertical line */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-theme-borderSecondary rounded-full "></div>
      
      <div className="pl-6">
        {item.children.map((child, childIndex) => {
          const isActive = isPathActive(child.path, location.pathname);
          
          return (
            
            <Link
              key={childIndex}
              to={child.path}
              className={`flex items-center px-3 py-2 rounded-md text-sm group/child relative ${
                isActive
                  ? 'text-primary bg-primary bg-opacity-10 font-medium'
                  : 'text-theme-textSecondary hover:text-primary hover:bg-theme-bgSecondary'
              }`}
            >
              {/* Horizontal connector */}
              <div className="absolute left-0 top-1/2 w-3 h-0.5 bg-theme-borderSecondary -translate-x-3 -translate-y-1/2"></div>
              
              <child.icon className={`w-4 h-4 mr-3 ${!isActive && 'group-hover/child:text-primary'}`} />
              <span className={`${!isActive && 'group-hover/child:text-primary'}`}>{child.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarSubmenu; 