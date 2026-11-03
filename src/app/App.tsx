import { CheckoutScreen } from "../features/checkout/CheckoutScreen";
import { ConfirmationScreen } from "../features/checkout/ConfirmationScreen";
import { CartProvider } from "../features/cart/CartProvider";
import { CartScreen } from "../features/cart/CartScreen";
import { ProductRoute } from "../features/catalog/ProductScreen";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./Layout";
import { HomeScreen } from "../features/home/HomeScreen";
import { CatalogScreen } from "../features/catalog/CatalogScreen";
export function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomeScreen />} />
            <Route path="coffees" element={<CatalogScreen />} />
            <Route path="coffees/:coffeeId" element={<ProductRoute />} />
            <Route path="bag" element={<CartScreen />} />
            <Route path="checkout" element={<CheckoutScreen />} />
            <Route path="confirmation" element={<ConfirmationScreen />} />
            <Route path="*" element={<Navigate to="/coffees" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
