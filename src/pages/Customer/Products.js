import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import fCurrency from "../../utils/FormatCurrency";
import CustomerLayout from "../../layout/CustomerLayout"; // Import your CSS file

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6); // You can change this value
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/Product");
      console.log("API Response:", response.data);
      const initialProducts = response.data.map((product) => ({
        ...product,
        isFavourite: false, // Initialize favourite status
      }));
      setProducts(initialProducts);
    } catch (error) {
      console.error("Error fetching products", error);
      setError(error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/Category");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.categoryId === selectedCategory : true;
    return matchesSearchTerm && matchesCategory;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <CustomerLayout>
      <div className="container my-5">
        <div className="mb-4">
          <Box display="flex" justifyContent="space-between">
            <TextField
              variant="outlined"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={handleSearch}
              style={{ flex: 1, marginRight: "1rem" }}
            />
            <FormControl variant="outlined" style={{ minWidth: 200 }}>
              <InputLabel>Category</InputLabel>
              <Select value={selectedCategory} onChange={handleCategoryChange} label="Category">
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <Grid container spacing={4}>
          {currentProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                className="product-card" // Add CSS class for hover effect
                onClick={() => handleProductClick(product.id)} // Add click handler
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://localhost:7096/${product.imageUrl}`}
                  alt={product.name}
                />
                <CardContent>
                  <Box
                    textAlign="center"
                    position="relative"
                    className={product.stockQuantity === 0 ? "faded-out" : ""}
                  >
                    <h5>{product.name}</h5>
                    <div className="product-description">
                      {product.description}
                    </div>
                    <Box className="mt-3">
                      <div className="text-primary fs-3">
                        <strong>{fCurrency(product.discountPrice)}</strong>
                      </div>
                      <div className="text-secondary fs-6">
                        {(product.basePrice != product.discountPrice) ? <del>{fCurrency(product.basePrice)}</del> :<br/> }
                      </div>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={Math.ceil(filteredProducts.length / productsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      </div>
    </CustomerLayout>
  );
};

export default Products;
