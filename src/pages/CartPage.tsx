import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { TrashIcon } from 'lucide-react';
const CartPage = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart
  } = useCart();
  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    updateQuantity(productId, quantity);
  };
  return <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {cart.items.length === 0 ? <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link to="/products" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
            Continue Shopping
          </Link>
        </div> : <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {cart.items.map(item => <div key={item.product.id} className="flex flex-col sm:flex-row gap-4 border-b border-gray-200 py-4">
                <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-24 object-cover rounded" />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{item.product.name}</h3>
                  <p className="text-gray-600">
                    ${item.product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center mt-2">
                    <button onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)} className="bg-gray-100 px-3 py-1 rounded-l">
                      -
                    </button>
                    <input type="number" value={item.quantity} onChange={e => handleQuantityChange(item.product.id, parseInt(e.target.value))} className="w-16 text-center border-y border-gray-200 py-1" />
                    <button onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)} className="bg-gray-100 px-3 py-1 rounded-r">
                      +
                    </button>
                    <button onClick={() => removeFromCart(item.product.id)} className="ml-4 text-red-600 hover:text-red-800">
                      <TrashIcon size={20} />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>)}
          </div>
          <div className="lg:w-1/3">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Link to="/checkout" className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 block text-center">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>}
    </div>;
};
export default CartPage;