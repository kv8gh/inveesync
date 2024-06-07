import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import data from "@/pages/data.json";
import Notification from "@/pages/components/Notification";
import { notify } from "@/pages/components/Notification";
import ConfirmationModal from "@/pages/components/Modal";

export async function getStaticPaths() {
  const paths = data.orders.map((order) => ({
    params: { id: order.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const order = data.orders.find((order) => order.id.toString() === params.id);
  const items = data.items;
  return { props: { order, items } };
}

export default function OrderDetails({ order, items }) {
  const [orderStatus, setOrderStatus] = useState(order.status);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const router = useRouter();

  useEffect(() => {
    const savedStatus = localStorage.getItem(`order-status-${order.id}`);
    if (savedStatus) {
      setOrderStatus(savedStatus);
    }
  }, [order.id]);

  const handleCompleteOrder = () => {
    setActionType("Completed");
    setIsConfirmationOpen(true);
  };

  const handlePendingOrder = () => {
    setActionType("Pending");
    setIsConfirmationOpen(true);
  };

  const confirmAction = () => {
    const newStatus = actionType === "Completed" ? "Completed" : "Pending";
    setOrderStatus(newStatus);
    localStorage.setItem(`order-status-${order.id}`, newStatus);
    notify(`Order marked as ${newStatus.toLowerCase()}!`);
    setIsConfirmationOpen(false);
  };

  const getItemStock = (itemId) => {
    const item = items.find((item) => item.id === itemId);
    return item ? item.stock : 0;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <button
          type="button"
          onClick={() => router.push("/orders")}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Back to Order List
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-xl font-semibold mb-2">Order Info</h2>
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p>
            <strong>Customer:</strong> {order.customer}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={
                orderStatus === "Pending" ? "text-red-500" : "text-green-500"
              }
            >
              {orderStatus}
            </span>
          </p>
          {orderStatus !== "Completed" ? (
            <button
              onClick={handleCompleteOrder}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Mark as Completed
            </button>
          ) : (
            <button
              onClick={handlePendingOrder}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Mark as Pending
            </button>
          )}
        </div>
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-xl font-semibold mb-2">Items</h2>
          <ul className="list-disc list-inside">
            {order.items.map((item) => (
              <li key={item.id} className="mb-2">
                <p>
                  <strong>{item.name}</strong>
                </p>
                <p>Quantity: {item.quantity}</p>
                <p>Stock: {getItemStock(item.id)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={confirmAction}
        actionType={actionType}
        message={`Are you sure you want to mark this order as ${actionType.toLowerCase()}?`}
      />
      <Notification />
    </div>
  );
}
