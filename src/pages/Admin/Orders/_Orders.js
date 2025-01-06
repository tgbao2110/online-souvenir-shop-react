import React, { useState, useEffect } from "react";
import { MenuItem, Select, FormControl, InputLabel, TextField, Box } from "@mui/material";
import api from "../../../utils/api";
import AdminLayout from "../../../layout/AdminLayout";
import OrderDetailModal from "./OrderDetail";
import TextInput from "../../../components/TextInput";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [error, setError] = useState("");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/Order");
      console.log("API Response:", response.data);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders", error);
      setError(error.message);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === "" || order.status.toString() === statusFilter)
  );

  const handleChangeStatus = async (orderId, status) => {
    try {
      const response = await api.put(`/Order/${orderId}`, { status }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        fetchOrders(); // Refresh orders after status update
      }
    } catch (error) {
      console.error("Error updating order status", error);
      setError(error.message);
    }
  };

  return (
    <AdminLayout>
      <div className="container mt-5">
        <h1 className="text text-primary mb-3">Orders</h1>
        <div className="d-flex mb-3">
          <TextField className="me-2"
            fullWidth 
            variant="outlined" 
            placeholder="Search for orders..." 
            value={searchTerm} 
            onChange={handleSearch} 
          />
          <FormControl variant="outlined" className="ml-3" style={{ minWidth: 140 }}>
            <InputLabel>Status</InputLabel>
            <Select 
              value={statusFilter} 
              onChange={handleStatusFilter} 
              label="Status"
              className=""
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="0">Pending</MenuItem>
              <MenuItem value="1">Processing</MenuItem>
              <MenuItem value="2">Shipping</MenuItem>
              <MenuItem value="3">Delivered</MenuItem>
              <MenuItem value="4">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <table className="table table-hover table-group-divider mt-3">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>
                  <Select
                    className="w-75 form-select-sm" 
                    value={order.status}
                    onChange={(e) => handleChangeStatus(order.id, e.target.value)}
                    style={{ minWidth: 120 }}
                  >
                    <MenuItem value={0}>Pending</MenuItem>
                    <MenuItem value={1}>Processing</MenuItem>
                    <MenuItem value={2}>Shipping</MenuItem>
                    <MenuItem value={3}>Delivered</MenuItem>
                    <MenuItem value={4}>Cancelled</MenuItem>
                  </Select>
                </td>
                <td>{order.total}</td>
                <td>
                  <button
                    className="btn btn-primary mr-2" 
                    onClick={() => {
                      setCurrentOrder(order);
                      setShowDetailsModal(true);
                    }}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <OrderDetailModal
          open={showDetailsModal}
          handleClose={() => setShowDetailsModal(false)}
          order={currentOrder}
        />
      </div>
    </AdminLayout>
  );
};

export default Orders;
