import React from 'react';

export default function OtpVerification({ 
  otp, 
  onOtpChange, 
  validation, 
  onSubmit, 
  isLoading,
  mobile 
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
          Enter OTP
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <input
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => onOtpChange(e.target.value)}
            placeholder="Enter 6-digit OTP"
            className={`w-full pl-10 pr-3 py-3 border rounded-lg transition-colors ${
              validation.error ? 'border-red-500 error' : 'border-gray-300'
            }`}
            maxLength="6"
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
        {isLoading ? 'Verifying...' : 'Verify OTP'}
      </button>
    </form>
  );
} 