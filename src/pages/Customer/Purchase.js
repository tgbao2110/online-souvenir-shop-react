import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomerLayout from "../../layout/CustomerLayout";
import fCurrency from "../../utils/FormatCurrency";
import api from "../../utils/api";

const Purchase = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
          <div className="col-md-8">
            <div className="table-responsive cart">
              <table className="table">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="card-title text-uppercase text-muted"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="card-title text-uppercase text-muted"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="card-title text-uppercase text-muted"
                    >
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3" scope="row">
                        <div className="cart-info d-flex flex-wrap align-items-center mb-4">
                          <div className="col-lg-9">
                            <div className="card-detail py-3">
                              <h6 className="card-title">
                                  {item.productId}
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
                            {/* {fCurrency(item.quantity * item.product.discountPrice)} */}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
