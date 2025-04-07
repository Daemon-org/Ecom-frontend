import React, { useState, createContext, useContext } from 'react';
import { Product } from '../types/Product';
// Types
interface CartItem {
  product: Product;
  quantity: number;
}
interface CartContextType {
  cart: {
    items: CartItem[];
    total: number;
  };
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}
// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);
// Provider component
export const CartProvider: React.FC<{
  children: ReactNode;
}> = ({
  children
}) => {
  const [cart, setCart] = useState<{
    items: CartItem[];
    total: number;
  }>({
    items: [],
    total: 0
  });
  // Add to cart
  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(item => item.product.id === product.id);
      let newItems = [...prevCart.items];
      if (existingItemIndex >= 0) {
        // Update existing item
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
      } else {
        // Add new item
        newItems = [...newItems, {
          product,
          quantity
        }];
      }
      // Calculate new total
      const newTotal = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      return {
        items: newItems,
        total: newTotal
      };
    });
  };
  // Remove from cart
  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.product.id !== productId);
      // Calculate new total
      const newTotal = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      return {
        items: newItems,
        total: newTotal
      };
    });
  };
  // Update quantity
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart => {
      const newItems = prevCart.items.map(item => item.product.id === productId ? {
        ...item,
        quantity
      } : item);
      // Calculate new total
      const newTotal = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      return {
        items: newItems,
        total: newTotal
      };
    });
  };
  // Clear cart
  const clearCart = () => {
    setCart({
      items: [],
      total: 0
    });
  };
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};