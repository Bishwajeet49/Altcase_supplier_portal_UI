import React from 'react';

export default function EmailVerification({ 
  otp, 
  onOtpChange, 
  validation, 
  onSubmit, 
  isLoading,
  email 
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="emailOtp" className="block text-sm font-medium text-gray-700 mb-2">
          Enter Email OTP
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <input
            id="emailOtp"
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
        {isLoading ? 'Verifying...' : 'Verify Email'}
      </button>
    </form>
  );
} 