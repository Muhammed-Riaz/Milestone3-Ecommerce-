"use client";

import React, { useState, useEffect } from "react";
import Category from "./cotogory";
import Link from "next/link";
import Image from "next/image";

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

const CategoryPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const filteredProducts =
    selectedCategory === ""
      ? products
      : products.filter((product) => product.tags.includes(selectedCategory));

  return (
    <div className="container mx-auto p-4">
      <Category products={products} onCategorySelect={setSelectedCategory} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white  shadow-md rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-xl text-[#23A6F0]">
            
            <Image src={product.imageUrl} alt={product.title} className="w-full h-40 object-cover rounded" />
            <Link href={`/fetchproduct/${product._id}`}>
            <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
            <p className="text-gray-600">${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
