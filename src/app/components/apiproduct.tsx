"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/app/components/productfetched";
import { FaSpinner } from "react-icons/fa";

interface Product {
  _id: string;
  title: string;
  imageUrl: string;
  price: number;
  tags: string[];
  dicountPercentage: number;
  description: string;
  isNew: boolean;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
     return (
       <div className="flex justify-center items-center h-[100vh]">
         <div>
           <FaSpinner className="animate-spin text-4xl ml-8 text-blue-500" />
           <h1 className="text-2xl font-bold text-blue-400">Loading...</h1>
         </div>
       </div>
     );
   }

  return (
    <div className="p-6">
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
