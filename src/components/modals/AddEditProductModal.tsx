import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
import { mockCategories } from '../../data/mockData';
import { Product } from '../../types/Product';
interface AddEditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  onSave: (product: Partial<Product>) => void;
}
const AddEditProductModal: React.FC<AddEditProductModalProps> = ({
  isOpen,
  onClose,
  product,
  onSave
}) => {
  const [formData, setFormData] = useState<Partial<Product>>(product || {
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    images: [],
    requiresPrePayment: false,
    featured: false
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input type="text" value={formData.name} onChange={e => setFormData({
                ...formData,
                name: e.target.value
              })} className="w-full border rounded-md px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select value={formData.category} onChange={e => setFormData({
                ...formData,
                category: e.target.value
              })} className="w-full border rounded-md px-3 py-2" required>
                  <option value="">Select a category</option>
                  {mockCategories.map(category => <option key={category.id} value={category.id}>
                      {category.name}
                    </option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea value={formData.description} onChange={e => setFormData({
              ...formData,
              description: e.target.value
            })} rows={4} className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($)
                </label>
                <input type="number" step="0.01" value={formData.price} onChange={e => setFormData({
                ...formData,
                price: parseFloat(e.target.value)
              })} className="w-full border rounded-md px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input type="number" value={formData.stock} onChange={e => setFormData({
                ...formData,
                stock: parseInt(e.target.value)
              })} className="w-full border rounded-md px-3 py-2" required />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <input type="checkbox" id="requiresPrePayment" checked={formData.requiresPrePayment} onChange={e => setFormData({
                ...formData,
                requiresPrePayment: e.target.checked
              })} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="requiresPrePayment" className="ml-2 text-sm text-gray-700">
                  Requires Pre-payment
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="featured" checked={formData.featured} onChange={e => setFormData({
                ...formData,
                featured: e.target.checked
              })} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                  Featured Product
                </label>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                {product ? 'Update Product' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default AddEditProductModal;