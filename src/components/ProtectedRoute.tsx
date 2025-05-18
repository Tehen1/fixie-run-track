
import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({
        appState: { returnTo: location.pathname },
      });
    }
  }, [isAuthenticated, isLoading, loginWithRedirect, location.pathname]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading authentication...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;
