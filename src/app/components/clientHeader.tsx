"use client"; // ✅ Is file ko client-side component banane ke liye

import { usePathname } from "next/navigation";
import Header from "./header"; // ✅ Same Header component ko reuse karenge
import { ProductProps } from "./productfetched";

const ClientHeader = ({ products }: { products: ProductProps[] }) => {
  const pathname = usePathname(); // ✅ Client-side pathname use karein
  const hideHeaderOnPages = ["/about", "/contact" ,"/pricing"]; // ✅ Jahan Header hide karna ho
  const showHeader = !hideHeaderOnPages.includes(pathname); // ✅ Check karein ke Header dikhana hai ya nahi

  return showHeader ? <Header products={products} /> : null; // ✅ Conditional Rendering
};

export default ClientHeader;
