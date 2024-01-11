import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({isAuthorized}) => {
  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};