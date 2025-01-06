import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  TextField,
} from "@mui/material";
import api from "../../utils/api";
import CustomerLayout from "../../layout/CustomerLayout";
import fCurrency from "../../utils/FormatCurrency";

import PendingRoundedIcon from "@mui/icons-material/PendingRounded";
import WatchLaterRoundedIcon from "@mui/icons-material/WatchLaterRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/Order/get-customer-orders");
      console.log("API Response:", response.data);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders", error);
      setError(error.message);
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Processing";
      case 2:
        return "Shipping";
      case 3:
        return "Delivered";
      case 4:
        return "Cancelled";
      default:
        return "Unknown";
    }
  };

  return (
    <CustomerLayout>
      <div className="container mt-5">
        <h1 className="text-primary mb-4">Orders</h1>
        <div className="mb-3"></div>
        {error && <div className="alert alert-danger">{error}</div>}
        <Grid container direction="column" spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} key={order.id}>
              <Card
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <CardContent>
                    <h6>Order ID: {order.id}</h6>
                    <div className="text-muted">
                      Order Date: {new Date(order.orderDate).toLocaleString()}
                    </div>
                    <div className="text-muted">
                      Total: {fCurrency(order.total)}
                    </div>
                    <div className="text-primary">
                      <strong>
                        {order.status === 0 && (
                          <span className="text-warning">
                            <PendingRoundedIcon className="fs-5 me-1"/>
                            Pending
                          </span>
                        )}
                        {order.status === 1 && (
                          <span className="text-warning">
                            <WatchLaterRoundedIcon className="fs-5 me-1"/>
                            Processing
                          </span>
                        )}
                        {order.status === 2 && (
                          <span className="text-warning">
                            <LocalShippingRoundedIcon className="fs-5 me-1"/>
                            Shipping
                          </span>
                        )}
                        {order.status === 3 && (
                          <span className="text-primary">
                            <CheckCircleRoundedIcon className="fs-5 me-1"/>
                            Delivered
                          </span>
                        )}
                        {order.status === 4 && (
                          <span className="text-danger">
                            <CancelRoundedIcon className="fs-5 me-1"/>
                            Cancelled
                          </span>
                        )}
                      </strong>
                    </div>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </CustomerLayout>
  );
};

export default Orders;
