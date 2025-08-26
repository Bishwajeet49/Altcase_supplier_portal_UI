/**
 * Validation utilities for authentication forms
 */

/**
 * Validate mobile number (10 digits)
 * @param {string} mobile - Mobile number to validate
 * @returns {object} Validation result
 */
export const validateMobile = (mobile) => {
  const mobileRegex = /^[6-9]\d{9}$/;
  
  if (!mobile) {
    return { isValid: false, error: 'Mobile number is required' };
  }
  
  if (!mobileRegex.test(mobile)) {
    return { isValid: false, error: 'Please enter a valid 10-digit mobile number' };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Validate OTP (6 digits)
 * @param {string} otp - OTP to validate
 * @returns {object} Validation result
 */
export const validateOTP = (otp) => {
  const otpRegex = /^\d{6}$/;
  
  if (!otp) {
    return { isValid: false, error: 'OTP is required' };
  }
  
  if (!otpRegex.test(otp)) {
    return { isValid: false, error: 'Please enter a valid 6-digit OTP' };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Validate MPIN (4 digits)
 * @param {string} mpin - MPIN to validate
 * @returns {object} Validation result
 */
export const validateMPIN = (mpin) => {
  const mpinRegex = /^\d{4}$/;
  
  if (!mpin) {
    return { isValid: false, error: 'MPIN is required' };
  }
  
  if (!mpinRegex.test(mpin)) {
    return { isValid: false, error: 'MPIN must be exactly 4 digits' };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {object} Validation result
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Validate username (3-20 characters, alphanumeric and underscore)
 * @param {string} username - Username to validate
 * @returns {object} Validation result
 */
export const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_ ]{3,50}$/;
  
  if (!username) {
    return { isValid: false, error: 'Full name is required' };
  }
  
  if (!usernameRegex.test(username)) {
    return { isValid: false, error: 'Full name must be 3-50 characters long and can contain letters, numbers, spaces and underscores' };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Validate confirm MPIN matches MPIN
 * @param {string} mpin - Original MPIN
 * @param {string} confirmMpin - Confirm MPIN
 * @returns {object} Validation result
 */
export const validateConfirmMPIN = (mpin, confirmMpin) => {
  if (!confirmMpin) {
    return { isValid: false, error: 'Please confirm your MPIN' };
  }
  
  if (mpin !== confirmMpin) {
    return { isValid: false, error: 'MPIN does not match' };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Validate all form fields and return overall validation status
 * @param {object} validations - Object containing validation results
 * @returns {boolean} True if all validations pass
 */
export const isFormValid = (validations) => {
  return Object.values(validations).every(validation => validation.isValid);
}; 