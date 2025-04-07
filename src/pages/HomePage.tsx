import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { mockProducts, mockCategories } from '../data/mockData';
const HomePage = () => {
  // Get featured products
  const featuredProducts = mockProducts.filter(product => product.featured);
  // Get parent categories
  const parentCategories = mockCategories.filter(category => category.parentId === null);
  return <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to ShopEase
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover a wide range of products with secure payment options and
            fast delivery.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-md font-semibold text-lg">
              Shop Now
            </Link>
            <Link to="/products?category=featured" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-md font-semibold text-lg">
              Featured Products
            </Link>
          </div>
        </div>
      </section>
      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products?category=featured" className="text-blue-600 hover:underline flex items-center">
              View All <ArrowRightIcon size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.slice(0, 4).map(product => <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Link to={`/products/${product.id}`}>
                  <img src={product.images[0]} alt={product.name} className="w-full h-64 object-cover" />
                </Link>
                <div className="p-4">
                  <Link to={`/products/${product.id}`} className="block">
                    <h3 className="text-lg font-semibold mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="text-xl font-bold text-blue-600">
                      ${product.price.toFixed(2)}
                    </p>
                  </Link>
                  <div className="mt-4">
                    <Link to={`/products/${product.id}`} className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium w-full block text-center">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </section>
      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {parentCategories.map(category => <Link key={category.id} to={`/products?category=${category.id}`} className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-3">{category.description}</p>
                <span className="text-blue-600 flex items-center">
                  Browse Products <ArrowRightIcon size={16} className="ml-1" />
                </span>
              </Link>)}
          </div>
        </div>
      </section>
      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why Choose ShopEase
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your products delivered quickly and efficiently to your
                doorstep.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
              <p className="text-gray-600">
                Multiple secure payment options for your convenience and peace
                of mind.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Products</h3>
              <p className="text-gray-600">
                Curated selection of high-quality products from trusted
                suppliers.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Newsletter Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Stay updated with the latest products, exclusive offers, and
            promotions.
          </p>
          <form className="max-w-md mx-auto flex">
            <input type="email" placeholder="Enter your email" className="flex-grow px-4 py-3 rounded-l-md text-gray-900 focus:outline-none" />
            <button type="submit" className="bg-gray-900 text-white px-6 py-3 rounded-r-md font-medium hover:bg-gray-800">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>;
};
export default HomePage;