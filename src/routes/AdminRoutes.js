// src/routes/AdminRoutes.js
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Admin/_Dashboard/Dashboard";
import Categories from "../pages/Admin/Categories/_Categories";
import Products from "../pages/Admin/Products/_Products";
import Accounts from "../pages/Admin/Accounts/_Accounts";
import Vouchers from "../pages/Admin/Vouchers/_Vouchers";
import Orders from "../pages/Admin/Orders/_Orders";
// Import other admin components

const AdminRoutes = () => (
  <Routes>
    <Route path="/admin/dashboard" element={<Dashboard />} />
    <Route path="/admin/accounts" element={<Accounts />} />
    <Route path="/admin/categories" element={<Categories />} />
    <Route path="/admin/products" element={<Products />} />
    <Route path="/admin/vouchers" element={<Vouchers />} />
    <Route path="/admin/orders" element={<Orders />} />
  </Routes>
);

export default AdminRoutes;
