import React from 'react';
import { Link } from 'react-router-dom';
import { mockOrders, mockProducts } from '../../data/mockData';
const AdminDashboard = () => {
  const totalSales = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const totalProducts = mockProducts.length;
  const totalOrders = mockOrders.length;
  const pendingOrders = mockOrders.filter(order => order.status === 'pending').length;
  return <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Total Sales</h3>
          <p className="text-3xl font-bold text-blue-600">
            ${totalSales.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Total Products</h3>
          <p className="text-3xl font-bold text-blue-600">{totalProducts}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-blue-600">{totalOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Pending Orders</h3>
          <p className="text-3xl font-bold text-blue-600">{pendingOrders}</p>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {mockOrders.slice(0, 5).map(order => <div key={order.id} className="flex justify-between items-center border-b border-gray-200 pb-4">
                <div>
                  <p className="font-semibold">Order #{order.id}</p>
                  <p className="text-sm text-gray-600">
                    {order.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                  {order.status}
                </span>
              </div>)}
          </div>
          <Link to="/admin/orders" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
            View All Orders →
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <Link to="/admin/products" className="block bg-gray-100 text-gray-700 px-4 py-3 rounded-md hover:bg-gray-200">
              Manage Products
            </Link>
            <Link to="/admin/categories" className="block bg-gray-100 text-gray-700 px-4 py-3 rounded-md hover:bg-gray-200">
              Manage Categories
            </Link>
            <Link to="/admin/orders" className="block bg-gray-100 text-gray-700 px-4 py-3 rounded-md hover:bg-gray-200">
              Manage Orders
            </Link>
          </div>
        </div>
      </div>
    </div>;
};
export default AdminDashboard;