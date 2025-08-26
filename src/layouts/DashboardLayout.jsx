import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import DashboardNavbar from './DashboardNavbar'
import DashboardSidebar from './DashboardSidebar'
import DashboardSidebarBelowXl from './DashboardSidebarBelowXl.jsx'

export default function DashboardLayout() {
  const [showMiniSidebar, setShowMiniSidebar] = useState(false)
  const location = useLocation()

  // Hide sidebar automatically on route change
  useEffect(() => {
    setShowMiniSidebar(false)
  }, [location.pathname])

  return (
   <main className='h-screen w-full flex flex-col relative bg-theme-bgPrimary'>

    <nav className='h-16 w-full'>
        <DashboardNavbar showMiniSidebar={showMiniSidebar} setShowMiniSidebar={setShowMiniSidebar} />
    </nav>

    <div className='flex w-full flex-1 overflow-hidden '>

        {/* left sidebar */}
        {/* Sidebar working on xl screen size and above */}
        <aside className={`${showMiniSidebar ? 'w-24' : 'w-64'} h-full transition-all duration-300 xl:block hidden`}>
            <DashboardSidebar showMiniSidebar={showMiniSidebar} />
        </aside>

        {/* Sidebar working on  screen size below xl */}
        <aside className={`${showMiniSidebar ? ' md:w-24' : 'w-auto'} h-full transition-all duration-300  xl:hidden block`}>
            <DashboardSidebarBelowXl showMiniSidebar={showMiniSidebar} setShowMiniSidebar={setShowMiniSidebar} />
        </aside>
{/* layout test */}
        <div className=' flex-1 p-3 sm:p-3  md:rounded-2xl bg-theme-bgSecondary m-0 md:m-0 md:mr-2 md:mb-2 overflow-auto'>
                {/* main content goes here */}

                <Outlet />

          
        </div>

        

    </div>

    {/* overlay for the sidebar below xl screen size - visible only when sidebar is open */}
    {showMiniSidebar ? (
        <div onClick={() => setShowMiniSidebar(false)} className="block xl:hidden fixed top-0 left-0 bottom-0 right-0 bg-black/50  z-[44] "></div>
    ) : null}
   </main>
  )
}
