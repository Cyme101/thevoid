import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import CartProvider from "./components/CartProvider";
import WishlistProvider from "./components/WishlistProvider";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <CartProvider>
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </CartProvider>
  </BrowserRouter>
);
