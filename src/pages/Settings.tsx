import React from 'react';
import { Users, FileText } from 'lucide-react';

const Settings = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Users className="w-6 h-6 text-blue-900 mr-3" />
            <h2 className="text-xl font-semibold">User Management</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">John Smith</h3>
                  <p className="text-sm text-gray-600">Administrator</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800">Edit</button>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Sarah Johnson</h3>
                  <p className="text-sm text-gray-600">Case Manager</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800">Edit</button>
              </div>
            </div>
            <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500">
              + Add User
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FileText className="w-6 h-6 text-blue-900 mr-3" />
            <h2 className="text-xl font-semibold">Document Templates</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Letter of Representation</h3>
              <p className="text-sm text-gray-600 mt-1">Last modified: Mar 10, 2024</p>
              <div className="flex space-x-2 mt-2">
                <button className="text-blue-600 hover:text-blue-800">Edit</button>
                <button className="text-blue-600 hover:text-blue-800">Preview</button>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Collision Report Request</h3>
              <p className="text-sm text-gray-600 mt-1">Last modified: Mar 8, 2024</p>
              <div className="flex space-x-2 mt-2">
                <button className="text-blue-600 hover:text-blue-800">Edit</button>
                <button className="text-blue-600 hover:text-blue-800">Preview</button>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Demand Letter</h3>
              <p className="text-sm text-gray-600 mt-1">Last modified: Mar 5, 2024</p>
              <div className="flex space-x-2 mt-2">
                <button className="text-blue-600 hover:text-blue-800">Edit</button>
                <button className="text-blue-600 hover:text-blue-800">Preview</button>
              </div>
            </div>
            <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500">
              + Add Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;