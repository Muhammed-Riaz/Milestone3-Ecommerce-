"use client";

import Sidebar from "../components/sidebar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen">

      <Sidebar />

      {/* Content Area */}
      <main className="flex-1 px-3 bg-gray-100">{children}</main>
    </div>
  );
};

export default Layout;
