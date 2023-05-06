import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axiosInstance from './axiosInstance';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  const [isValidToken, setIsValidToken] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axiosInstance.post('/login/token/verify/');

        if (response.data.valid) {
          setIsValidToken(true);
        }
      } catch (error) {
        console.error('Error verifying token:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyToken();
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isValidToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
