"use client"; // ✅ Client Component ke liye zaroori hai

import { useWishlist } from "@/app/components/wishlist";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <section className="max-w-screen-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow">
              <Image src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-600">${product.price}</p>

              <button
                onClick={() => removeFromWishlist(product.id)}
                className="text-red-500 mt-2 flex items-center gap-2"
              >
                <FaTrash size={18} /> Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
