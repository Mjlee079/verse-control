
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  SortAsc, 
  Grid3X3, 
  List,
  Package,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  MoreVertical,
  Star,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  trend: 'up' | 'down' | 'stable';
  image?: string;
  supplier: string;
  lastUpdated: string;
  rating: number;
}

const ProductsView = () => {
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Premium Wheat',
      category: 'Agricultural',
      quantity: 2500,
      price: 450.00,
      status: 'in-stock',
      trend: 'up',
      supplier: 'FarmCorp Ltd',
      lastUpdated: '2 hours ago',
      rating: 4.8
    },
    {
      id: '2',
      name: 'Crude Oil Barrel',
      category: 'Energy',
      quantity: 12,
      price: 75.25,
      status: 'low-stock',
      trend: 'down',
      supplier: 'PetroMax Inc',
      lastUpdated: '30 min ago',
      rating: 4.5
    },
    {
      id: '3',
      name: 'Gold Bars (1oz)',
      category: 'Metals',
      quantity: 45,
      price: 2050.00,
      status: 'in-stock',
      trend: 'up',
      supplier: 'MetalTrade Co',
      lastUpdated: '1 hour ago',
      rating: 5.0
    },
    {
      id: '4',
      name: 'Organic Cotton',
      category: 'Textiles',
      quantity: 0,
      price: 1.85,
      status: 'out-of-stock',
      trend: 'stable',
      supplier: 'EcoFiber Ltd',
      lastUpdated: '3 hours ago',
      rating: 4.2
    },
    {
      id: '5',
      name: 'Live Cattle',
      category: 'Livestock',
      quantity: 125,
      price: 1250.00,
      status: 'in-stock',
      trend: 'up',
      supplier: 'Ranch Masters',
      lastUpdated: '45 min ago',
      rating: 4.6
    },
    {
      id: '6',
      name: 'Silver Coins',
      category: 'Metals',
      quantity: 350,
      price: 28.50,
      status: 'in-stock',
      trend: 'down',
      supplier: 'MetalTrade Co',
      lastUpdated: '1.5 hours ago',
      rating: 4.3
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterStatus, setFilterStatus] = useState('all');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category)));
    return ['all', ...cats];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.supplier.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'name': return a.name.localeCompare(b.name);
          case 'price': return b.price - a.price;
          case 'quantity': return b.quantity - a.quantity;
          case 'rating': return b.rating - a.rating;
          default: return 0;
        }
      });
  }, [products, searchQuery, selectedCategory, sortBy, filterStatus]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'out-of-stock': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-600" />;
      case 'down': return <TrendingDown className="w-3 h-3 text-red-600" />;
      default: return <div className="w-3 h-3 bg-gray-400 rounded-full" />;
    }
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
              {product.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              {product.category}
              {getTrendIcon(product.trend)}
            </CardDescription>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
        </div>
        <Badge className={cn("w-fit", getStatusColor(product.status))}>
          {product.status.replace('-', ' ')}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Quantity</span>
            <span className="font-semibold">{product.quantity.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Price</span>
            <span className="font-semibold text-green-600">${product.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Supplier</span>
            <span className="text-sm">{product.supplier}</span>
          </div>
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Updated {product.lastUpdated}</span>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ProductListItem = ({ product }: { product: Product }) => (
    <Card className="group hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-muted-foreground">{product.category} • {product.supplier}</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className="font-semibold">{product.quantity.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Quantity</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-green-600">${product.price.toFixed(2)}</div>
              <div className="text-xs text-muted-foreground">Price</div>
            </div>
            <Badge className={cn("", getStatusColor(product.status))}>
              {product.status.replace('-', ' ')}
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm">{product.rating}</span>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <Eye className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Product Inventory</h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} of {products.length} products
          </p>
        </div>
        
        {/* Quick Stats */}
        <div className="flex gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
            <div className="text-green-700 dark:text-green-400 text-sm font-medium">In Stock</div>
            <div className="text-green-900 dark:text-green-300 text-xl font-bold">
              {products.filter(p => p.status === 'in-stock').length}
            </div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="text-yellow-700 dark:text-yellow-400 text-sm font-medium">Low Stock</div>
            <div className="text-yellow-900 dark:text-yellow-300 text-xl font-bold">
              {products.filter(p => p.status === 'low-stock').length}
            </div>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
            <div className="text-red-700 dark:text-red-400 text-sm font-medium">Out of Stock</div>
            <div className="text-red-900 dark:text-red-300 text-xl font-bold">
              {products.filter(p => p.status === 'out-of-stock').length}
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="flex flex-col lg:flex-row gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl border shadow-sm">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products, suppliers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-input bg-background rounded-md text-sm"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-input bg-background rounded-md text-sm"
        >
          <option value="all">All Status</option>
          <option value="in-stock">In Stock</option>
          <option value="low-stock">Low Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-input bg-background rounded-md text-sm"
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="quantity">Sort by Quantity</option>
          <option value="rating">Sort by Rating</option>
        </select>

        {/* View Mode */}
        <div className="flex border border-input rounded-md overflow-hidden">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="rounded-none"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="rounded-none"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Products Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ProductListItem product={product} />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductsView;
