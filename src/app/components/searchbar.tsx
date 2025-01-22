import React, { useState } from "react";
import { ProductProps } from "./productfetched";

type Product = ProductProps;

interface SearchBarProps {
  onSearch: (filteredProducts: Product[]) => void;
  products?: Product[];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, products = [] }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (!products || products.length === 0) return;

    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );

    onSearch(filteredProducts);
  };

  return (
    <div className="relative w-full md:w-1/2">
      <input
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={handleSearch}
        className="w-[250px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
