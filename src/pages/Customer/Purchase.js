import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CustomerLayout from "../../layout/CustomerLayout";
import fCurrency from "../../utils/FormatCurrency";
import api from "../../utils/api";
import { useNavigate as navigate } from "react-router-dom";

const Purchase = () => {
  const location = useLocation();
  const { order } = location.state || {};
  const [alertMessage, setAlertMessage] = useState("");

  const handlePlaceOrder = async () => {
    try {
      const response = await api.post("/Order/place-order", order);
      if (response.status === 200) {
        alert("Order placed successfully!");
        navigate("/products");
      }
    } catch (error) {
      console.error("Error placing order", error);
      setAlertMessage("Error placing order. Please try again.");
    }
  };

  if (!order) {
    return (
      <CustomerLayout>
        <div className="container m-5">
          <h4>No order details available.</h4>
        </div>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      <div className="container m-5">
        <h3>Order Confirmation</h3>
        <div className="order-details mt-4">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
          <p><strong>Total:</strong> {fCurrency(order.total)}</p>

          <h4 className="mt-4">Order Items</h4>
          <ul>
            {order.orderItems.map((item) => (
              <li key={item.id}>
                Product ID: {item.productId}, Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        </div>

        {/* ------ Button ------ */}
        <button
          className="btn btn-primary mt-4 px-4 py-2"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>

        {/* ------ Alert Message ------ */}
        {alertMessage && (
          <div className={`alert ${alertMessage.includes("successfully") ? "alert-success" : "alert-danger"} mt-4`}>
            {alertMessage}
          </div>
        )}
      </div>
    </CustomerLayout>
  );
};

export default Purchase;
