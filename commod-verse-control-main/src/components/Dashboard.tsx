
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  DollarSign, 
  Users, 
  AlertTriangle,
  BarChart3,
  PieChart,
  Activity,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalProducts: 1247,
    totalValue: 2487500,
    lowStock: 23,
    categories: 12,
    growth: 12.5,
    activeUsers: 156
  });

  const [animatedValues, setAnimatedValues] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStock: 0,
    activeUsers: 0
  });

  // Animate numbers on mount
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAnimatedValues({
        totalProducts: Math.floor(metrics.totalProducts * easeOut),
        totalValue: Math.floor(metrics.totalValue * easeOut),
        lowStock: Math.floor(metrics.lowStock * easeOut),
        activeUsers: Math.floor(metrics.activeUsers * easeOut)
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const quickStats = [
    {
      title: "Total Products",
      value: animatedValues.totalProducts.toLocaleString(),
      icon: Package,
      trend: "+8.2%",
      trendUp: true,
      color: "blue",
      description: "Active inventory items"
    },
    {
      title: "Portfolio Value",
      value: `$${(animatedValues.totalValue / 1000).toFixed(0)}K`,
      icon: DollarSign,
      trend: "+12.5%",
      trendUp: true,
      color: "green",
      description: "Total commodity value"
    },
    {
      title: "Low Stock Items",
      value: animatedValues.lowStock.toString(),
      icon: AlertTriangle,
      trend: "-5.1%",
      trendUp: false,
      color: "red",
      description: "Require restocking"
    },
    {
      title: "Active Users",
      value: animatedValues.activeUsers.toString(),
      icon: Users,
      trend: "+3.2%",
      trendUp: true,
      color: "purple",
      description: "Store keepers online"
    }
  ];

  const topCategories = [
    { name: "Agricultural", value: 85, growth: 12.3, color: "bg-green-500" },
    { name: "Energy", value: 72, growth: 8.7, color: "bg-yellow-500" },
    { name: "Metals", value: 65, growth: -2.1, color: "bg-gray-500" },
    { name: "Livestock", value: 58, growth: 15.4, color: "bg-blue-500" },
    { name: "Textiles", value: 45, growth: 6.8, color: "bg-purple-500" }
  ];

  const recentActivities = [
    { action: "New product added", item: "Premium Wheat", time: "2 min ago", type: "success" },
    { action: "Stock level critical", item: "Crude Oil", time: "5 min ago", type: "warning" },
    { action: "Large order processed", item: "Gold Bars", time: "12 min ago", type: "info" },
    { action: "Price updated", item: "Silver Coins", time: "18 min ago", type: "success" },
    { action: "User logged in", item: "Sarah Keeper", time: "25 min ago", type: "info" }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            Management Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time insights into your commodity operations
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
            <Activity className="w-3 h-3 mr-1" />
            Live Data
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={stat.title} 
              className={cn(
                "relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-l-4",
                stat.color === "blue" && "border-l-blue-500 hover:shadow-blue-100 dark:hover:shadow-blue-900/20",
                stat.color === "green" && "border-l-green-500 hover:shadow-green-100 dark:hover:shadow-green-900/20",
                stat.color === "red" && "border-l-red-500 hover:shadow-red-100 dark:hover:shadow-red-900/20",
                stat.color === "purple" && "border-l-purple-500 hover:shadow-purple-100 dark:hover:shadow-purple-900/20"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={cn(
                  "p-2 rounded-full",
                  stat.color === "blue" && "bg-blue-100 dark:bg-blue-900/20",
                  stat.color === "green" && "bg-green-100 dark:bg-green-900/20",
                  stat.color === "red" && "bg-red-100 dark:bg-red-900/20",
                  stat.color === "purple" && "bg-purple-100 dark:bg-purple-900/20"
                )}>
                  <Icon className={cn(
                    "h-4 w-4",
                    stat.color === "blue" && "text-blue-600 dark:text-blue-400",
                    stat.color === "green" && "text-green-600 dark:text-green-400",
                    stat.color === "red" && "text-red-600 dark:text-red-400",
                    stat.color === "purple" && "text-purple-600 dark:text-purple-400"
                  )} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center mt-2">
                  <span className={cn(
                    "flex items-center text-xs font-medium",
                    stat.trendUp ? "text-green-600" : "text-red-600"
                  )}>
                    {stat.trendUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {stat.trend}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">vs last month</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Categories */}
        <Card className="lg:col-span-2 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-blue-600" />
              Top Performing Categories
            </CardTitle>
            <CardDescription>
              Category performance by inventory value
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topCategories.map((category, index) => (
              <div key={category.name} className="flex items-center space-x-4 group">
                <div className="w-12 text-sm font-medium text-right">
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{category.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{category.value}%</span>
                      <span className={cn(
                        "text-xs font-medium flex items-center",
                        category.growth > 0 ? "text-green-600" : "text-red-600"
                      )}>
                        {category.growth > 0 ? "↗" : "↘"} {Math.abs(category.growth)}%
                      </span>
                    </div>
                  </div>
                  <Progress 
                    value={category.value} 
                    className="h-2 group-hover:h-3 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              Live Activity
            </CardTitle>
            <CardDescription>
              Real-time system updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div 
                  key={index} 
                  className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-all duration-200 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={cn(
                    "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                    activity.type === "success" && "bg-green-500",
                    activity.type === "warning" && "bg-yellow-500",
                    activity.type === "info" && "bg-blue-500"
                  )} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                      {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground">{activity.item}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
