import React from 'react';
import { useCart } from '../contexts/CartContext';
const CheckoutPage = () => {
  const {
    cart
  } = useCart();
  return <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">First Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Last Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2" />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Address</label>
                <input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">City</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">State</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">ZIP Code</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2" />
                </div>
              </div>
            </form>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Card Number</label>
                <input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2" placeholder="**** **** **** ****" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2" placeholder="MM/YY" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">CVV</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2" placeholder="***" />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cart.items.map(item => <div key={item.product.id} className="flex justify-between">
                  <span>
                    {item.product.name} x {item.quantity}
                  </span>
                  <span>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>)}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default CheckoutPage;