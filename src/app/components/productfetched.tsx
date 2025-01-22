import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface ProductProps {
  _id: string;
  title: string;
  imageUrl: string;
  price: number;
  tags: string[];
  dicountPercentage: number;
  description: string;
  isNew: boolean;
}

const ProductCard: React.FC<{ product: ProductProps }> = ({ product }) => {
  return (
    
    <div className="bg-white  shadow-md rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-xl text-[#23A6F0]">
      <Image
        src={product.imageUrl}
        alt={product.title}
        className="w-full h-52 object-cover"
      />
      
    <Link href={`/fetchproduct/${product._id}`}>
      <div className="p-4 ">
        <h3 className="text-lg font-semibold  ">{product.title}</h3>
  
        <div className="mt-3 flex justify-between items-center">
          <span className="text-lg font-bold ">${product.price}</span>
          {product.dicountPercentage > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              {product.dicountPercentage}% Off
            </span>
          )}
        </div>
      
       
      </div>
      </Link>
      
    </div>
   
  );
};

export default ProductCard;
