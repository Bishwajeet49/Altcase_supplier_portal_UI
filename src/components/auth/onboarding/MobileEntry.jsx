import React from 'react';

export default function MobileEntry({ 
  mobile, 
  onMobileChange, 
  validation, 
  onSubmit, 
  isLoading 
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
          Mobile Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <input
            id="mobile"
            type="tel"
            value={mobile}
            onChange={(e) => onMobileChange(e.target.value)}
            placeholder="Enter your 10-digit mobile number"
            className={`w-full pl-10 pr-3 py-3 border rounded-lg transition-colors ${
              validation.error ? 'border-red-500 error' : 'border-gray-300'
            }`}
            maxLength="10"
          />
        </div>
        {validation.error && (
          <p className="mt-1 text-sm text-red-600">{validation.error}</p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={!validation.isValid || isLoading}
        className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
          validation.isValid && !isLoading
            ? 'bg-primary hover:bg-primary focus:ring-2 focus:ring-primary focus:ring-offset-2'
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        {isLoading ? 'Sending OTP...' : 'Send OTP'}
      </button>
    </form>
  );
} 