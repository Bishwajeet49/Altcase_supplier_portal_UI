import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import apiClient from '../../api/apiClient';

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      try {
        // Check if user has valid tokens and user data
        const hasTokens = apiClient.isAuthenticated();
        const userData = apiClient.getUserData();
        
        if (hasTokens && userData) {
          setIsAuthenticated(true);
        } else {
          // Clear any invalid auth data
          apiClient.clearAuth();
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        apiClient.clearAuth();
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
    //bypass the auth route temporarily
    return children;
  }

  // Render children if authenticated
  return children;
}

export default ProtectedRoute; 