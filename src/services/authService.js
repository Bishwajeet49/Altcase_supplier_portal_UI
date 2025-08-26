import apiClient from '../api/apiClient';
import { endpoints } from '../api/endpoints';

/**
 * Authentication Service
 * Handles all authentication and onboarding related API calls
 */
class AuthService {
  /**
   * Sign in user with mobile number and MPIN
   * @param {string} mobileNumber - 10 digit mobile number
   * @param {string} mpin - 4 digit MPIN
   * @returns {Promise} API response
   */
  async signIn(mobileNumber, mpin) {
    try {
      const response = await apiClient.post(endpoints.signin, {
        identifier: mobileNumber,
        mpin: mpin,
        login_type: 'mobile',
        user_type: 'organizer',
        source: 'web'
      });
      
      // Store authentication data if successful
      if (response.data.success && response.data.data) {
        apiClient.setAuthData(response.data.data);
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Start registration process
   * @param {string} mobileNumber - 10 digit mobile number
   * @returns {Promise} API response
   */
  async startRegistration(mobileNumber) {
    try {
      const response = await apiClient.post(endpoints.startRegistration, {
        mobile_number: mobileNumber
      });
      return response.data;
    } catch (error) {
      console.log(error,'error');
      throw error.response?.data || error;
    }
  }

  /**
   * Verify mobile number with OTP
   * @param {string} mobileNumber - 10 digit mobile number
   * @param {string} otpCode - 6 digit OTP
   * @returns {Promise} API response
   */
  async verifyMobileAndGetUser(mobileNumber, otpCode) {
    try {
      const response = await apiClient.post(endpoints.verifyMobileAndGetUser, {
        mobile_number: mobileNumber,
        otp_code: otpCode
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Complete user profile
   * @param {object} profileData - Profile completion data
   * @returns {Promise} API response
   */
  async completeProfile(profileData) {
    try {
      const response = await apiClient.post(endpoints.completeProfile, {
        ...profileData,
        user_type: 'organizer' // Hardcoded as per requirement
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Verify email with OTP
   * @param {string} userUuid - User UUID
   * @param {string} otpCode - 6 digit OTP
   * @returns {Promise} API response
   */
  async verifyEmailAndComplete(userUuid, otpCode) {
    try {
      const response = await apiClient.post(endpoints.verifyEmailAndComplete, {
        user_uuid: userUuid,
        otp_code: otpCode
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Silent login after successful onboarding
   * @param {string} mobileNumber - 10 digit mobile number
   * @param {string} mpin - 4 digit MPIN
   * @returns {Promise} API response
   */
  async silentLogin(mobileNumber, mpin) {
    return this.signIn(mobileNumber, mpin);
  }

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    return apiClient.isAuthenticated();
  }

  /**
   * Get user data
   * @returns {object|null}
   */
  getUserData() {
    return apiClient.getUserData();
  }

  /**
   * Clear authentication data
   */
  clearAuth() {
    apiClient.clearAuth();
  }
}

// Export singleton instance
const authService = new AuthService();
export default authService; 