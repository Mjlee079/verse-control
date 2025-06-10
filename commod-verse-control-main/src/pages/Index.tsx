
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginPage from '../components/LoginPage';
import MainApp from '../components/MainApp';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <MainApp /> : <LoginPage />;
};

export default Index;
