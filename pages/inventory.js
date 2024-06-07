import { useState, useEffect } from "react";
import AddModal from "./components/AddModal.js";
import EditModal from "./components/EditModal.js";
import Notification from "./components/Notification.js";
import { notify } from "./components/Notification.js";
import LoadingIndicator from "./components/Loader.js";
import { useRouter } from "next/router.js";

export default function Inventory() {
  // State variables
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("All");
  const [newItem, setNewItem] = useState({ name: "", stock: 0 });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Function to fetch initial data from local storage
  useEffect(() => {
    const storedData = localStorage.getItem("inventoryData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setItems(parsedData.items);
    }
  }, []);

  // Function to handle adding item
  const handleAddItem = (newItemData) => {
    setItems([...items, newItemData]);

    // Update local storage
    const updatedItems = [...items, newItemData];
    localStorage.setItem(
      "inventoryData",
      JSON.stringify({ items: updatedItems })
    );

    // Notify user
    notify("Item added successfully!");
  };

  // Function to handle editing item
  const handleEditItem = (updatedItem) => {
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      }
      return item;
    });

    setItems(updatedItems);

    // Update local storage
    localStorage.setItem(
      "inventoryData",
      JSON.stringify({ items: updatedItems })
    );

    // Close the modal
    setIsEditModalOpen(false);

    // Notify user
    notify("Item updated successfully!");
  };

  // Function to handle deleting item
  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
    notify("Item deleted successfully!");
  };

  // Function to handle clicking on item for editing
  const handleItemClick = (item) => {
    // Open modal with the selected item for editing
    setSelectedItem(item); // Set selected item to be edited
    setIsEditModalOpen(true);
  };

  // Function to filter items based on stock
  const filteredItems = items.filter((item) => {
    if (filter === "In Stock") return item.stock > 0;
    if (filter === "Out of Stock") return item.stock === 0;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Back to Home
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
      <div className="mb-4">
        <label className="block">
          Filter by Stock:
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="All">All</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </label>
      </div>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <ul className="space-y-2">
          {filteredItems.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center bg-slate-200 rounded-md shadow-sm p-4"
            >
              <div>
                <p className="text-lg font-semibold">{item.name}</p>
                <p>Stock: {item.stock}</p>
              </div>
              <div className="flex flex-row w-1/4 justify-evenly">
                <button
                  onClick={() => handleItemClick(item)}
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="bg-red-500 hover:text-red-700 text-white py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="my-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Item
        </button>
      </div>
      <AddModal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddItem}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditItem}
        item={selectedItem}
      />
      <Notification />
    </div>
  );
}
