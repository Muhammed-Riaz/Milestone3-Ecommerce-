import { NextResponse } from "next/server";

export async function GET() {
  try {
    const API_URL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.API_URL;

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

    const products = await res.json();
    return NextResponse.json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
