import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { XIcon } from 'lucide-react';
import { mockProducts, mockCategories } from '../../data/mockData';
import { Product } from '../../types/Product';
const AddEditProduct = () => {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    images: [],
    requiresPrePayment: false,
    featured: false
  });
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  useEffect(() => {
    if (isEditing) {
      const product = mockProducts.find(p => p.id === id);
      if (product) {
        setFormData(product);
        setImageUrls(product.images);
      }
    }
  }, [id]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to save the product
    alert(isEditing ? 'Product updated!' : 'Product created!');
    navigate('/admin/products');
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // For now, we'll create a temporary URL
      const url = URL.createObjectURL(file);
      setImageUrls([...imageUrls, url]);
      setFormData({
        ...formData,
        images: [...(formData.images || []), url]
      });
    }
  };
  const removeImage = (index: number) => {
    const newImages = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImages);
    setFormData({
      ...formData,
      images: newImages
    });
  };
  return <div className="bg-white shadow-sm rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'Edit Product' : 'Add New Product'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input type="text" value={formData.name} onChange={e => setFormData({
            ...formData,
            name: e.target.value
          })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select value={formData.category} onChange={e => setFormData({
            ...formData,
            category: e.target.value
          })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required>
              <option value="">Select a category</option>
              {mockCategories.map(category => <option key={category.id} value={category.id}>
                  {category.name}
                </option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea value={formData.description} onChange={e => setFormData({
          ...formData,
          description: e.target.value
        })} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
        </div>
        {/* Price and Stock */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input type="number" value={formData.price} onChange={e => setFormData({
              ...formData,
              price: parseFloat(e.target.value)
            })} className="block w-full pl-7 pr-12 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500" placeholder="0.00" step="0.01" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <input type="number" value={formData.stock} onChange={e => setFormData({
            ...formData,
            stock: parseInt(e.target.value)
          })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
          </div>
        </div>
        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Images
          </label>
          <div className="mt-2 grid grid-cols-2 gap-4 md:grid-cols-4">
            {imageUrls.map((url, index) => <div key={index} className="relative">
                <img src={url} alt={`Product ${index + 1}`} className="h-32 w-full object-cover rounded-lg" />
                <button type="button" onClick={() => removeImage(index)} className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100">
                  <XIcon size={16} className="text-gray-600" />
                </button>
              </div>)}
            <div className="h-32 w-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <label className="cursor-pointer text-center p-4">
                <span className="text-blue-600 hover:text-blue-700">
                  Upload Image
                </span>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
          </div>
        </div>
        {/* Additional Options */}
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
        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={() => navigate('/admin/products')} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            {isEditing ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>;
};
export default AddEditProduct;