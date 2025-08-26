

import React from 'react'
import FullyExpandedSidebarBelowXl from './FullyExpandedSidebarBelowXl.jsx';
import MiniSidebar from './MiniSidebar.jsx';
export default function DashboardSidebarBelowXl({showMiniSidebar, setShowMiniSidebar}) {
  return (
    <div className='h-full w-full'>
        <div className="w-full h-full">
            <MiniSidebar /> 
            <FullyExpandedSidebarBelowXl showMiniSidebar={showMiniSidebar} setShowMiniSidebar={setShowMiniSidebar} />
        </div>
    </div>
  )
}

