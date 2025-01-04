// src/routes/AdminRoutes.js
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Admin/_Dashboard/Dashboard";
// Import other admin components

const AdminRoutes = () => (
  <Routes>
    <Route path="/admin/dashboard" element={<Dashboard />} />
  </Routes>
);

export default AdminRoutes;
