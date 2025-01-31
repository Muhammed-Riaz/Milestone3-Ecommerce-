import Link from "next/link";
import { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { IoCartOutline, IoPersonOutline } from "react-icons/io5";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Sidebar() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div>
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
                  className={`w-full text-left ${activePage === item.name.toLowerCase() ? "text-blue-500" : ""
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

         {/* Mobile Navigation - Sheet */}
         <Sheet>
        {/* Button to open the sheet */}
        <SheetTrigger className="lg:hidden fixed top-4 left-4 bg-gray-800 text-white p-2 rounded-md">
          ☰ Open Dashboard
        </SheetTrigger>

        <SheetContent className="bg-white">
          <SheetHeader>
            <SheetTitle className="text-lg font-semibold text-[#252B42] mb-4 mt-5">
              Dashboard Navigation
            </SheetTitle>
            <nav className="text-[#737373] space-y-10 font-bold text-sm">
              {[
                { name: "Dashboard", path: "/dashboard" },
                { name: "Orders", path: "/dashboard/orders" },
                { name: "Products", path: "/dashboard/products" },
                { name: "Customers", path: "/dashboard/customers" },
              ].map((item) => (
                <Link key={item.path} href={item.path}>
                  <li className="list-none hover:text-[#23A6F0]">{item.name}</li>
                </Link>
              ))}

          
              {/* User Authentication */}
              <div className="flex flex-col items-center gap-3 text-[#23A6F0] font-bold mt-5">
                <IoPersonOutline size={35} />
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>

            </nav>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
