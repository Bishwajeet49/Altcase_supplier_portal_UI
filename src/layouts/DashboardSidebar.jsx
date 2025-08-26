import React from 'react'
import FullyExpandedSidebar from './FullyExpandedSidebar.jsx';
import MiniSidebar from './MiniSidebar.jsx';
export default function DashboardSidebar({showMiniSidebar}) {
  return (
    <div className='h-full w-full'>
        <div className="w-full h-full">
            {showMiniSidebar ? <MiniSidebar /> : <FullyExpandedSidebar />}
        </div>
    </div>
  )
}
