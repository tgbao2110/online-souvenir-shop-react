import React, { useState, useEffect } from "react";
import AdminLayout from "../../../layout/AdminLayout";
import { Box, Grid, Typography, Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Bar } from "react-chartjs-2";
import api from "../../../utils/api";
import fCurrency from "../../../utils/FormatCurrency";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get("/Dashboard");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!data) {
    return <Typography>Loading...</Typography>;
  }

  const { productDashboard, orderDashboard } = data;

  // Calculate total revenue by days
  const totalRevenueByDays = orderDashboard.revenueByDays.reduce((sum, entry) => sum + entry.revenue, 0);

  // Cấu hình dữ liệu biểu đồ
  const revenueChartData = {
    labels: orderDashboard.revenueByDays.map((entry) => entry.date),
    datasets: [
      {
        label: "Revenue",
        data: orderDashboard.revenueByDays.map((entry) => entry.revenue),
        backgroundColor: "#6BB252AA",
        borderColor: "#6BB252",
        borderWidth: 1,
      },
    ],
  };

  return (
    <AdminLayout>
      <Box sx={{ padding: 4 }}>
        <h1 className="text-primary mb-4">Dashboard</h1>

        <Grid container spacing={3}>

          {/* ------- Overview ------- */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <h6>Total Products</h6>
                <h3 className=" text-primary fw-bold">{productDashboard.totalProducts}</h3>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <h6>Total Orders</h6>
                <h3 className=" text-primary fw-bold">{orderDashboard.totalOrders}</h3>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <h6>Total Revenue</h6>
                <h3 className=" text-primary fw-bold">{fCurrency(orderDashboard.totalRevenue)}</h3>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <h6>Orders Processing</h6>
                <h3 className=" text-primary fw-bold">{orderDashboard.totalOrdersProcessing}</h3>
              </CardContent>
            </Card>
          </Grid>

          {/* ------- Top selling products ------- */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <h6>
                  Top Selling Products
                </h6>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Product Name</strong></TableCell>
                      <TableCell><strong>Sold Quantity</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productDashboard.topSellingProducts.map((product) => (
                      <TableRow key={product.productName}>
                        <TableCell>{product.productName}</TableCell>
                        <TableCell>{product.soldQuantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>

          {/* ------- Revenue by days ------- */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <h6>
                  Revenue by Days
                </h6>
                <Bar data={revenueChartData} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
};

export default Dashboard;
