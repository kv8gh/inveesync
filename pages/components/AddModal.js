import React, { useEffect, useState } from 'react';
import { notify } from './Notification';

export default function AddModal({ isOpen, onRequestClose, onSubmit, item }) {
  const [itemName, setItemName] = useState('');
  const [itemStock, setItemStock] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (item) {
      setItemName(item.name || '');
      setItemStock(item.stock || '');
    }
  }, [item]);

  const handleSubmit = (e) => {

    // Check if input fields are not empty
    if (!itemName.trim() || !itemStock.trim()) {
      setError('Please fill out all fields');
      return;
    }

    // Call the onSubmit function and pass the new item
    onSubmit({ name: itemName, stock: parseInt(itemStock) });

    // Clear input fields and error message
    setItemName('');
    setItemStock('');
    setError('');

    // Close the modal
    onRequestClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Add New Item
                  </h3>
                  <div className="mt-2">
                    <div className="mb-4">
                      <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">
                        Item Name
                      </label>
                      <input
                        type="text"
                        id="itemName"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="itemStock" className="block text-sm font-medium text-gray-700">
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        id="itemStock"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={itemStock}
                        onChange={(e) => setItemStock(e.target.value)}
                      />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Add Item
              </button>
              <button
                type="button"
                onClick={onRequestClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
