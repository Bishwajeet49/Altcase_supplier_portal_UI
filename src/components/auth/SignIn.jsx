import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { validateMobile, validateMPIN, isFormValid } from '../../utils/validation';
import authService from '../../services/authService';
import toast from 'react-hot-toast';
import { ArrowRightIcon } from '@mui/x-date-pickers';


export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the intended destination from location state, or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';
  
  // Form state
  const [formData, setFormData] = useState({
    mobile: '',
    mpin: ''
  });
  
  // Validation state
  const [validations, setValidations] = useState({
    mobile: { isValid: false, error: '' },
    mpin: { isValid: false, error: '' }
  });
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  
  // Show/hide MPIN
  const [showMpin, setShowMpin] = useState(false);


  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validate on change
    let validation;
    switch (field) {
      case 'mobile':
        validation = validateMobile(value);
        break;
      case 'mpin':
        validation = validateMPIN(value);
        break;
      default:
        validation = { isValid: true, error: '' };
    }
    
    setValidations(prev => ({ ...prev, [field]: validation }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const mobileValidation = validateMobile(formData.mobile);
    const mpinValidation = validateMPIN(formData.mpin);
    
    const newValidations = {
      mobile: mobileValidation,
      mpin: mpinValidation
    };
    
    setValidations(newValidations);
    
    // Check if form is valid
    if (!isFormValid(newValidations)) {
      toast.error('Please fix the errors and try again');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await authService.signIn(formData.mobile, formData.mpin);
      
      if (response.success) {
        toast.success('Sign in successful!');
    
        // Redirect to the originally requested page or dashboard
        navigate(from, { replace: true });
      } else {
        toast.error(response.message || 'Sign in failed');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error(error.message || 'Sign in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 sm:px-6  lg:px-8 pt-4 sm:pt-6 md:pt-10 lg:pt-20 pb-4 min-h-full  w-full ">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-secondary-100 rounded-full flex items-center justify-center">
            <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
          Back in the Game!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
          Sign in to your organizer account and get ready to create experiential events.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-[500px] ">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Mobile Number Field */}
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
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                  placeholder="Enter your 10-digit mobile number"
                  className={`w-full pl-10 pr-3 py-3 border rounded-lg transition-colors ${
                    validations.mobile.error ? 'border-red-500 error' : 'border-gray-300'
                  }`}
                  maxLength="10"
                />
              </div>
              {validations.mobile.error && (
                <p className="mt-1 text-sm text-red-600">{validations.mobile.error}</p>
              )}
            </div>

            {/* MPIN Field */}
            <div>
              <label htmlFor="mpin" className="block text-sm font-medium text-gray-700 mb-2">
                MPIN
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
                  onChange={(e) => handleInputChange('mpin', e.target.value)}
                  placeholder="Enter your 4-digit MPIN"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid(validations) || isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                isFormValid(validations) && !isLoading
                  ? 'bg-primary hover:bg-primary focus:ring-2 focus:ring-primary focus:ring-offset-2'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">New to Fitizen? <Link to="/auth/onboarding" className="text-primary hover:text-primary-dark inline-flex items-center">Create Your Account <ArrowRightIcon className="w-4 h-4 ml-1" /></Link></span>
              </div>
            </div>
          </div>
          
          {/* Register Link */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => navigate('/auth/onboarding')}
              className="text-primary hover:text-primary font-medium text-sm"
            >
              Create your account
            </button>
          </div>
        </div>

      </div>
    </div>
  );
} 