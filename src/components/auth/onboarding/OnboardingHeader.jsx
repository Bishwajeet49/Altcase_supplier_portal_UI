import React from 'react';

export default function OnboardingHeader({ title, subtitle }) {
  return (
    <div className="text-center">
      <div className="mx-auto h-16 w-16 bg-secondary-100 rounded-full flex items-center justify-center">
        <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      </div>
      <h2 className="mt-6 text-3xl font-bold text-gray-900">
        {title}
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        {subtitle}
      </p>
    </div>
  );
} 