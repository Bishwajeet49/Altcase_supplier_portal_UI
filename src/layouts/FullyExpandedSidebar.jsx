import React, { useState } from 'react'
import { sidebarItems } from '../config/sidebarItems'
import { useLocation } from 'react-router-dom'
import SidebarItemsList from '../components/sidebar/SidebarItemsList'
import SidebarHeader from '../components/sidebar/SidebarHeader'
import { isItemActive as checkIsItemActive } from '../components/sidebar/sidebarUtils'

export default function FullyExpandedSidebar() {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const isItemActive = (item) => {
    return checkIsItemActive(item, location.pathname);
  };

  const toggleSubmenu = (index) => {
    if (openSubmenu === index) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(index);
    }
  };

  return (
    <>
      <div className=' w-64 h-full bg-theme-bgPrimary overflow-y-auto hidden xl:block'>
      <div className="py-6">
        {/* Logo is hidden by default, set isVisible to true to show it */}
        <SidebarHeader isVisible={false} />

        <SidebarItemsList 
          items={sidebarItems} 
          openSubmenu={openSubmenu} 
          toggleSubmenu={toggleSubmenu}
          isItemActive={isItemActive}
          location={location}
        />
        
      </div>
    </div>
    </>
  
  );
}
