import React from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';
import SidebarLink from './SidebarLink';
import SidebarSubmenu from './SidebarSubmenu';

const SidebarItem = ({ item, index, isActive, hasChildren, isOpen, toggleSubmenu, location }) => {
  return (
    <div className="group">
      {/* Main menu item */}
      {hasChildren ? (
        <button
          onClick={() => toggleSubmenu(index)}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all  ${
            isActive 
              ? 'bg-primary text-white' 
              : 'text-theme-textSecondary hover:bg-theme-bgSecondary hover:text-primary group-hover:bg-theme-bgSecondary group-hover:text-primary'
          }`}
        >
          <div className="flex items-center">
            <div className={`w-8 h-8 flex items-center justify-center rounded-lg mr-3 ${isActive ? 'text-white' : 'text-theme-textSecondary group-hover:text-primary'}`}>
              <item.icon className="w-5 h-5" />
            </div>
            <span className="font-medium">{item.label}</span>
          </div>
          <RiArrowRightSLine 
            className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-90' : ''}`} 
          />
        </button>
      ) : (
        <SidebarLink item={item} isActive={isActive} />
      )}

      {/* Submenu for items with children */}
      {hasChildren && isOpen && (
        <SidebarSubmenu item={item} isOpen={isOpen} location={location} />
      )}
    </div>
  );
};

export default SidebarItem; 