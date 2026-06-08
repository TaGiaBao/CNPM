import { createBrowserRouter } from "react-router";
import { AdminLayout } from "./components/admin/AdminLayout";
import { Dashboard } from "./components/admin/Dashboard";
import { BooksPage } from "./components/admin/BooksPage";
import { OrdersPage } from "./components/admin/OrdersPage";
import { CustomersPage } from "./components/admin/CustomersPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "books", Component: BooksPage },
      { path: "orders", Component: OrdersPage },
      { path: "customers", Component: CustomersPage },
    ],
  },
]);
