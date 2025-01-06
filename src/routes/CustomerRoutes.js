// src/routes/CustomerRoutes.js
import { Route, Routes } from "react-router-dom";
import Favourite from "../pages/Customer/Favourite";
import Orders from "../pages/Customer/Orders";
import Cart from "../pages/Customer/Cart";
import Purchase from "../pages/Customer/Purchase";
// Import other customer components

const CustomerRoutes = () => (
  <Routes>
    <Route path="/favourite" element={<Favourite />} />
    <Route path="/orders" element={<Orders />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/purchase" element={<Purchase />} />
  </Routes>
);

export default CustomerRoutes;
