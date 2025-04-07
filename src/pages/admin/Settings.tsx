import React, { useState } from 'react';
import { SaveIcon } from 'lucide-react';
const AdminSettings = () => {
  const [settings, setSettings] = useState({
    storeName: 'ShopEase',
    storeEmail: 'admin@shopease.com',
    currency: 'USD',
    timezone: 'UTC',
    orderPrefix: 'ORD-',
    taxRate: '10',
    enableNotifications: true,
    requireAccountForCheckout: false,
    maintenanceMode: false
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle saving settings
    alert('Settings saved successfully!');
  };
  return <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
          <SaveIcon size={20} className="mr-2" />
          Save Changes
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Store Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Store Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store Name
              </label>
              <input type="text" value={settings.storeName} onChange={e => setSettings({
              ...settings,
              storeName: e.target.value
            })} className="w-full border rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store Email
              </label>
              <input type="email" value={settings.storeEmail} onChange={e => setSettings({
              ...settings,
              storeEmail: e.target.value
            })} className="w-full border rounded-md px-3 py-2" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select value={settings.currency} onChange={e => setSettings({
                ...settings,
                currency: e.target.value
              })} className="w-full border rounded-md px-3 py-2">
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Timezone
                </label>
                <select value={settings.timezone} onChange={e => setSettings({
                ...settings,
                timezone: e.target.value
              })} className="w-full border rounded-md px-3 py-2">
                  <option value="UTC">UTC</option>
                  <option value="EST">EST</option>
                  <option value="PST">PST</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* Order Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Order Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order Prefix
              </label>
              <input type="text" value={settings.orderPrefix} onChange={e => setSettings({
              ...settings,
              orderPrefix: e.target.value
            })} className="w-full border rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tax Rate (%)
              </label>
              <input type="number" value={settings.taxRate} onChange={e => setSettings({
              ...settings,
              taxRate: e.target.value
            })} className="w-full border rounded-md px-3 py-2" />
            </div>
          </div>
        </div>
        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Enable Email Notifications
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={settings.enableNotifications} onChange={e => setSettings({
                ...settings,
                enableNotifications: e.target.checked
              })} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Require Account for Checkout
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={settings.requireAccountForCheckout} onChange={e => setSettings({
                ...settings,
                requireAccountForCheckout: e.target.checked
              })} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Maintenance Mode
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={settings.maintenanceMode} onChange={e => setSettings({
                ...settings,
                maintenanceMode: e.target.checked
              })} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default AdminSettings;