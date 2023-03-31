import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthPage } from "./pages/auth-page/auth-page";
import { RolesPage } from "./pages/roles-page/roles-page";
import { UsersPage } from "./pages/users-page/users-page";
import { FoodsPage } from "./pages/foods-page/foods";
import { FoodCategoryPage } from "./pages/food-category-page/food-category";
import { OrdersPage } from "./pages/orders-page/orders-page";
import Public from "./routes/public";
import Private from "./routes/private";
import { PaymentsPage } from "./pages/payments-page/payments-page";

import "react-toastify/dist/ReactToastify.css";
import { DeedlinePage } from "./pages/deedline-page/deedline-page";
import { StatsPage } from "./pages/stats-page/stats-page";
import { ProductsPage } from "./pages/products-page/products-page";
import { LunchsPage } from "./pages/lunchs-page/lunchs-page";
import { FoodById } from "./pages/food-by-id/food-by-id";
import { WareHousePage } from "./pages/warehouese-page/warehouse-page";
import { NotFoundPage } from "./pages/404/404";

export const App: React.FC = () => {
  return (
    <div className="App">
      <ToastContainer autoClose={5000} />
      <Routes>
        <Route path="/" element={<Public />}>
          <Route path="/login" element={<AuthPage />} />
        </Route>
        <Route path="/" element={<Private />}>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/roles" element={<RolesPage />} />
          <Route path="/foods" element={<FoodsPage />} />
          <Route path="/foods/:foodId" element={<FoodById />} />
          <Route path="/food-category" element={<FoodCategoryPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/deedline" element={<DeedlinePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/lunchs" element={<LunchsPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/warehouse" element={<WareHousePage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
};
