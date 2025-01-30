import "./globals.css";
import Footer from "./components/footer";
import { CartProvider } from "./(pages)/context/cartcontext";
import { ClerkProvider } from "@clerk/nextjs";
import { fetchProducts } from "./components/lib/root";
import ClientHeader from "./components/clientHeader";
import { WishlistProvider } from "./components/wishlist";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const products = await fetchProducts(); // ✅ Server function ko yahan call karein

  return (
    <html lang="en">
      <body>
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY} // ✅ Correct key
        >
          <CartProvider>
            <WishlistProvider>
              <ClientHeader products={products} /> {/* ✅ Client Header use karein */} 
              <main>{children}</main>
            </WishlistProvider>
            <Footer />
          </CartProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
