"use client"; // ✅ Client-side state management ke liye

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🛒 Wishlist Product Type Define Karein
export interface WishlistProduct {
  id: string;
  sku: string;
  name: string;
  price: number;
  image: string;
  quantity:number
}

// ✅ Wishlist Context Banayein
interface WishlistContextType {
  wishlist: WishlistProduct[];
  addToWishlist: (product: WishlistProduct) => void;
  removeFromWishlist: (id: string) => void;
}

// ✅ Context Create Karein
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// ✅ Wishlist Provider Function
export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);

 useEffect(() => {
  const storedWishlist = localStorage.getItem("wishlist");
  if (storedWishlist) {
    setWishlist(JSON.parse(storedWishlist));
  }
}, []); // ⚡️ `wishlist` ko yahan observe karne ki zaroorat nahi

// ✅ Save Wishlist to localStorage on Change
useEffect(() => {
  if (wishlist.length > 0) {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
}, [wishlist]); // ⚡️ Sirf `wishlist` change hone par save karna hai


  // ✅ Add to Wishlist Function
  const addToWishlist = (product: WishlistProduct) => {
    setWishlist((prev) => {
      const alreadyInWishlist = prev.some((item) => item.id === product.id);
      
      if (!alreadyInWishlist) {
        return [...prev, product];
      }
      return prev;
    });
  
    
    if (wishlist.some((item) => item.id === product.id)) {
      toast.info("Item already in wishlist!", { position: "bottom-right" ,autoClose: 3000});
    } else {
      toast.success("Item added to wishlist!", { position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true, });
       
    }
  };
  

  // ✅ Remove from Wishlist Function
  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => {
      const updatedWishlist = prev.filter((item) => item.id !== id);
      toast.error("Item removed from wishlist!", { position: "bottom-left" });
      return updatedWishlist;
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// ✅ Custom Hook for Wishlist Context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
