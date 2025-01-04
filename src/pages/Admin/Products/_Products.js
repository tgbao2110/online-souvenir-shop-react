import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import AdminLayout from "../../../layout/AdminLayout";
import TextInput from "../../../components/TextInput";
import fCurrency from "../../../utils/FormatCurrency";
import fTime from "../../../utils/FormatDateTime";

import CreateProductModal from "./Create";
import UpdateProductModal from "./Update";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/Product");
      const productsData = response.data;

      const productsWithCategories = await Promise.all(
        productsData.map(async (product) => {
          const categoryName = await fetchCategoryName(product.categoryId);
          return { ...product, categoryName };
        })
      );

      setProducts(productsWithCategories);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const fetchCategoryName = async (id) => {
    try {
      const response = await api.get(`/Category/${id}`);
      return response.data.name;
    } catch (error) {
      console.error("Error fetching category name", error);
      return "N/A";
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="container mt-5">
        <h1 className="text text-primary mb-3">Products</h1>
        <div className="mb-3">
          <TextInput
            type="text"
            className="input-group outline-primary"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for products..."
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          Add Product
        </button>
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Date</th>
              <th>Base Price</th>
              <th>Disc. Price</th>
              <th>Stock</th>
              <th>Sold</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{fTime(product.createdDate)}</td>
                <td>{fCurrency(product.basePrice)}</td>
                <td>{fCurrency(product.discountPrice)}</td>
                <td>{product.stockQuantity}</td>
                <td>{product.soldQuantity}</td>
                <td>{product.categoryName}</td>
                <td>
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => {
                      setCurrentProduct(product);
                      setShowUpdateModal(true);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <CreateProductModal
          open={showCreateModal}
          handleClose={() => setShowCreateModal(false)}
          fetchProducts={fetchProducts}
        />

        <UpdateProductModal
          open={showUpdateModal}
          handleClose={() => setShowUpdateModal(false)}
          fetchProducts={fetchProducts}
          product={currentProduct}
        />
      </div>
    </AdminLayout>
  );
};

export default Products;
