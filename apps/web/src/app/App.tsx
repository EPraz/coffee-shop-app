import { CheckoutScreen } from "../features/checkout/CheckoutScreen";
import { ConfirmationScreen } from "../features/checkout/ConfirmationScreen";
import { CartProvider } from "../features/cart/CartProvider";
import { CartScreen } from "../features/cart/CartScreen";
import { ProductRoute } from "../features/catalog/ProductScreen";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./Layout";
import { HomeScreen } from "../features/home/HomeScreen";
import { CatalogScreen } from "../features/catalog/CatalogScreen";
import { WalkthroughScreen } from "../features/walkthrough/WalkthroughScreen";
import { FinderScreen } from "../features/finder/FinderScreen";
import { BrewingScreen } from "../features/brewing/BrewingScreen";
import { OrderHistoryProvider } from "../features/orders/OrderHistoryProvider";
import { HistoryScreen } from "../features/orders/HistoryScreen";
import { OrderReceiptScreen } from "../features/orders/OrderReceiptScreen";
import { ReorderScreen } from "../features/orders/ReorderScreen";
import { lazy, Suspense } from "react";
import {
  useStoreCatalog,
  refreshCatalog,
} from "../features/catalog/catalog-store";
import { StoreLoading } from "../shared/ui/StoreLoading";
import { CatalogConnectionNotice } from "../features/catalog/CatalogConnectionNotice";
const AdminScreen = lazy(() => import("../features/admin/AdminScreen"));
export function App() {
  const catalog = useStoreCatalog();
  if (!catalog.data)
    return (
      <StoreLoading
        error={catalog.status === "error"}
        onRetry={() => void refreshCatalog()}
      />
    );
  return (
    <OrderHistoryProvider>
      <CartProvider>
        {catalog.status === "error" && <CatalogConnectionNotice />}
        <BrowserRouter useTransitions={false}>
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="admin/*"
                element={
                  <Suspense fallback={<StoreLoading error={false} />}>
                    <AdminScreen />
                  </Suspense>
                }
              />
              <Route index element={<HomeScreen />} />
              <Route path="coffees" element={<CatalogScreen />} />
              <Route path="coffees/:coffeeId" element={<ProductRoute />} />
              <Route path="bag" element={<CartScreen />} />
              <Route path="checkout" element={<CheckoutScreen />} />
              <Route path="confirmation" element={<ConfirmationScreen />} />
              <Route path="walkthrough" element={<WalkthroughScreen />} />
              <Route path="find-your-coffee" element={<FinderScreen />} />
              <Route path="brew" element={<BrewingScreen />} />
              <Route path="orders" element={<HistoryScreen />} />
              <Route
                path="orders/:orderNumber"
                element={<OrderReceiptScreen />}
              />
              <Route
                path="orders/:orderNumber/reorder"
                element={<ReorderScreen />}
              />
              <Route path="*" element={<Navigate to="/coffees" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </OrderHistoryProvider>
  );
}
