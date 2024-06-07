import { useState, useEffect } from 'react';
import Link from 'next/link';
import Notification from './components/Notification';
import { notify } from './components/Notification';
import LoadingIndicator from './components/Loader';
import { useRouter } from 'next/router';

export async function getStaticProps() {
  const data = await import('./data.json');
  return {
    props: {
      orders: data.orders,
      items: data.items,
    },
  };
}

export default function Orders({ orders, items }) {
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    let updatedOrders = [...orders];

    if (statusFilter !== 'All') {
      updatedOrders = updatedOrders.filter(order => order.status === statusFilter);
    }

    if (sortField) {
      updatedOrders.sort((a, b) => {
        if (sortField === 'customer') {
          return a.customer.localeCompare(b.customer);
        } else if (sortField === 'itemCount') {
          return b.items.length - a.items.length;
        }
        return 0;
      });
    }

    setFilteredOrders(updatedOrders);
    setIsLoading(false);
  }, [statusFilter, sortField, orders]);

  const handleCompleteOrder = (orderId) => {
    // Simulate an API call to complete the order
    notify('Order marked as completed!');
    setFilteredOrders(filteredOrders.map(order => order.id === orderId ? { ...order, status: 'Completed' } : order));
  };

  return (
    <div className="container flex flex-col items-center mx-auto px-4 py-8">
    
      <h1 className="text-2xl font-bold mb-4">Order List</h1>
      <div className="mb-4 flex flex-col justify-evenly gap-2 md:flex-row md:items-center space-x-4">
        <label className="flex items-center space-x-2">
          <span>Filter by Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded p-2"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        <label className="flex items-center space-x-2">
          <span>Sort by:</span>
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="border border-gray-300 rounded p-2"
          >
            <option value="">None</option>
            <option value="customer">Customer Name</option>
            <option value="itemCount">Item Count</option>
          </select>
        </label>
      </div>
      {isLoading ? <LoadingIndicator /> : (
        <div className="p-4 min-w-full flex justify-center items-center">
          <table className=" bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Order ID</th>
                <th className="px-4 py-2 border-b">Customer Name</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Item Count</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-100" onClick={()=>router.push(`/orders/${order.id}`)}>
                  <td className="px-4 py-2 text-center border-b">{order.id}</td>
                  <td className="px-4 py-2 text-center border-b">
                      {order.customer}
                  </td>
                  <td className={`px-2 py-2 text-center border-b ${order.status === 'Pending' ? 'text-red-500' : 'text-green-500'}`}>
                    {order.status}
                  </td>
                  <td className="px-4 py-2 text-center border-b">{order.items.length}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}
      <Notification />
      <div className="mb-4">
        <button
          type="button"
          onClick={()=>router.push('/')}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
