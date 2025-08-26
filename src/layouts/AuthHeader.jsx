import React from 'react';

export default function AuthHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center py-4">
          <img 
            src="/full-logo.png" 
            alt="Fitizen" 
            className="h-12 w-auto"
          />
        </div>
      </div>
    </header>
  );
}
