import { React, useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../utils/api";
import fCurrency from "../../utils/FormatCurrency";
import CustomerLayout from "../../layout/CustomerLayout";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const { role } = useAuth(); 

  const fetchProductDetails = async () => {
    try {
      const response = await api.get(`/Product/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details", error);
      setError("Error fetching product details. Please try again later.");
    }
  };

  const handleFavourite = async () => {
    if(role==="guest") window.location.href="/login";
    try {
      await api.post("/Product/add-favourite", { productId: product.id });
      setAlertMessage("Added to favourites successfully!");
      setAlertSeverity("success");
    } catch (error) {
      console.error("Error adding to favourite", error);
      setAlertMessage("Error adding to favourites. Please try again later.");
      setAlertSeverity("error");
    }
    setAlertOpen(true);
  };

  const handleCart = async () => {
    if(role==="guest") window.location.href="/login";
    try {
      await api.post("/Cart", { productId: product.id, quantity });
      setAlertMessage("Added to cart successfully!");
      setAlertSeverity("success");
    } catch (error) {
      console.error("Error adding to cart", error);
      setAlertMessage("Error adding to cart. Please try again later.");
      setAlertSeverity("error");
    }
    setAlertOpen(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  if (error) {
    return (
      <CustomerLayout>
        <div className="container mt-5">
          <div className="alert alert-danger">{error}</div>
        </div>
      </CustomerLayout>
    );
  }

  if (!product) {
    return (
      <CustomerLayout>
        <div className="container mt-5">
          <h4>Loading...</h4>
        </div>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      <div className="container mt-5">
        <div className="row g-5">
          <div className="col-lg-7">
            <div className="row flex-column-reverse flex-lg-row">
              <div className="col-md-12 col-lg-2">
                <div className="product-image p-4 ms-5">
                  <img
                    height={500}
                    width={500}
                    src={`https://localhost:7096/${product.imageUrl}`}
                    alt={product.name}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="product-info">
              <div className="element-header">
                <h2 itemProp="name">{product.name}</h2>
                <div className="rating-container d-flex gap-0 align-items-center">
                </div>
                {product.stockQuantity === 0 && (
                  <h3 className="text-danger mt-2">Out of stock</h3>
                )}
              </div>
              <div className="product-price pt-3 pb-3">
                <strong className="text-primary display-6 fw-bold">
                  {fCurrency(product.discountPrice)}
                </strong>
                <br/>
                <span className="text-muted fs-4">
                  {(product.basePrice != product.discountPrice) ? <del>{fCurrency(product.basePrice)}</del> :<br/> }
                </span>
              </div>
              <p>{product.description}</p>
              <div className="product-qty text-wrap py-4">
                <label className="me-2 mb-2">Quantity: </label>
                <input
                    type="number"
                    min="1"
                    max={product.stockQuantity}
                    value={quantity}
                    onChange={(e) => {
                        const value = Math.max(1, e.target.value);
                        setQuantity(value);
                    }}
                />

                <div class="stock-number text-dark">
                  <em>{product.stockQuantity} products available</em>
                  </div>
              </div>
              <div class="qty-button d-flex flex-wrap pt-3">
                {product.stockQuantity > 0 && <button
                  class="btn btn-primary py-3 px-4 text-uppercase me-3 mt-3"
                  onClick={handleCart}
                >
                  Add to Cart
                </button>}
                <button
                  class="btn btn-dark py-3 px-4 text-uppercase mt-3"
                  onClick={handleFavourite}
                >
                  Add to Favourite
                </button>
              </div>
              <div class="meta-product py-2">
                <div class="meta-item d-flex align-items-baseline">
                  <h6 class="item-title no-margin pe-2">SKU:</h6>
                  <span>1223</span>
                </div>
                <div class="meta-item d-flex align-items-baseline">
                  <h6 class="item-title no-margin pe-2">Category:</h6>
                  <a>{product.category.name}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </CustomerLayout>
  );
};

export default ProductDetail;
