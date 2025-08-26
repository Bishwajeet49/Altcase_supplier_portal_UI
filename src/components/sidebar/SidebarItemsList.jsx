import React from 'react';
import SidebarItem from './SidebarItem';

const SidebarItemsList = ({ items, openSubmenu, toggleSubmenu, isItemActive, location }) => {
  return (
    <div className="space-y-1.5 px-3">
      {items.map((item, index) => {
        const isActive = isItemActive(item);
        const hasChildren = item.children && item.children.length > 0;
        const isOpen = openSubmenu === index;
        
        return (
          <SidebarItem 
            key={index}
            item={item} 
            index={index}
            isActive={isActive}
            hasChildren={hasChildren}
            isOpen={isOpen}
            toggleSubmenu={toggleSubmenu}
            location={location}
          />
        );
      })}
    </div>
  );
};

export default SidebarItemsList; 