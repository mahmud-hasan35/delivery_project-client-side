import React from 'react';
import { Navigate, useLocation } from 'react-router';
import UseAuth from '../Hook/useAuth';

export default function PrivateRoute({ children }) {
  const { user, loading } = UseAuth(); 
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="w-12 h-12 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}