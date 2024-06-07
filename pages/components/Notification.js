// components/Notification.js
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function notify(message, type = "success") {
  toast(message, { type });
}

export default function Notification() {
  return <ToastContainer />;
}
