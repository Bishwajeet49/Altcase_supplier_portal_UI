import React, { useState } from 'react'
import { sidebarItems } from '../config/sidebarItems'
import { useLocation } from 'react-router-dom'
import SidebarItemsList from '../components/sidebar/SidebarItemsList'
import SidebarHeader from '../components/sidebar/SidebarHeader'
import { isItemActive as checkIsItemActive } from '../components/sidebar/sidebarUtils'

export default function FullyExpandedSidebarBelowXl({showMiniSidebar, setShowMiniSidebar}) {
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
      {/* On small screens, keep sidebar hidden by default. When showMiniSidebar is true, slide it in. */}
      <div className={`absolute top-0 left-0 bottom-0 w-64 h-full bg-theme-bgPrimary block xl:hidden z-[45] transition-transform duration-300 ease-in-out ${showMiniSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="py-0">
        {/* Logo is hidden by default, set isVisible to true to show it */}
        <SidebarHeader isVisible={true} showMiniSidebar={showMiniSidebar} setShowMiniSidebar={setShowMiniSidebar} />

        <div className='w-full py-6 overflow-y-auto  h-[calc(100vh-4rem)]'>
        <SidebarItemsList 
          items={sidebarItems} 
          openSubmenu={openSubmenu} 
          toggleSubmenu={toggleSubmenu}
          isItemActive={isItemActive}
          location={location}
        />
        </div>
      </div>
    </div>
    </>
  
  );
}

