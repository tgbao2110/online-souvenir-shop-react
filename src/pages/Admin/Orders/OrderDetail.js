import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import api from "../../../utils/api";
import fCurrency from "../../../utils/FormatCurrency";

const OrderDetailModal = ({ open, handleClose, orderId }) => {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails(orderId);
    }
  }, [orderId]);

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await api.get(`/Order/${orderId}`);
      console.log("Fetched Order Details:", response.data);
      setOrder(response.data);
    } catch (error) {
      console.error("Error fetching order details", error);
      setError("Failed to fetch order details.");
    }
  };

  if (!order) return null;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="lg">
      <DialogContent>
        {error && <p className="text-danger">{error}</p>}
        <p>Order ID: {order.id}</p>
        <p>{new Date(order.orderDate).toLocaleString()}</p>
        <p>
          Status:{" "}
          {order.status === 0
            ? "Pending"
            : order.status === 1
            ? "Processing"
            : order.status === 2
            ? "Shipping"
            : order.status === 3
            ? "Delivered"
            : order.status === 4
            ? "Cancelled"
            : "Unknown"}
        </p>
        <div className="order mb-4">
          <Box display="flex" alignItems="center" mt={2}>
            {order.customer && order.customer.avatarUrl ? (
              <Avatar
                className="avatar"
                style={{ transform: "translateY(-30%)" }}
                src={`https://localhost:7096/${order.customer.avatarUrl}`}
                alt={order.customer.fullName}
              />
            ) : (
              <Avatar
                className="avatar"
                style={{ transform: "translateY(-30%)" }}
              >
                {order.customer
                  ? order.customer.userName[0].toUpperCase()
                  : ""}
              </Avatar>
            )}
            <Box ml={2}>
              <strong>
                {order.customer ? order.customer.fullName : "Unknown User"}
              </strong>
              <p>{order.customer ? order.customer.userName : ""}</p>
            </Box>
            
          </Box>
          <div>
            <div>Email:{" "}{order.customer.email}</div>
            <div>Phone: {" "}{order.customer.phoneNumber}</div>
            <div>Address: {" "}{order.customer.address}</div>
            </div>
        </div>
        
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems.map((item) => (
              <tr key={item.id}>
                <td className="py-3" scope="row">
                  <img
                    src={`https://localhost:7096/${item.product.imageUrl}`}
                    alt={item.product.name}
                    width={60}
                    height={60}
                  />
                </td>
                <td className="py-3">
                  <div className="cart-info d-flex flex-wrap align-items-center mb-4">
                    <div className="col-lg-9">
                      <div className="card-detail py-3">
                        <h6 className="card-title">
                          {item.product.name}
                        </h6>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <div className="input-group product-qty w-50">
                    {item.quantity}
                  </div>
                </td>
                <td className="py-4">
                  <div className="total-price">
                    <span className="money text-dark">
                      {fCurrency(item.quantity * item.product.discountPrice)}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DialogContent>
      <DialogActions>
        <button onClick={handleClose} className="btn btn-outline-secondary">
          Close
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailModal;
