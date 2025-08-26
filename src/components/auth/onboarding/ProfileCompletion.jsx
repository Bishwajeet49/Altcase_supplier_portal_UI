import React, { useState } from 'react';
import { isFormValid } from '../../../utils/validation';

export default function ProfileCompletion({ 
  formData, 
  onFormChange, 
  validations, 
  onSubmit, 
  isLoading 
}) {
  const [showMpin, setShowMpin] = useState(false);
  const [showConfirmMpin, setShowConfirmMpin] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Username */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
          Username
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <input
            id="username"
            type="text"
            value={formData.username}
            onChange={(e) => onFormChange('username', e.target.value)}
            placeholder="Enter your username"
            className={`w-full pl-10 pr-3 py-3 border rounded-lg transition-colors ${
              validations.username.error ? 'border-red-500 error' : 'border-gray-300'
            }`}
          />
        </div>
        {validations.username.error && (
          <p className="mt-1 text-sm text-red-600">{validations.username.error}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onFormChange('email', e.target.value)}
            placeholder="Enter your email address"
            className={`w-full pl-10 pr-3 py-3 border rounded-lg transition-colors ${
              validations.email.error ? 'border-red-500 error' : 'border-gray-300'
            }`}
          />
        </div>
        {validations.email.error && (
          <p className="mt-1 text-sm text-red-600">{validations.email.error}</p>
        )}
      </div>

      {/* MPIN */}
      <div>
        <label htmlFor="mpin" className="block text-sm font-medium text-gray-700 mb-2">
          Create MPIN
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <input
            id="mpin"
            type={showMpin ? 'text' : 'password'}
            value={formData.mpin}
            onChange={(e) => onFormChange('mpin', e.target.value)}
            placeholder="Enter 4-digit MPIN"
            className={`w-full pl-10 pr-12 py-3 border rounded-lg transition-colors ${
              validations.mpin.error ? 'border-red-500 error' : 'border-gray-300'
            }`}
            maxLength="4"
          />
          <button
            type="button"
            onClick={() => setShowMpin(!showMpin)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showMpin ? (
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        {validations.mpin.error && (
          <p className="mt-1 text-sm text-red-600">{validations.mpin.error}</p>
        )}
      </div>

      {/* Confirm MPIN */}
      <div>
        <label htmlFor="confirmMpin" className="block text-sm font-medium text-gray-700 mb-2">
          Confirm MPIN
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <input
            id="confirmMpin"
            type={showConfirmMpin ? 'text' : 'password'}
            value={formData.confirmMpin}
            onChange={(e) => onFormChange('confirmMpin', e.target.value)}
            placeholder="Confirm your MPIN"
            className={`w-full pl-10 pr-12 py-3 border rounded-lg transition-colors ${
              validations.confirmMpin.error ? 'border-red-500 error' : 'border-gray-300'
            }`}
            maxLength="4"
          />
          <button
            type="button"
            onClick={() => setShowConfirmMpin(!showConfirmMpin)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showConfirmMpin ? (
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        {validations.confirmMpin.error && (
          <p className="mt-1 text-sm text-red-600">{validations.confirmMpin.error}</p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={!isFormValid(validations) || isLoading}
        className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
          isFormValid(validations) && !isLoading
            ? 'bg-primary hover:bg-primary focus:ring-2 focus:ring-primary focus:ring-offset-2'
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        {isLoading ? 'Creating Profile...' : 'Complete Profile'}
      </button>
    </form>
  );
} 