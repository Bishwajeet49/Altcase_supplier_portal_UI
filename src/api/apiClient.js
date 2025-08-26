import axios from 'axios';
import { baseUrl } from './baseUrls';
import { endpoints } from './endpoints';
import toast from 'react-hot-toast';

/**
 * Centralized API Client with Token Management
 * 
 * This module provides a centralized axios-based API client that handles:
 * - Automatic access token attachment to requests
 * - Automatic token refresh when access token expires
 * - Secure refresh token handling via HTTP-only cookies
 * - Request/response interceptors for seamless token management
 * - Clean API methods for common HTTP operations
 * - MULTIPLE BASE URL SUPPORT: Automatic handling of absolute vs relative URLs
 */

// Configuration constants
const ACCESS_TOKEN_STORAGE_KEY = 'access_token';
const REFRESH_TOKEN_STORAGE_KEY = 'refresh_token';
const USER_DATA_STORAGE_KEY = 'user_data';
const LOGIN_REDIRECT_PATH = '/';

/**
 * Token Management Utilities
 * These functions handle access token, refresh token, and user data storage and retrieval from localStorage
 */
class TokenManager {
  /**
   * Get the current access token from localStorage
   * @returns {string|null} The access token or null if not found
   */
  static getAccessToken() {
    try {
      return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }

  /**
   * Store the access token in localStorage
   * @param {string} token - The access token to store
   */
  static setAccessToken(token) {
    try {
      if (token) {
        localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
      } else {
        localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
      }
    } catch (error) {
      console.error('Error setting access token:', error);
    }
  }

  /**
   * Get the current refresh token from localStorage
   * @returns {string|null} The refresh token or null if not found
   */
  static getRefreshToken() {
    try {
      return localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  }

  /**
   * Store the refresh token in localStorage
   * @param {string} token - The refresh token to store
   */
  static setRefreshToken(token) {
    try {
      if (token) {
        localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, token);
      } else {
        localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
      }
    } catch (error) {
      console.error('Error setting refresh token:', error);
    }
  }

  /**
   * Get user data from localStorage
   * @returns {object|null} The user data object or null if not found
   */
  static getUserData() {
    try {
      const userData = localStorage.getItem(USER_DATA_STORAGE_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  /**
   * Store user data in localStorage
   * @param {object} userData - The user data object to store
   */
  static setUserData(userData) {
    try {
      if (userData) {
        localStorage.setItem(USER_DATA_STORAGE_KEY, JSON.stringify(userData));
      } else {
        localStorage.removeItem(USER_DATA_STORAGE_KEY);
      }
    } catch (error) {
      console.error('Error setting user data:', error);
    }
  }

  /**
   * Store complete authentication data from login response
   * @param {object} authData - The authentication data from login response
   */
  static setAuthData(authData) {
    try {
      // Extract tokens and user data from the response structure
      const { token, refresh_token, user } = authData;
      
      // Store tokens
      this.setAccessToken(token);
      this.setRefreshToken(refresh_token);
      
      // Store user data
      this.setUserData(user);
      
      console.log('Authentication data stored successfully');
    } catch (error) {
      console.error('Error storing authentication data:', error);
    }
  }

  /**
   * Remove the access token from localStorage
   */
  static clearAccessToken() {
    try {
      localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing access token:', error);
    }
  }

  /**
   * Remove the refresh token from localStorage
   */
  static clearRefreshToken() {
    try {
      localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing refresh token:', error);
    }
  }

  /**
   * Clear user data from localStorage
   */
  static clearUserData() {
    try {
      localStorage.removeItem(USER_DATA_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  }

  /**
   * Clear all authentication data
   */
  static clearAllAuthData() {
    this.clearAccessToken();
    this.clearRefreshToken();
    this.clearUserData();
  }

  /**
   * Check if user is authenticated (has both access and refresh tokens)
   * @returns {boolean} True if user has both tokens
   */
  static isAuthenticated() {
    return !!(this.getAccessToken() && this.getRefreshToken());
  }

  /**
   * Check if user has valid access token
   * @returns {boolean} True if user has access token
   */
  static hasAccessToken() {
    return !!this.getAccessToken();
  }

  /**
   * Check if user has valid refresh token
   * @returns {boolean} True if user has refresh token
   */
  static hasRefreshToken() {
    return !!this.getRefreshToken();
  }
}

/**
 * API Client Class
 * Main class that encapsulates all API functionality with token management
 * 
 * MULTIPLE BASE URL SUPPORT:
 * - Relative URLs (e.g., '/users') use the configured baseURL
 * - Absolute URLs (e.g., 'https://other-api.com/users') override the baseURL
 */
class ApiClient {
  constructor(baseURL = baseUrl) {
    // Create axios instance with base configuration
    this.axiosInstance = axios.create({
      baseURL,
      // Without a timeout, requests will wait indefinitely until the server responds,
      // which could leave users hanging if the server is unresponsive
      // timeout: 30000, // Maximum time (in milliseconds) to wait for a response before failing the request
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // ✅ FIXED: Don't include credentials by default to avoid CORS issues
      // Only enable credentials for specific requests that need cookies (like refresh token)
      withCredentials: false,
    });

    // Store the default base URL for reference
    this.defaultBaseURL = baseURL;

    // Flag to prevent multiple simultaneous refresh attempts
    this.isRefreshing = false;
    // Queue to store failed requests during token refresh
    this.failedQueue = [];

    // Set up interceptors
    this.setupRequestInterceptor();
    this.setupResponseInterceptor();
  }

  /**
   * Check if a URL is absolute
   * @param {string} url - URL to check
   * @returns {boolean} True if URL is absolute
   */
  isAbsoluteURL(url) {
    return /^https?:\/\//i.test(url);
  }

  /**
   * Get the effective base URL for a given URL
   * @param {string} url - The URL to analyze
   * @returns {string} The base URL that will be used
   */
  getEffectiveBaseURL(url) {
    return this.isAbsoluteURL(url) ? 'OVERRIDDEN' : this.defaultBaseURL;
  }

  /**
   * Request Interceptor
   * Automatically attaches access token to all outgoing requests
   * Supports both relative and absolute URLs
   */
  setupRequestInterceptor() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Get the current access token from localStorage
        const localStorageToken = TokenManager.getAccessToken();
        
        // Log the current state
        console.log('🔍 Request interceptor - Token from localStorage:', localStorageToken ? 'Present' : 'Not present');
        console.log('🔍 Request interceptor - Custom Authorization header:', config.headers.Authorization ? 'Present' : 'Not present');
        
        // PRIORITY: Custom Authorization header takes precedence over localStorage token
        if (config.headers.Authorization) {
          console.log('🔑 Using custom Authorization header (overriding localStorage token)');
          // Custom token is already set, don't override it
        } else if (localStorageToken) {
          // Only add localStorage token if no custom Authorization header is provided
          config.headers.Authorization = `Bearer ${localStorageToken}`;
          console.log('🔑 Added Authorization header from localStorage');
        } else {
          console.log('🔑 No Authorization header available');
        }

        // Log the request for debugging (remove in production)
        const effectiveURL = this.isAbsoluteURL(config.url) 
          ? config.url 
          : `${config.baseURL}${config.url}`;
        
        console.log(`Making ${config.method?.toUpperCase()} request to: ${effectiveURL}`);
        
        // Log if base URL is being overridden
        if (this.isAbsoluteURL(config.url)) {
          console.log(`🔄 Base URL overridden: Using absolute URL instead of ${this.defaultBaseURL}`);
        }
        
        return config;
      },
      (error) => {
        // Handle request configuration errors
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Response Interceptor
   * Handles token refresh when access token expires and retries failed requests
   */
  setupResponseInterceptor() {
    this.axiosInstance.interceptors.response.use(
      // Success response handler
      (response) => {
        return response;
      },
      // Error response handler
      async (error) => {
        const originalRequest = error.config;

        // Check if error is due to expired access token
        // Adjust the condition based on your backend's error response format
        const isTokenExpired = error.response?.status === 401 && 
                              !originalRequest._retry &&
                              error.response?.data?.message !== 'Invalid credentials';

        if (isTokenExpired) {
          // Mark this request as being retried to prevent infinite loops
          originalRequest._retry = true;

          // If already refreshing token, queue this request
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            }).then(() => {
              // Retry the original request with new token
              return this.axiosInstance(originalRequest);
            });
          }

          // Start token refresh process
          this.isRefreshing = true;

          try {
            // Attempt to refresh the access token
            // alert('refreshing token');
            const newToken = await this.refreshAccessToken();
            // alert(newToken);
            console.log(newToken,'newToken');
            
            if (newToken) {
              // Store the new token
              TokenManager.setAccessToken(newToken);
              
              // Update the authorization header for the failed request
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              
              // Process all queued requests with the new token
              this.processQueue(null);
              
              // Retry the original request
              return this.axiosInstance(originalRequest);
            } else {
              throw new Error('Failed to refresh token');
            }
          } catch (refreshError) {
            // Token refresh failed, handle logout
            this.processQueue(refreshError);
            this.handleAuthenticationFailure();
            return Promise.reject(refreshError);
          } finally {
            // Reset refreshing flag
            this.isRefreshing = false;
          }
        }

        // For non-token related errors, just reject the promise
        return Promise.reject(error);
      }
    );
  }

  /**
   * Refresh Access Token
   * Makes a call to the refresh token endpoint using the stored refresh token
   * @returns {Promise<string|null>} New access token or null if refresh failed
   */
  async refreshAccessToken() {
    try {
      console.log('Attempting to refresh access token...');
      
      // Get the stored refresh token
      const refreshToken = TokenManager.getRefreshToken();
      
      if (!refreshToken) {
        console.error('No refresh token available');
        return null;
      }
      
      // Make refresh token request with refresh token in the body
      const response = await axios.post(
        endpoints.refreshToken,
        {
          refresh_token: refreshToken
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          // No need for withCredentials since we're sending token in body
          withCredentials: false,
        }
      );

      // Extract new tokens from response
      // Based on your actual refresh token response structure
      console.log('Refresh response:', response.data);
      
      const responseData = response.data?.data;
      const newAccessToken = responseData?.token;
      const newRefreshToken = responseData?.refresh_token;
      
      if (newAccessToken) {
        console.log('Access token refreshed successfully');
        
        // Store the new access token
        TokenManager.setAccessToken(newAccessToken);
        
        // Store the new refresh token if provided
        if (newRefreshToken) {
          TokenManager.setRefreshToken(newRefreshToken);
          console.log('Refresh token also updated');
        }
        
        // Note: The refresh token response doesn't include user data
        // so we don't update user data here
        
        return newAccessToken;
      } else {
        console.error('No access token in refresh response');
        return null;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      
      // If refresh token is invalid or expired, clear all auth data
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.log('Refresh token is invalid or expired');
        TokenManager.clearAllAuthData();
      }
      
      return null;
    }
  }

  /**
   * Process Queued Requests
   * Resolves or rejects all queued requests after token refresh attempt
   * @param {Error|null} error - Error if token refresh failed, null if successful
   */
  processQueue(error) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
    
    // Clear the queue
    this.failedQueue = [];
  }

  /**
   * Handle Authentication Failure
   * Called when token refresh fails, handles user logout
   */
  handleAuthenticationFailure() {
    console.log('Authentication failed, logging out user...');
    
    // Show toast message before redirect
    toast.error('Session expired, please login again', {
      duration: 3000,
      position: 'top-center',
    });
    
    // Clear all stored authentication data
    TokenManager.clearAllAuthData();
    
    // Clear any additional user data from localStorage/sessionStorage if needed
    // localStorage.clear(); // Uncomment if you want to clear all data
    
    // Small delay to allow toast to show before redirect
    setTimeout(() => {
      // Redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = LOGIN_REDIRECT_PATH;
      }
    }, 1000); // 1 second delay to show the toast
  }

  /**
   * Set Access Token
   * Manually set an access token (useful after login)
   * @param {string} token - The access token to set
   */
  setAccessToken(token) {
    TokenManager.setAccessToken(token);
  }

  /**
   * Set Refresh Token
   * Manually set a refresh token
   * @param {string} token - The refresh token to set
   */
  setRefreshToken(token) {
    TokenManager.setRefreshToken(token);
  }

  /**
   * Set Authentication Data
   * Set complete authentication data from login response
   * @param {object} authData - The authentication data from login response
   */
  setAuthData(authData) {
    TokenManager.setAuthData(authData);
  }

  /**
   * Get User Data
   * Get stored user data
   * @returns {object|null} User data or null if not found
   */
  getUserData() {
    return TokenManager.getUserData();
  }

  /**
   * Clear Authentication
   * Clear all authentication data
   */
  clearAuth() {
    TokenManager.clearAllAuthData();
  }

  /**
   * Check Authentication Status
   * @returns {boolean} Whether user is authenticated
   */
  isAuthenticated() {
    return TokenManager.isAuthenticated();
  }

  /**
   * Check if user has access token
   * @returns {boolean} Whether user has access token
   */
  hasAccessToken() {
    return TokenManager.hasAccessToken();
  }

  /**
   * Check if user has refresh token
   * @returns {boolean} Whether user has refresh token
   */
  hasRefreshToken() {
    return TokenManager.hasRefreshToken();
  }

  /**
   * Get Default Base URL
   * @returns {string} The default base URL
   */
  getDefaultBaseURL() {
    return this.defaultBaseURL;
  }

  /**
   * Update Base URL
   * Change the default base URL for future relative requests
   * @param {string} newBaseURL - New base URL
   */
  updateBaseURL(newBaseURL) {
    this.axiosInstance.defaults.baseURL = newBaseURL;
    this.defaultBaseURL = newBaseURL;
  }

  // HTTP Method Wrappers
  // These methods provide clean interfaces for making API calls
  // They support both relative URLs (using baseURL) and absolute URLs (overriding baseURL)

  /**
   * GET Request
   * @param {string} url - The endpoint URL (relative or absolute)
   * @param {object} config - Additional axios configuration
   * @returns {Promise} Axios response promise
   * 
   * Examples:
   * - get('/users') - Uses baseURL + '/users'
   * - get('https://api2.example.com/users') - Uses absolute URL, ignores baseURL
   */
  async get(url, config = {}) {
    try {
      const response = await this.axiosInstance.get(url, config);
      return response;
    } catch (error) {
      console.error(`GET ${url} failed:`, error);
      throw error;
    }
  }

  /**
   * POST Request
   * @param {string} url - The endpoint URL (relative or absolute)
   * @param {object} data - Request payload
   * @param {object} config - Additional axios configuration
   * @returns {Promise} Axios response promise
   */
  async post(url, data = {}, config = {}) {
    try {
      const response = await this.axiosInstance.post(url, data, config);
      return response;
    } catch (error) {
      console.error(`POST ${url} failed:`, error);
      throw error;
    }
  }

  /**
   * PUT Request
   * @param {string} url - The endpoint URL (relative or absolute)
   * @param {object} data - Request payload
   * @param {object} config - Additional axios configuration
   * @returns {Promise} Axios response promise
   */
  async put(url, data = {}, config = {}) {
    try {
      const response = await this.axiosInstance.put(url, data, config);
      return response;
    } catch (error) {
      console.error(`PUT ${url} failed:`, error);
      throw error;
    }
  }

  /**
   * PATCH Request
   * @param {string} url - The endpoint URL (relative or absolute)
   * @param {object} data - Request payload
   * @param {object} config - Additional axios configuration
   * @returns {Promise} Axios response promise
   */
  async patch(url, data = {}, config = {}) {
    try {
      const response = await this.axiosInstance.patch(url, data, config);
      return response;
    } catch (error) {
      console.error(`PATCH ${url} failed:`, error);
      throw error;
    }
  }

  /**
   * DELETE Request
   * @param {string} url - The endpoint URL (relative or absolute)
   * @param {object} config - Additional axios configuration
   * @returns {Promise} Axios response promise
   */
  async delete(url, config = {}) {
    try {
      const response = await this.axiosInstance.delete(url, config);
      return response;
    } catch (error) {
      console.error(`DELETE ${url} failed:`, error);
      throw error;
    }
  }

  /**
   * Generic Request Method
   * For more complex requests that need full axios configuration
   * @param {object} config - Full axios configuration object
   * @returns {Promise} Axios response promise
   */
  async request(config) {
    try {
      const response = await this.axiosInstance.request(config);
      return response;
    } catch (error) {
      console.error('Custom request failed:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const apiClient = new ApiClient();

// Export both the instance and the class for flexibility
export default apiClient;
export { ApiClient, TokenManager };

/**
 * AUTHENTICATION USAGE EXAMPLES:
 * 
 * import apiClient from './api/apiClient';
 * 
 * // After successful login, store authentication data:
 * const loginResponse = await apiClient.post('/auth/login', { email, password });
 * if (loginResponse.data.success) {
 *   // Store complete authentication data
 *   apiClient.setAuthData(loginResponse.data.data);
 *   // Now user is authenticated and tokens are stored
 * }
 * 
 * // Check authentication status:
 * if (apiClient.isAuthenticated()) {
 *   console.log('User is authenticated');
 * }
 * 
 * // Get user data:
 * const userData = apiClient.getUserData();
 * console.log('User:', userData);
 * 
 * // Make authenticated requests (tokens are automatically attached):
 * const events = await apiClient.get('/events');
 * const newEvent = await apiClient.post('/events', eventData);
 * 
 * // Logout:
 * apiClient.clearAuth();
 * 
 * // Token refresh is handled automatically when access token expires
 * // The refresh token is sent in the request body to the refresh endpoint
 * 
 * MULTIPLE BASE URL USAGE EXAMPLES:
 * 
 * import apiClient from './api/apiClient';
 * 
 * // Default base URL (baseUrl) usage:
 * const users = await apiClient.get('/users'); 
 * // → Makes request to: https://fitizen.dsaadmin.in/api/v1/users
 * 
 * // Absolute URL usage (overrides base URL):
 * const externalData = await apiClient.get('https://api.external.com/data');
 * // → Makes request to: https://api.external.com/data (ignores base URL)
 * 
 * // Different API endpoints:
 * const privateMarketData = await apiClient.get('/getpreipoproducts');
 * // → Uses default base URL
 * 
 * const adminData = await apiClient.get('https://fitizen.dsaadmin.in/api/v1/stats');
 * // → Uses absolute URL, overrides base URL
 * 
 * const paymentData = await apiClient.post('https://fitizen.dsaadmin.in/api/v1/process', paymentInfo);
 * // → Uses absolute URL for payment API
 * 
 * // You can also create different instances for different base URLs:
 * const adminApiClient = new ApiClient('https://fitizen.dsaadmin.in/api/v1');
 * const paymentApiClient = new ApiClient('https://fitizen.dsaadmin.in/api/v1');
 */ 