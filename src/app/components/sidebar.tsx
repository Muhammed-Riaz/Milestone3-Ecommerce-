import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <aside className="w-64 bg-gray-800 text-white p-4 min-h-screen lg:block hidden">
      <h2 className="text-xl font-bold">Admin Panel</h2>
      <ul className="mt-4 space-y-5">
        {[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Orders", path: "/dashboard/orders" },
          { name: "Products", path: "/dashboard/products" },
          { name: "Customers", path: "/dashboard/customers" },
        ].map((item) => (
          <li key={item.path}>
            <Link href={item.path}>
              <button
                className={`w-full text-left ${
                  activePage === item.name.toLowerCase() ? "text-blue-500" : ""
                }`}
                onClick={() => setActivePage(item.name.toLowerCase())}
              >
                {item.name}
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
