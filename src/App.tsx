import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AddEditProduct from './pages/admin/AddEditProduct';
import AdminCategories from './pages/admin/Categories';
import AdminOrders from './pages/admin/Orders';
import AdminCustomers from './pages/admin/Customers';
import AdminSettings from './pages/admin/Settings';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
export function App() {
  return <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/*" element={<ProtectedRoute requireAdmin>
                  <AdminLayout>
                    <Routes>
                      <Route path="/" element={<AdminDashboard />} />
                      <Route path="/products" element={<AdminProducts />} />
                      <Route path="/products/new" element={<AddEditProduct />} />
                      <Route path="/products/edit/:id" element={<AddEditProduct />} />
                      <Route path="/categories" element={<AdminCategories />} />
                      <Route path="/orders" element={<AdminOrders />} />
                      <Route path="/customers" element={<AdminCustomers />} />
                      <Route path="/settings" element={<AdminSettings />} />
                    </Routes>
                  </AdminLayout>
                </ProtectedRoute>} />
            {/* User Routes */}
            <Route path="/*" element={<div className="flex flex-col min-h-screen bg-gray-50">
                  <Header />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/products" element={<ProductsPage />} />
                      <Route path="/products/:id" element={<ProductDetailPage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/checkout" element={<ProtectedRoute>
                            <CheckoutPage />
                          </ProtectedRoute>} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/account" element={<ProtectedRoute>
                            <AccountPage />
                          </ProtectedRoute>} />
                    </Routes>
                  </main>
                  <Footer />
                </div>} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>;
}