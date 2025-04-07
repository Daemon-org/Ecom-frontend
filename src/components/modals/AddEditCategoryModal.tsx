import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
import { Category } from '../../types/Product';
import { mockCategories } from '../../data/mockData';
interface AddEditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: Category;
  onSave: (category: Partial<Category>) => void;
}
const AddEditCategoryModal: React.FC<AddEditCategoryModalProps> = ({
  isOpen,
  onClose,
  category,
  onSave
}) => {
  const [formData, setFormData] = useState<Partial<Category>>(category || {
    name: '',
    description: '',
    parentId: null
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };
  if (!isOpen) return null;
  const parentCategories = mockCategories.filter(cat => cat.parentId === null);
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {category ? 'Edit Category' : 'Add New Category'}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Name
              </label>
              <input type="text" value={formData.name} onChange={e => setFormData({
              ...formData,
              name: e.target.value
            })} className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea value={formData.description} onChange={e => setFormData({
              ...formData,
              description: e.target.value
            })} rows={3} className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parent Category
              </label>
              <select value={formData.parentId || ''} onChange={e => setFormData({
              ...formData,
              parentId: e.target.value || null
            })} className="w-full border rounded-md px-3 py-2">
                <option value="">None (Top Level Category)</option>
                {parentCategories.map(parent => <option key={parent.id} value={parent.id}>
                    {parent.name}
                  </option>)}
              </select>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                {category ? 'Update Category' : 'Create Category'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default AddEditCategoryModal;