import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from './Header';
import Navigation from './Navigation';
import Dashboard from './Dashboard';
import ProductsView from './ProductsView';
import AddProduct from './AddProduct';

const MainApp = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(() => {
    // Default to products view for store keepers, dashboard for managers
    return user?.role === 'manager' ? 'dashboard' : 'products';
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return user?.role === 'manager' ? <Dashboard /> : <div>Access Denied</div>;
      case 'products':
        return <ProductsView />;
      case 'add-product':
        return <AddProduct />;
      default:
        return <ProductsView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default MainApp;
