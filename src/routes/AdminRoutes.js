// src/routes/AdminRoutes.js
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Admin/_Dashboard/Dashboard";
import Categories from "../pages/Admin/Categories/_Categories";
import Accounts from "../pages/Admin/Accounts/_Accounts";
// Import other admin components

const AdminRoutes = () => (
  <Routes>
    <Route path="/admin/dashboard" element={<Dashboard />} />
    <Route path="/admin/accounts" element={<Accounts />} />
    <Route path="/admin/categories" element={<Categories />} />
  </Routes>
);

export default AdminRoutes;
