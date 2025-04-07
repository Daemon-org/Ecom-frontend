import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboardIcon, PackageIcon, LayersIcon, ShoppingCartIcon, UsersIcon, SettingsIcon, LogOutIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
const AdminLayout: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    logout
  } = useAuth();
  const menuItems = [{
    path: '/admin',
    icon: LayoutDashboardIcon,
    label: 'Dashboard'
  }, {
    path: '/admin/products',
    icon: PackageIcon,
    label: 'Products'
  }, {
    path: '/admin/categories',
    icon: LayersIcon,
    label: 'Categories'
  }, {
    path: '/admin/orders',
    icon: ShoppingCartIcon,
    label: 'Orders'
  }, {
    path: '/admin/customers',
    icon: UsersIcon,
    label: 'Customers'
  }, {
    path: '/admin/settings',
    icon: SettingsIcon,
    label: 'Settings'
  }];
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/admin" className="flex items-center">
                <span className="text-xl font-bold text-blue-600">
                  ShopEase Admin
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <Link to="/" className="text-gray-600 hover:text-gray-900 mr-4">
                View Store
              </Link>
              <button onClick={handleLogout} className="text-gray-600 hover:text-gray-900 flex items-center">
                <LogOutIcon size={20} className="mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm h-[calc(100vh-4rem)] fixed">
          <nav className="mt-5 px-2">
            {menuItems.map(item => {
            const Icon = item.icon;
            return <Link key={item.path} to={item.path} className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md ${location.pathname === item.path ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <Icon size={20} className={`mr-3 ${location.pathname === item.path ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'}`} />
                  {item.label}
                </Link>;
          })}
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 ml-64 p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>;
};
export default AdminLayout;