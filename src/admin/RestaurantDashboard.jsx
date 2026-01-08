import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Utensils, 
  Users, 
  Calendar, 
  ShoppingCart, 
  DollarSign, 
  BarChart3, 
  Settings,
  Bell,
  User,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react';

const RestaurantDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'menu', label: 'Menu Management', icon: Utensils },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'reservations', label: 'Reservations', icon: Calendar },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const stats = [
    { label: 'Today\'s Revenue', value: '$2,847', change: '+12%', color: 'green' },
    { label: 'Active Orders', value: '23', change: '+5', color: 'blue' },
    { label: 'Table Occupancy', value: '78%', change: '+8%', color: 'yellow' },
    { label: 'Customer Rating', value: '4.8', change: '+0.2', color: 'purple' }
  ];

  const recentOrders = [
    { id: '#001', customer: 'John Doe', amount: '$45.20', status: 'Preparing', time: '5 min ago' },
    { id: '#002', customer: 'Jane Smith', amount: '$32.50', status: 'Ready', time: '12 min ago' },
    { id: '#003', customer: 'Mike Johnson', amount: '$78.90', status: 'Delivered', time: '25 min ago' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">RestaurantPro</h1>
          <p className="text-sm text-gray-500">Admin Panel</p>
        </div>
        
        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-orange-50 transition-colors ${
                  activeTab === item.id 
                    ? 'bg-orange-100 border-r-4 border-orange-500 text-orange-700' 
                    : 'text-gray-600'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">
              {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
            </h2>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-2">
                <User className="w-8 h-8 p-1 bg-gray-200 rounded-full" />
                <span className="text-sm font-medium">Admin User</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                      </div>
                      <div className={`flex items-center text-${stat.color}-600`}>
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span className="text-sm">{stat.change}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold">Recent Orders</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                          <div>
                            <p className="font-medium">{order.id} - {order.customer}</p>
                            <p className="text-sm text-gray-500">{order.time}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{order.amount}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              order.status === 'Preparing' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'Ready' ? 'bg-green-100 text-green-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold">Quick Actions</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <button className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                        <Utensils className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                        <p className="text-sm font-medium">Add Menu Item</p>
                      </button>
                      <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm font-medium">New Reservation</p>
                      </button>
                      <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                        <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm font-medium">View Reports</p>
                      </button>
                      <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                        <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <p className="text-sm font-medium">Manage Staff</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Today's Overview */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold">Today's Overview</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
                        <ShoppingCart className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-2xl font-bold">47</p>
                      <p className="text-sm text-gray-600">Total Orders</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                        <DollarSign className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold">$2,847</p>
                      <p className="text-sm text-gray-600">Revenue</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-2">
                        <Clock className="w-6 h-6 text-yellow-600" />
                      </div>
                      <p className="text-2xl font-bold">18 min</p>
                      <p className="text-sm text-gray-600">Avg Prep Time</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
                        <Star className="w-6 h-6 text-purple-600" />
                      </div>
                      <p className="text-2xl font-bold">4.8</p>
                      <p className="text-sm text-gray-600">Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {activeTab !== 'dashboard' && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">
                {sidebarItems.find(item => item.id === activeTab)?.label}
              </h3>
              <p className="text-gray-600">This module will be implemented next.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default RestaurantDashboard;