import React from 'react';
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';

/*
 * This header component acts only as an invisible spacer/filler.
 * The actual content (toggle button and logo image) is rendered from DashboardNavbar component.
 * We use z-index to ensure the DashboardNavbar content appears above this spacer.
 * This maintains proper layout spacing while allowing the real interactive elements
 * to be rendered from a different component.
 */
const SidebarHeader = ({ isVisible = false, showMiniSidebar, setShowMiniSidebar }) => {
  if (!isVisible) return null;
  
  return (
    <div className='h-full w-full bg-white/80 py-1  opacity-100 backdrop-blur-sm invisible'>
    <div className='flex h-full w-full items-center'>

        <div className='w-24 h-full flex items-center justify-center  '>
            {/* this button will be used to toggle the sidebar */}
            <button
                className='group text-xl p-1 rounded-full hover:bg-dark-200 transition-colors duration-200 active:bg-dark-400 bg-dark-100 border border-dark-300'
                onClick={() => setShowMiniSidebar(!showMiniSidebar)}
            >
                {!showMiniSidebar ?
                    <MdOutlineKeyboardDoubleArrowLeft className='text-dark-400 group-hover:text-dark-600 transition-colors h-5 w-5' /> :
                    <MdOutlineKeyboardDoubleArrowRight className='text-dark-400 group-hover:text-dark-600 transition-colors h-5 w-5' />
                }
            </button>
        </div>

        <div className="flex-1 h-full flex justify-between pr-4">
            {/* logo */}
            <div className='h-full w-auto py-2'>
                <img src={"/full-logo.png"} alt="logo" className='h-full w-auto' />
            </div>
        </div>
    </div>
</div>
  );
};

export default SidebarHeader; 