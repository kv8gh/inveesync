// components/Nav.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/orders">Order List</Link></li>
        <li><Link href="/inventory">Inventory Management</Link></li>
      </ul>
      <style jsx>{`
        nav {
          background: #f0f0f0;
          padding: 1rem;
        }
        ul {
          list-style: none;
          display: flex;
          gap: 1rem;
        }
        li {
          margin: 0;
        }
        a {
          text-decoration: none;
          color: #333;
        }
      `}</style>
    </nav>
  );
}
