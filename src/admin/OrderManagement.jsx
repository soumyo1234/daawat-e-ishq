import { AlertCircle, Calendar, CheckCircle, Clock, DollarSign, Eye, MapPin, Phone, User, XCircle } from 'lucide-react';
import { useState } from 'react';

const getStatusColor = (status) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'preparing': return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'ready': return 'bg-green-100 text-green-800 border-green-300';
    case 'completed': return 'bg-gray-100 text-gray-800 border-gray-300';
    case 'cancelled': return 'bg-red-100 text-red-800 border-red-300';
    default: return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};
const getStatusIcon = (status) => {
  switch (status) {
    case 'pending': return <AlertCircle className="w-4 h-4 text-yellow-400" />;
    case 'preparing': return <Clock className="w-4 h-4 text-blue-400" />;
    case 'ready': return <CheckCircle className="w-4 h-4 text-green-400" />;
    case 'completed': return <CheckCircle className="w-4 h-4 text-gray-400" />;
    case 'cancelled': return <XCircle className="w-4 h-4 text-red-400" />;
    default: return <AlertCircle className="w-4 h-4 text-gray-400" />;
  }
};

const OrderManagement = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([
    {
      id: '#ORD-001',
      customer: 'John Smith',
      phone: '+1 (555) 123-4567',
      email: 'john.smith@email.com',
      type: 'Dine-in',
      table: 'Table 12',
      status: 'preparing',
      total: 45.50,
      time: '2:30 PM',
      estimatedTime: '15 min',
      items: [
        { name: 'Margherita Pizza', quantity: 1, price: 22.00, notes: 'Extra cheese' },
        { name: 'Caesar Salad', quantity: 1, price: 14.50, notes: '' },
        { name: 'Coca Cola', quantity: 2, price: 4.50, notes: 'No ice' }
      ],
      address: null
    },
    {
      id: '#ORD-002',
      customer: 'Sarah Johnson',
      phone: '+1 (555) 987-6543',
      email: 'sarah.j@email.com',
      type: 'Delivery',
      table: null,
      status: 'ready',
      total: 67.25,
      time: '2:15 PM',
      estimatedTime: '5 min',
      items: [
        { name: 'Pepperoni Pizza', quantity: 1, price: 24.00, notes: '' },
        { name: 'Chicken Wings', quantity: 12, price: 18.00, notes: 'Extra spicy' },
        { name: 'Garlic Bread', quantity: 2, price: 8.00, notes: '' },
        { name: 'Sprite', quantity: 3, price: 6.75, notes: '' }
      ],
      address: '123 Main St, Apt 4B, New York, NY 10001'
    },
    {
      id: '#ORD-003',
      customer: 'Mike Wilson',
      phone: '+1 (555) 456-7890',
      email: 'mike.wilson@email.com',
      type: 'Pickup',
      table: null,
      status: 'completed',
      total: 28.75,
      time: '1:45 PM',
      estimatedTime: 'Completed',
      items: [
        { name: 'Hawaiian Pizza', quantity: 1, price: 26.00, notes: 'Light pineapple' },
        { name: 'Orange Juice', quantity: 1, price: 2.75, notes: '' }
      ],
      address: null
    },
    {
      id: '#ORD-004',
      customer: 'Emily Davis',
      phone: '+1 (555) 321-0987',
      email: 'emily.davis@email.com',
      type: 'Dine-in',
      table: 'Table 7',
      status: 'pending',
      total: 89.00,
      time: '2:45 PM',
      estimatedTime: '25 min',
      items: [
        { name: 'Meat Lovers Pizza', quantity: 2, price: 58.00, notes: 'Extra pepperoni' },
        { name: 'Buffalo Wings', quantity: 8, price: 15.00, notes: 'Medium heat' },
        { name: 'Mozzarella Sticks', quantity: 1, price: 9.50, notes: '' },
        { name: 'Beer', quantity: 2, price: 6.50, notes: '' }
      ],
      address: null
    },
    {
      id: '#ORD-005',
      customer: 'David Brown',
      phone: '+1 (555) 654-3210',
      email: 'david.brown@.com',
      type: 'Delivery',
      table: null,
      status: 'cancelled',
      total: 35.25,
      time: '1:30 PM',
      estimatedTime: 'Cancelled',
      items: [
        { name: 'Veggie Pizza', quantity: 1, price: 23.00, notes: 'No olives' },
        { name: 'Greek Salad', quantity: 1, price: 12.25, notes: 'Dressing on side' }
      ],
      address: '456 Oak Ave, Brooklyn, NY 11201'
    }
  ]);

  // Demo: always authenticated for now
  const isAuthenticated = true;

  // Calculate order stats
  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    ready: orders.filter(o => o.status === 'ready').length,
    completed: orders.filter(o => o.status === 'completed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  // Filtered orders by status
  const filteredOrders = selectedStatus === 'all' ? orders : orders.filter(o => o.status === selectedStatus);

  // Update order status (demo only)
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  if (!isAuthenticated) return <div>Admin login required.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
              <p className="text-gray-600">Track and manage all restaurant orders</p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Export Orders
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{orderStats.total}</p>
              </div>
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{orderStats.pending}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Preparing</p>
                <p className="text-2xl font-bold text-blue-600">{orderStats.preparing}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ready</p>
                <p className="text-2xl font-bold text-green-600">{orderStats.ready}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-600">{orderStats.completed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedStatus === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Orders ({orders.length})
            </button>
            <button
              onClick={() => setSelectedStatus('pending')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedStatus === 'pending' 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending ({orderStats.pending})
            </button>
            <button
              onClick={() => setSelectedStatus('preparing')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedStatus === 'preparing' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Preparing ({orderStats.preparing})
            </button>
            <button
              onClick={() => setSelectedStatus('ready')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedStatus === 'ready' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Ready ({orderStats.ready})
            </button>
            <button
              onClick={() => setSelectedStatus('completed')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedStatus === 'completed' 
                  ? 'bg-gray-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed ({orderStats.completed})
            </button>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Order Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{order.id}</h3>
                    <p className="text-sm text-gray-600">{order.time}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                {/* Customer Info */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{order.customer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{order.phone}</span>
                  </div>
                  {order.type === 'Dine-in' && order.table && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{order.table}</span>
                    </div>
                  )}
                  {order.type === 'Delivery' && order.address && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="truncate">{order.address}</span>
                    </div>
                  )}
                </div>

                {/* Order Type & Total */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.type === 'Dine-in' ? 'bg-blue-100 text-blue-800' :
                    order.type === 'Delivery' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {order.type}
                  </span>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="font-bold text-gray-900">${order.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Items Summary */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">{order.items.length} items:</p>
                  <div className="space-y-1 max-h-20 overflow-y-auto">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-700">{item.quantity}x {item.name}</span>
                        <span className="text-gray-600">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Estimated Time */}
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">ETA: {order.estimatedTime}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  {order.status === 'pending' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'preparing')}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Start Preparing
                    </button>
                  )}
                  {order.status === 'preparing' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'ready')}
                      className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Mark Ready
                    </button>
                  )}
                  {order.status === 'ready' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'completed')}
                      className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Complete Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">No orders match the current filter criteria.</p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Order Details - {selectedOrder.id}</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              {/* Customer Details */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Customer Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{selectedOrder.customer}</span>
                  </div>    
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{selectedOrder.phone}</span>
                  </div>
                  <p className="text-sm text-gray-600">{selectedOrder.email}</p>
                  {selectedOrder.address && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{selectedOrder.address}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <span className="font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      {item.notes && (
                        <p className="text-sm text-gray-600 bg-yellow-50 p-2 rounded border-l-4 border-yellow-400">
                          <strong>Special instructions:</strong> {item.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                  <span className="text-xl font-bold text-gray-900">${selectedOrder.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Order Time:</span>
                  <span className="text-sm text-gray-900">{selectedOrder.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Order Type:</span>
                  <span className="text-sm text-gray-900">{selectedOrder.type}</span>
                </div>
                {selectedOrder.table && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Table:</span>
                    <span className="text-sm text-gray-900">{selectedOrder.table}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;