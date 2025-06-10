
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Package, 
  Plus,
  Eye
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const { user } = useAuth();

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      allowedRoles: ['manager'],
    },
    {
      id: 'products',
      label: 'View Products',
      icon: Eye,
      allowedRoles: ['manager', 'storekeeper'],
    },
    {
      id: 'add-product',
      label: 'Add Product',
      icon: Plus,
      allowedRoles: ['manager', 'storekeeper'],
    },
  ];

  const allowedItems = navigationItems.filter(item => 
    item.allowedRoles.includes(user?.role || '')
  );

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 py-4 overflow-x-auto">
          {allowedItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "flex items-center space-x-2 whitespace-nowrap",
                  isActive && "bg-blue-600 hover:bg-blue-700"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
