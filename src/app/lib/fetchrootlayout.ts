const fetchProducts = async () => {
  try {
    const API_URL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.NEXT_PUBLIC_API_URL;

    if (!API_URL) {
      throw new Error("❌ NEXT_PUBLIC_API_URL is not defined.");
    }

    const res = await fetch(`${API_URL}/api/products`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`❌ API Request Failed: ${res.status} - ${errorText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return [];
  }
};

export default fetchProducts;
