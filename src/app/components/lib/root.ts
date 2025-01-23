// root.ts
export const fetchProducts = async () => {
  const res = await fetch("http://localhost:3000/api/root", { cache: "no-store" });

  if (!res.ok) {
    throw new Error("❌ Failed to fetch products");
  }

  return res.json();
};
