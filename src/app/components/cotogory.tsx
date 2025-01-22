import React from "react";

// Props type define karna TypeScript ke liye zaroori hai
interface CategoryProps {
  products: { tags: string[] }[];
  onCategorySelect: (category: string) => void;
}

const Category: React.FC<CategoryProps> = ({ products, onCategorySelect }) => {
  // Unique Categories Extract karna (tags ka pehla word category maan lenge)
  const categories = [
    ...new Set(products.flatMap((product) => product.tags || [])),
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold my-5 text-center text-blue-600">click Categories</h2>
      <ul className="flex gap-2 flex-wrap">
      
        <li
          className="cursor-pointer bg-gray-200 px-3 py-1 rounded"
          onClick={() => onCategorySelect("")}
        >
      
          All

        </li>
        {categories.map((category, index) => (
          <li
            key={index}
            className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded"
            onClick={() => onCategorySelect(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
