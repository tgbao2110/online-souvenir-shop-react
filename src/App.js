// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Home from "./pages/Customer/_Home";
import AdminRoutes from "./routes/AdminRoutes";
import CustomerRoutes from "./routes/CustomerRoutes";
import Login from "./pages/_Auth/Login";
import Register from "./pages/_Auth/Register";

const App = () => {
  const { role } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {role === "admin" && <Route path="/*" element={<AdminRoutes />} />}
        {role === "customer" && <Route path="/*" element={<CustomerRoutes />} />}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
