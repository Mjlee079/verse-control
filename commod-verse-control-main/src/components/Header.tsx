
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  LogOut, 
  Sun, 
  Moon, 
  Monitor,
  Bell,
  Search,
  Menu,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, actualTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <Sun className="h-4 w-4" />;
      case 'dark': return <Moon className="h-4 w-4" />;
      case 'auto': return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-300 backdrop-blur-xl border-b",
      scrolled 
        ? "bg-white/80 dark:bg-gray-900/80 shadow-lg border-gray-200/50 dark:border-gray-700/50" 
        : "bg-white/60 dark:bg-gray-900/60 border-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CommodityFlow
              </h1>
              <p className="text-xs text-muted-foreground">
                {user?.role === 'manager' ? 'Management Portal' : 'Store Operations'}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search products, analytics..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="icon"
              className="relative hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300"
            >
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {notifications}
                </span>
              )}
            </Button>

            {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300 hover:scale-110"
              title={`Current: ${theme}`}
            >
              {getThemeIcon()}
            </Button>

            {/* User Profile */}
            <div className="flex items-center space-x-3 pl-3 border-l border-gray-200 dark:border-gray-700">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {user?.name}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user?.role}
                </p>
              </div>
              
              <Avatar className="h-8 w-8 ring-2 ring-blue-500/20 hover:ring-blue-500/40 transition-all duration-300">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-semibold">
                  {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <Button 
                variant="ghost" 
                size="icon"
                onClick={logout}
                className="hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-all duration-300"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
