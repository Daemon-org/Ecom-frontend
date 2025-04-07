import React from 'react';
import { Product, Category, Order } from '../types/Product';
export const mockCategories: Category[] = [{
  id: 'cat1',
  name: 'Electronics',
  description: 'Electronic devices and accessories',
  parentId: null
}, {
  id: 'cat2',
  name: 'Clothing',
  description: 'Apparel and fashion items',
  parentId: null
}, {
  id: 'cat3',
  name: 'Home & Garden',
  description: 'Items for home decoration and gardening',
  parentId: null
}, {
  id: 'cat4',
  name: 'Smartphones',
  description: 'Mobile phones and accessories',
  parentId: 'cat1'
}, {
  id: 'cat5',
  name: 'Laptops',
  description: 'Portable computers',
  parentId: 'cat1'
}, {
  id: 'cat6',
  name: "Men's Clothing",
  description: 'Clothing items for men',
  parentId: 'cat2'
}, {
  id: 'cat7',
  name: "Women's Clothing",
  description: 'Clothing items for women',
  parentId: 'cat2'
}];
export const mockProducts: Product[] = [{
  id: 'prod1',
  name: 'Smartphone X',
  description: 'Latest smartphone with advanced features and long battery life.',
  price: 799.99,
  images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  category: 'cat4',
  stock: 50,
  requiresPrePayment: true,
  featured: true,
  createdAt: new Date('2023-01-15')
}, {
  id: 'prod2',
  name: 'Laptop Pro',
  description: 'High-performance laptop for professionals and gamers.',
  price: 1299.99,
  images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  category: 'cat5',
  stock: 30,
  requiresPrePayment: true,
  featured: true,
  createdAt: new Date('2023-02-10')
}, {
  id: 'prod3',
  name: "Men's Casual Shirt",
  description: 'Comfortable cotton casual shirt for everyday wear.',
  price: 39.99,
  images: ['https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  category: 'cat6',
  stock: 100,
  requiresPrePayment: false,
  featured: false,
  createdAt: new Date('2023-02-15')
}, {
  id: 'prod4',
  name: "Women's Summer Dress",
  description: 'Elegant summer dress with floral pattern.',
  price: 59.99,
  images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  category: 'cat7',
  stock: 80,
  requiresPrePayment: false,
  featured: true,
  createdAt: new Date('2023-02-20')
}, {
  id: 'prod5',
  name: 'Smart Watch',
  description: 'Fitness tracker and smartwatch with health monitoring features.',
  price: 199.99,
  images: ['https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  category: 'cat4',
  stock: 45,
  requiresPrePayment: true,
  featured: false,
  createdAt: new Date('2023-03-05')
}, {
  id: 'prod6',
  name: 'Wireless Headphones',
  description: 'Noise-canceling wireless headphones with premium sound quality.',
  price: 149.99,
  images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  category: 'cat1',
  stock: 60,
  requiresPrePayment: false,
  featured: true,
  createdAt: new Date('2023-03-10')
}, {
  id: 'prod7',
  name: 'Indoor Plant Set',
  description: 'Set of 3 easy-care indoor plants with decorative pots.',
  price: 49.99,
  images: ['https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  category: 'cat3',
  stock: 25,
  requiresPrePayment: false,
  featured: false,
  createdAt: new Date('2023-03-15')
}, {
  id: 'prod8',
  name: 'Kitchen Knife Set',
  description: 'Professional chef knife set with wooden block.',
  price: 89.99,
  images: ['https://images.unsplash.com/photo-1593618998160-c4d5a1b30f9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  category: 'cat3',
  stock: 40,
  requiresPrePayment: false,
  featured: false,
  createdAt: new Date('2023-03-20')
}];
export const mockOrders: Order[] = [{
  id: 'order1',
  userId: 'user1',
  items: [{
    productId: 'prod1',
    productName: 'Smartphone X',
    quantity: 1,
    price: 799.99
  }, {
    productId: 'prod6',
    productName: 'Wireless Headphones',
    quantity: 1,
    price: 149.99
  }],
  total: 949.98,
  status: 'delivered',
  paymentStatus: 'paid',
  createdAt: new Date('2023-04-10'),
  updatedAt: new Date('2023-04-15'),
  shippingAddress: {
    fullName: 'John Doe',
    address: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    postalCode: '12345',
    country: 'USA'
  }
}, {
  id: 'order2',
  userId: 'user1',
  items: [{
    productId: 'prod3',
    productName: "Men's Casual Shirt",
    quantity: 2,
    price: 39.99
  }],
  total: 79.98,
  status: 'shipped',
  paymentStatus: 'paid',
  createdAt: new Date('2023-04-20'),
  updatedAt: new Date('2023-04-22'),
  shippingAddress: {
    fullName: 'John Doe',
    address: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    postalCode: '12345',
    country: 'USA'
  }
}, {
  id: 'order3',
  userId: 'admin1',
  items: [{
    productId: 'prod2',
    productName: 'Laptop Pro',
    quantity: 1,
    price: 1299.99
  }],
  total: 1299.99,
  status: 'pending',
  paymentStatus: 'pending',
  createdAt: new Date('2023-04-25'),
  updatedAt: new Date('2023-04-25'),
  shippingAddress: {
    fullName: 'Admin User',
    address: '456 Admin Ave',
    city: 'Adminville',
    state: 'NY',
    postalCode: '67890',
    country: 'USA'
  }
}];