import React from 'react';
import AuthHeader from './AuthHeader';
import AuthFooter from './AuthFooter';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="flex flex-col min-h-screen relative bg-theme-bgPrimary">

    {/* Fixed header with backdrop blur */}
    <header className="sticky top-0 left-0 right-0 h-[60px] border-b border-theme-borderSecondary flex justify-center items-center bg-theme-bgSecondary bg-opacity-80 backdrop-blur-sm z-10">
      <div className="h-12 flex items-center justify-center">
      <img 
                src="/full-logo.png" 
                alt="Fitizen" 
                className="h-10 w-auto"
              />
      </div>
    </header>
    
    {/* Main content area */}
    <main className="flex-1 w-full bg-theme-bgPrimary">
      <div className="flex justify-center ">
        <Outlet />
      </div>
    </main>
    
    {/* Footer */}
    <div className="sticky bottom-0 left-0 right-0 bg-theme-bgSecondary text-theme-textSecondary text-sm leading-6 h-[60px] flex justify-center items-center text-center z-10 p-2">
       © {new Date().getFullYear()} Altcase. All Rights Reserved.
    </div>
    </div>  
  );
}


