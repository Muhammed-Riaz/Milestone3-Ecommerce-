import { AppProps } from "next/app";
import { CartProvider } from "./context/cartcontext";
import Header from "../components/header";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Header/>
      <Component {...pageProps} />
    </CartProvider>
  );
}
