import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isLoggedIn, isAppInitialized, children }) {
  if (!isAppInitialized) return null;
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
