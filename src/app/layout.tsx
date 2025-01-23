import "./globals.css";
import Footer from "./components/footer";
import { CartProvider } from "./(pages)/context/cartcontext";
import { ClerkProvider } from "@clerk/nextjs";
import ClientHeader from "./components/clientHeader";
import { WishlistProvider } from "./components/wishlist";

const fetchProducts = async () => {
  const res = await fetch("http://localhost:3000/api/root", { cache: "no-store" });

  if (!res.ok) {
    throw new Error("❌ Failed to fetch products");
  }

  return res.json();
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const products = await fetchProducts(); // ✅ API call karein

  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <CartProvider>
            <WishlistProvider>
              <ClientHeader products={products} /> 
              <main>{children}</main>
            </WishlistProvider>
            <Footer />
          </CartProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
