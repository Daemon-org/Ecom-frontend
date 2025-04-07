import React, { useState } from 'react';
import { mockCategories } from '../../data/mockData';
import { PencilIcon, TrashIcon, PlusIcon } from 'lucide-react';
import AddEditCategoryModal from '../../components/modals/AddEditCategoryModal';
const AdminCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined);
  const handleAddCategory = () => {
    setEditingCategory(undefined);
    setIsModalOpen(true);
  };
  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };
  const handleSaveCategory = (category: Partial<Category>) => {
    console.log('Saving category:', category);
    alert(editingCategory ? 'Category updated!' : 'Category created!');
  };
  return <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Categories</h1>
        <button onClick={handleAddCategory} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
          <PlusIcon size={20} className="mr-2" />
          Add Category
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Products Count
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockCategories.map(category => <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {category.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {category.productsCount} products
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-4">
                    <PencilIcon size={20} />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <TrashIcon size={20} />
                  </button>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
      <AddEditCategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} category={editingCategory} onSave={handleSaveCategory} />
    </div>;
};
export default AdminCategories;