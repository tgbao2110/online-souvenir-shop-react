import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const OrderDetailModal = ({ open, handleClose, order }) => {
  if (!order) return null;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent>
        <p>Order ID: {order.id}</p>
        <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
        <p>Status: {order.status}</p>
        <p>Total: {order.total}</p>
        <p>Customer ID: {order.customerId}</p>
        <p>Payment ID: {order.paymentId || 'N/A'}</p>
        <p>Voucher ID: {order.voucherId || 'N/A'}</p>
        <h2>Order Items</h2>
        <ul>
          {order.orderItems.length > 0 ? (
            order.orderItems.map(item => (
              <li key={item.id}>
                Product ID: {item.productId}<br />
                Quantity: {item.quantity}<br />
              </li>
            ))
          ) : (
            <li>No items in this order</li>
          )}
        </ul> 
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailModal;
