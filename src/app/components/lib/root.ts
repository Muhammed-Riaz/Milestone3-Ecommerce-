// root.ts
const API_URL =
process.env.NODE_ENV === "development"
  ? "http://localhost:3000"
  : process.env.API_URL;

export const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/api/products`, { // Added backticks for template literal
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`❌ API Request Failed: ${res.status} - ${errorText}`); // Added backticks for template literal
  }

  const products = await res.json();
  return products; // Don't forget to return the products
}
