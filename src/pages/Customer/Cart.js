import React, { useState, useEffect } from "react";
import CustomerLayout from "../../layout/CustomerLayout";
import api from "../../utils/api";
import fCurrency from "../../utils/FormatCurrency";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState("");
  const [quantities, setQuantities] = useState({});
  const [voucherCode, setVoucherCode] = useState("");
  const [alertError, setAlertError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetchCart();
  }, []);
  const fetchCart = async () => {
    try {
      const response = await api.get("/Cart/get-cart");
      setCart(response.data);
      const initialQuantities = response.data.cartItems.reduce((acc, item) => {
        acc[item.id] = item.quantity;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    } catch (error) {
      console.error("Error fetching cart data", error);
      setError("Error fetching cart data. Please try again later.");
    }
  };
  const handleQuantityChange = (id, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity,
    }));
  };
  const handleUpdateCart = async () => {
    try {
      for (let id in quantities) {
        await api.put("/Cart", { id: id, quantity: quantities[id] });
      }
      fetchCart();
    } catch (error) {
      console.error("Error updating cart", error);
      setError("Error updating cart. Please try again later.");
    }
  };
  const handleRemoveItem = async (id) => {
    try {
      await api.delete("/Cart", { data: { cartItemIds: [id] } });
      fetchCart();
    } catch (error) {
      console.error("Error removing item from cart", error);
      setError("Error removing item from cart. Please try again later.");
    }
  };

  const HandleChangeVoucher = async (event) => {
    setError("");
    setVoucherCode(event.target.value);
  };

  const handleProceedToCheckout = async () => {
  console.log("Voucher Code:", voucherCode);
  try {
    const cartItemIds = cart.cartItems.map((item) => item.id);
    const response = await api.post("/Order/purchase", { cartItemIds, voucherCode }); // Include voucherCode here
    if (response.status === 200) {
      navigate("/purchase", { state: { order: response.data } });
    }
  } catch (error) {
    if (error.response && error.response.data) {
      setAlertError(error.response.data.message);
    } else {
      setAlertError("Error placing order. Please try again.");
    }
    console.error("Error placing order", error);
  }
};

  
  
  if (error) {
    return (
      <CustomerLayout>
        <div className="container m-5">
          <div className="alert alert-danger">{error}</div>
        </div>
      </CustomerLayout>
    );
  }
  if (!cart) {
    return (
      <CustomerLayout>
        <div className="container m-5">
          <h4>Loading...</h4>
        </div>
      </CustomerLayout>
    );
  }
  const calculateSubtotal = () => {
    return cart.cartItems.reduce(
      (total, item) => total + item.quantity * item.product.basePrice,
      0
    );
  };
  return (
    <CustomerLayout>
      <div className="container m-5">
        <div className="row g-5">
        {/* ---------- Cart Items ---------- */}
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
                    <th
                      scope="col"
                      className="card-title text-uppercase text-muted"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3" scope="row">
                        <div className="cart-info d-flex flex-wrap align-items-center mb-4">
                          <div className="col-lg-9">
                            <div className="card-detail py-3">
                              <h6 className="card-title">
                                <a
                                  href={`/product/${item.product.id}`}
                                  className="text-decoration-none"
                                >
                                  {item.product.name}
                                </a>
                              </h6>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="input-group product-qty w-50">
                          <input
                            type="number"
                            min={1}
                            id="quantity"
                            name="quantity"
                            className="form-control input-number text-center"
                            value={quantities[item.id]}
                            onChange={(e) =>
                              handleQuantityChange(item.id, e.target.value)
                            }
                          />
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="total-price">
                          <span className="money text-dark">
                            {fCurrency(item.quantity * item.product.basePrice)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="cart-remove">
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ---------- Cart Total ---------- */}
          <div className="col-md-4">
            <div className="cart-totals bg-grey py-5">
              <h4 className="text-dark pb-4">Cart Total</h4>
              <div className="total-price pb-5">
                <table cellspacing="0" className="table text-uppercase">
                  <tbody>
                    <tr className="subtotal pt-2 pb-2 border-top border-bottom">
                      <th>Subtotal</th>
                      <td data-title="Subtotal">
                        <span className="price-amount amount text-dark ps-5">
                          <bdi> {fCurrency(calculateSubtotal())} </bdi>
                        </span>
                      </td>
                    </tr>
                    <tr className="order-total pt-2 pb-2 border-bottom">
                      <th>Total</th>
                      <td data-title="Total">
                        <span className="price-amount amount text-dark ps-5">
                          <bdi> {fCurrency(calculateSubtotal())} </bdi>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* ---------- Voucher ---------- */}
              <div className="col-md-12 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter voucher code"
                    value={voucherCode}
                    onChange={HandleChangeVoucher}
                  />
                </div>
                
            {/* ---------- Buttons ---------- */}
              <div className="button-wrap row g-2">
                <div className="col-md-6">
                  <button
                    className="btn btn-dark py-3 px-4 text-uppercase btn-rounded-none w-100"
                    onClick={handleUpdateCart}
                  >
                    Update Cart
                  </button>
                </div>
                <div className="col-md-6">
                  <button 
                  className="btn btn-dark py-3 px-3 text-uppercase btn-rounded-none w-100 text-nowrap"
                  onClick={() => navigate("/products")}>
                    Continue Shopping
                  </button>
                </div>
                <div className="col-md-12">
                  <button
                    className="btn btn-primary py-3 px-4 text-uppercase btn-rounded-none w-100"
                    onClick={handleProceedToCheckout}
                  >
                    Proceed to checkout
                  </button>
                </div>
                {alertError && (
                    <div className="alert alert-danger mt-2">
                      {alertError}
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};
export default Cart;
