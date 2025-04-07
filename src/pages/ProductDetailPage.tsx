import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCartIcon, HeartIcon, ArrowLeftIcon } from 'lucide-react';
import { mockProducts, mockCategories } from '../data/mockData';
import { Product } from '../types/Product';
import { useCart } from '../contexts/CartContext';
const ProductDetailPage = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const {
    addToCart
  } = useCart();
  // Load product data
  useEffect(() => {
    if (id) {
      const foundProduct = mockProducts.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.images[0]);
        // Find category name
        const productCategory = mockCategories.find(c => c.id === foundProduct.category);
        setCategory(productCategory?.name || '');
        // Find related products (same category, excluding current product)
        const related = mockProducts.filter(p => p.category === foundProduct.category && p.id !== id).slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [id]);
  // Handle quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= (product?.stock || 1)) {
      setQuantity(value);
    }
  };
  // Handle add to cart
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert(`${quantity} ${product.name} added to cart!`);
    }
  };
  if (!product) {
    return <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/products" className="text-blue-600 hover:underline">
          Back to Products
        </Link>
      </div>;
  }
  return <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="text-gray-600 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link to="/products" className="text-gray-600 hover:text-blue-600">
                    Products
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-500">{product.name}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        {/* Back button (mobile) */}
        <div className="lg:hidden mb-4">
          <Link to="/products" className="inline-flex items-center text-blue-600">
            <ArrowLeftIcon size={16} className="mr-1" /> Back to Products
          </Link>
        </div>
        {/* Product Details */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="mb-4">
              <img src={selectedImage} alt={product.name} className="w-full h-auto rounded-lg" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => <button key={index} onClick={() => setSelectedImage(image)} className={`border-2 rounded-md overflow-hidden ${selectedImage === image ? 'border-blue-600' : 'border-gray-200'}`}>
                  <img src={image} alt={`${product.name} - View ${index + 1}`} className="w-full h-24 object-cover" />
                </button>)}
            </div>
          </div>
          {/* Product Info */}
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-blue-600 mr-4">
                ${product.price.toFixed(2)}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            {category && <div className="mb-4">
                <span className="text-gray-600">Category: </span>
                <Link to={`/products?category=${product.category}`} className="text-blue-600 hover:underline">
                  {category}
                </Link>
              </div>}
            <div className="mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>
            {product.requiresPrePayment && <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-6">
                <p className="text-yellow-800">
                  <strong>Note:</strong> This product requires pre-payment
                  before shipping.
                </p>
              </div>}
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-gray-700 mb-2">
                Quantity:
              </label>
              <div className="flex items-center">
                <button onClick={() => quantity > 1 && setQuantity(quantity - 1)} className="bg-gray-200 px-3 py-1 rounded-l-md" disabled={quantity <= 1}>
                  -
                </button>
                <input type="number" id="quantity" value={quantity} onChange={handleQuantityChange} min="1" max={product.stock} className="w-16 text-center border-t border-b border-gray-300 py-1" />
                <button onClick={() => quantity < product.stock && setQuantity(quantity + 1)} className="bg-gray-200 px-3 py-1 rounded-r-md" disabled={quantity >= product.stock}>
                  +
                </button>
                <span className="ml-3 text-gray-600">
                  {product.stock} available
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={handleAddToCart} className="flex-1 bg-blue-600 text-white hover:bg-blue-700 py-3 px-6 rounded-md font-medium flex items-center justify-center" disabled={product.stock <= 0}>
                <ShoppingCartIcon size={20} className="mr-2" />
                Add to Cart
              </button>
              <button className="flex-1 sm:flex-none border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-6 rounded-md font-medium flex items-center justify-center">
                <HeartIcon size={20} className="mr-2" />
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <a href="#" className="border-b-2 border-blue-600 py-4 px-1 text-sm font-medium text-blue-600">
                Product Details
              </a>
              <a href="#" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Specifications
              </a>
              <a href="#" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Reviews
              </a>
            </nav>
          </div>
          <div className="py-6">
            <h3 className="text-lg font-semibold mb-4">Product Description</h3>
            <div className="text-gray-700 space-y-4">
              <p>{product.description}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
            </div>
          </div>
        </div>
        {/* Related Products */}
        {relatedProducts.length > 0 && <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Link to={`/products/${relatedProduct.id}`}>
                    <img src={relatedProduct.images[0]} alt={relatedProduct.name} className="w-full h-48 object-cover" />
                  </Link>
                  <div className="p-4">
                    <Link to={`/products/${relatedProduct.id}`}>
                      <h3 className="text-lg font-semibold mb-2">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mb-2 line-clamp-2">
                      {relatedProduct.description}
                    </p>
                    <p className="text-xl font-bold text-blue-600">
                      ${relatedProduct.price.toFixed(2)}
                    </p>
                  </div>
                </div>)}
            </div>
          </div>}
      </div>
    </div>;
};
export default ProductDetailPage;