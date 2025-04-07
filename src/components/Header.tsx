import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon, MenuIcon, SearchIcon, XIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const {
    user,
    logout
  } = useAuth();
  const {
    cart
  } = useCart();
  const navigate = useNavigate();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/products?search=${searchQuery}`);
    setSearchQuery('');
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            ShopEase
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600">
              Products
            </Link>
            <Link to="/products?category=featured" className="text-gray-700 hover:text-blue-600">
              Featured
            </Link>
            <Link to="/products?category=new" className="text-gray-700 hover:text-blue-600">
              New Arrivals
            </Link>
          </nav>
          {/* Search, Cart, User */}
          <div className="hidden md:flex items-center space-x-6">
            <form onSubmit={handleSearch} className="relative">
              <input type="text" placeholder="Search products..." className="py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              <button type="submit" className="absolute right-3 top-2.5 text-gray-500">
                <SearchIcon size={20} />
              </button>
            </form>
            <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
              <ShoppingCartIcon size={24} />
              {cart.items.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.items.length}
                </span>}
            </Link>
            {user ? <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-blue-600">
                  <UserIcon size={24} />
                </button>
                <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg py-1 z-20 hidden group-hover:block">
                  <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Account
                  </Link>
                  <Link to="/account/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Orders
                  </Link>
                  {user.isAdmin && <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Admin Dashboard
                    </Link>}
                  <button onClick={() => logout()} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              </div> : <Link to="/login" className="text-gray-700 hover:text-blue-600">
                <UserIcon size={24} />
              </Link>}
          </div>
          {/* Mobile menu button */}
          <button className="md:hidden text-gray-500 hover:text-gray-700" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && <div className="md:hidden mt-4 py-2">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input type="text" placeholder="Search products..." className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                <button type="submit" className="absolute right-3 top-2.5 text-gray-500">
                  <SearchIcon size={20} />
                </button>
              </div>
            </form>
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                Products
              </Link>
              <Link to="/products?category=featured" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                Featured
              </Link>
              <Link to="/products?category=new" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                New Arrivals
              </Link>
              <Link to="/cart" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                Cart ({cart.items.length})
              </Link>
              {user ? <>
                  <Link to="/account" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                    My Account
                  </Link>
                  <Link to="/account/orders" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                    Orders
                  </Link>
                  {user.isAdmin && <Link to="/admin" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                      Admin Dashboard
                    </Link>}
                  <button onClick={() => {
              logout();
              setIsMenuOpen(false);
            }} className="text-left text-gray-700 hover:text-blue-600">
                    Logout
                  </button>
                </> : <Link to="/login" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                  Login / Register
                </Link>}
            </nav>
          </div>}
      </div>
    </header>;
};
export default Header;