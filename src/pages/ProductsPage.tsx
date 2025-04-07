import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FilterIcon, GridIcon, ListIcon } from 'lucide-react';
import { mockProducts, mockCategories } from '../data/mockData';
import { Product, Category } from '../types/Product';
import { useCart } from '../contexts/CartContext';
const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<{
    min: number;
    max: number;
  }>({
    min: 0,
    max: 2000
  });
  const [sortOption, setSortOption] = useState<string>('featured');
  const {
    addToCart
  } = useCart();
  // Load products and categories
  useEffect(() => {
    setProducts(mockProducts);
    setCategories(mockCategories);
  }, []);
  // Handle filtering and sorting
  useEffect(() => {
    let result = [...products];
    const categoryParam = searchParams.get('category');
    const searchQuery = searchParams.get('search');
    // Filter by category if specified
    if (categoryParam) {
      if (categoryParam === 'featured') {
        result = result.filter(product => product.featured);
      } else if (categoryParam === 'new') {
        // Sort by date and get the newest items
        result = [...result].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 8);
      } else {
        setSelectedCategory(categoryParam);
        // Get the specified category and its children
        const categoryIds = [categoryParam];
        mockCategories.forEach(cat => {
          if (cat.parentId === categoryParam) {
            categoryIds.push(cat.id);
          }
        });
        result = result.filter(product => categoryIds.includes(product.category));
      }
    }
    // Filter by search query if specified
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query));
    }
    // Filter by selected category (from sidebar)
    if (selectedCategory && !categoryParam) {
      const categoryIds = [selectedCategory];
      mockCategories.forEach(cat => {
        if (cat.parentId === selectedCategory) {
          categoryIds.push(cat.id);
        }
      });
      result = result.filter(product => categoryIds.includes(product.category));
    }
    // Filter by price range
    result = result.filter(product => product.price >= priceRange.min && product.price <= priceRange.max);
    // Sort products
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'featured':
      default:
        // Featured products first, then sort by name
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.name.localeCompare(b.name);
        });
    }
    setFilteredProducts(result);
  }, [products, searchParams, selectedCategory, priceRange, sortOption]);
  // Get parent categories
  const parentCategories = categories.filter(category => category.parentId === null);
  // Get child categories for a parent
  const getChildCategories = (parentId: string) => {
    return categories.filter(category => category.parentId === parentId);
  };
  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };
  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    alert(`${product.name} added to cart!`);
  };
  return <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Products</h1>
          <p className="text-gray-600">
            {filteredProducts.length} products available
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Filter Toggle */}
          <button className="lg:hidden bg-white p-3 rounded-md shadow mb-4 flex items-center justify-center" onClick={() => setShowFilters(!showFilters)}>
            <FilterIcon size={20} className="mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Categories</h2>
              <ul className="space-y-2">
                {parentCategories.map(category => <li key={category.id}>
                    <button className={`text-left w-full py-1 ${selectedCategory === category.id ? 'font-semibold text-blue-600' : 'text-gray-700'}`} onClick={() => handleCategorySelect(category.id)}>
                      {category.name}
                    </button>
                    {/* Show child categories if parent is selected */}
                    {selectedCategory === category.id && <ul className="ml-4 mt-1 space-y-1">
                        {getChildCategories(category.id).map(childCat => <li key={childCat.id}>
                            <button className={`text-left w-full py-1 ${selectedCategory === childCat.id ? 'font-semibold text-blue-600' : 'text-gray-600'}`} onClick={() => handleCategorySelect(childCat.id)}>
                              {childCat.name}
                            </button>
                          </li>)}
                      </ul>}
                  </li>)}
              </ul>
              <div className="border-t border-gray-200 my-6 pt-6">
                <h2 className="text-lg font-semibold mb-4">Price Range</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>${priceRange.min}</span>
                    <span>${priceRange.max}</span>
                  </div>
                  <input type="range" min="0" max="2000" value={priceRange.max} onChange={e => setPriceRange({
                  ...priceRange,
                  max: parseInt(e.target.value)
                })} className="w-full" />
                </div>
              </div>
              <div className="border-t border-gray-200 my-6 pt-6">
                <h2 className="text-lg font-semibold mb-4">
                  Payment Requirements
                </h2>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                    <span className="ml-2 text-gray-700">
                      Pre-payment required
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                    <span className="ml-2 text-gray-700">Pay on delivery</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Sort and View Options */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center">
                <label htmlFor="sort" className="text-gray-700 mr-2">
                  Sort by:
                </label>
                <select id="sort" value={sortOption} onChange={e => setSortOption(e.target.value)} className="border rounded-md p-2">
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <button className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`} onClick={() => setViewMode('grid')} aria-label="Grid view">
                  <GridIcon size={20} />
                </button>
                <button className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`} onClick={() => setViewMode('list')} aria-label="List view">
                  <ListIcon size={20} />
                </button>
              </div>
            </div>
            {/* No Products Found */}
            {filteredProducts.length === 0 && <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search criteria.
                </p>
                <button onClick={() => {
              setSelectedCategory(null);
              setPriceRange({
                min: 0,
                max: 2000
              });
            }} className="text-blue-600 hover:underline">
                  Clear all filters
                </button>
              </div>}
            {/* Grid View */}
            {viewMode === 'grid' && filteredProducts.length > 0 && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <Link to={`/products/${product.id}`}>
                      <img src={product.images[0]} alt={product.name} className="w-full h-64 object-cover" />
                    </Link>
                    <div className="p-4">
                      <Link to={`/products/${product.id}`}>
                        <h3 className="text-lg font-semibold mb-2">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-gray-600 mb-2 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-xl font-bold text-blue-600">
                          ${product.price.toFixed(2)}
                        </p>
                        {product.requiresPrePayment && <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                            Pre-payment
                          </span>}
                      </div>
                      <button onClick={() => handleAddToCart(product)} className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium w-full">
                        Add to Cart
                      </button>
                    </div>
                  </div>)}
              </div>}
            {/* List View */}
            {viewMode === 'list' && filteredProducts.length > 0 && <div className="space-y-6">
                {filteredProducts.map(product => <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col sm:flex-row">
                    <Link to={`/products/${product.id}`} className="sm:w-1/3">
                      <img src={product.images[0]} alt={product.name} className="w-full h-64 sm:h-full object-cover" />
                    </Link>
                    <div className="p-4 sm:w-2/3 flex flex-col">
                      <div className="flex-grow">
                        <Link to={`/products/${product.id}`}>
                          <h3 className="text-xl font-semibold mb-2">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-gray-600 mb-4">
                          {product.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <p className="text-xl font-bold text-blue-600">
                            ${product.price.toFixed(2)}
                          </p>
                          {product.requiresPrePayment && <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                              Pre-payment
                            </span>}
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            In Stock: {product.stock}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button onClick={() => handleAddToCart(product)} className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium">
                          Add to Cart
                        </button>
                        <Link to={`/products/${product.id}`} className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md font-medium">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>)}
              </div>}
          </div>
        </div>
      </div>
    </div>;
};
export default ProductsPage;