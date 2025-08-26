import React, { useState, useRef, useEffect } from 'react'
import { sidebarItems } from '../config/sidebarItems'
import { useLocation, Link } from 'react-router-dom'

export default function MiniSidebar() {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);
  const timeoutRef = useRef(null);
  const dropdownRefs = useRef({});

  const isItemActive = (item) => {
    if (item.path && location.pathname.includes(item.path)) {
      return true;
    }
    
    if (item.children) {
      return item.children.some(child => child.path && location.pathname.includes(child.path));
    }
    
    return false;
  };

  const handleMouseEnter = (index) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 100);
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    //this is the mini sidebar, will be used in the dashbord layout above md screen size
    <div className='w-24 h-full bg-theme-bgPrimary overflow-y-auto hidden md:block'>
      <div className="flex flex-col items-center pt-6 pb-4">
     

        {/* Navigation items */}
        <div className="flex flex-col items-center space-y-6 w-full px-2">
          {sidebarItems.map((item, index) => {
            const isActive = isItemActive(item);
            
            return (
              <div 
                key={index} 
                className="relative w-full"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                ref={el => dropdownRefs.current[index] = el}
              >
                {/* Main item */}
                {item.path ? (
                  <Link to={item.path} className="flex flex-col items-center w-full group">
                    <div className={`flex items-center justify-center w-14 h-14 ${isActive ? 'bg-primary text-white' : 'text-theme-textSecondary group-hover:text-primary group-hover:bg-theme-bgSecondary'} rounded-xl transition-all duration-200 mx-auto`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs mt-1 text-center ${isActive ? 'text-primary font-medium' : 'text-theme-textSecondary group-hover:text-primary'} break-words w-full transition-colors duration-200`}>
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <div className="flex flex-col items-center cursor-pointer w-full group">
                    <div className={`flex items-center justify-center w-14 h-14 ${isActive ? 'bg-primary text-white' : 'text-theme-textSecondary group-hover:text-primary group-hover:bg-theme-bgSecondary'} rounded-xl transition-all duration-200 mx-auto`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs mt-1 text-center ${isActive ? 'text-primary font-medium' : 'text-theme-textSecondary group-hover:text-primary'} break-words w-full transition-colors duration-200`}>
                      {item.label}
                    </span>
                  </div>
                )}

                {/* Dropdown for items with children */}
                {item.children && hoveredItem === index && (
                  <div 
                    className="fixed left-24 bg-theme-bgSecondary shadow-card rounded-lg p-3 z-50 border border-theme-borderSecondary min-w-60 whitespace-nowrap"
                    style={{ top: `${dropdownRefs.current[index]?.getBoundingClientRect().top}px` }}
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Triangle indicator */}
                    <div className="absolute left-0 top-6 transform -translate-x-2">
                      <div className="w-2 h-2 bg-theme-bgSecondary rotate-45 border-l border-b border-theme-borderSecondary"></div>
                    </div>
                    
                    <div className="flex flex-col space-y-1">
                      <h3 className="text-theme-textPrimary font-medium text-sm px-2 mb-1">{item.label}</h3>
                      <div className="h-px bg-theme-borderSecondary mb-1"></div>
                      {item.children.map((child, childIndex) => (
                        <Link 
                          key={childIndex} 
                          to={child.path}
                          className="flex items-center px-3 py-2.5 rounded-md text-sm group/child hover:bg-theme-bgTertiary"
                        >
                          <child.icon className={`w-4 h-4 min-w-4 mr-3 ${location.pathname.includes(child.path) ? 'text-primary' : 'text-theme-textSecondary group-hover/child:text-primary'}`} />
                          <span className={`truncate ${location.pathname.includes(child.path) ? 'text-primary font-medium' : 'text-theme-textSecondary group-hover/child:text-primary'}`}>{child.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
