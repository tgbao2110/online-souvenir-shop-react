import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import api from "../../../utils/api";
const UpdateProductModal = ({ open, handleClose, fetchProducts, product }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [sold, setSold] = useState(0);
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [categoryId, setCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await api.get("/Category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    loadCategories();
  }, []);
  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setStock(product.stockQuantity);
      setSold(product.soldQuantity);
      setPrice(product.basePrice);
      setDiscountPrice(product.discountPrice);
      setCategoryId(product.categoryId);
      setExistingImage(product.imageUrl);
    }
  }, [product]);
  const handleUpdateCategory = async () => {
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Description", description);
    formData.append("StockQuantity", stock);
    formData.append("SoldQuantity", sold);
    formData.append("BasePrice", price);
    formData.append("DiscountPrice", discountPrice);
    formData.append("CategoryId", categoryId);
    if (image) {
      formData.append("File", image);
    } else if (existingImage) {
      formData.append("ExistingFilePath", existingImage);
    }
    try {
      await api.put(`/Category/${product.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchProducts();
      handleClose();
    } catch (error) {
      console.error("Error updating category", error);
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      
      <Box sx={{ ...style, width: 800 }}>
        
        <Typography id="modal-modal-title" variant="h6" component="h2">
          
          Create Product
        </Typography>
        <table style={{ width: "100%" }}>
          
          <td>
            
            <TextField
              required
              fullWidth
              label="Product Name"
              variant="outlined"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <TextField
              required
              fullWidth
              label="Description"
              variant="outlined"
              margin="normal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br /> <label>Upload Image</label>
            <br />
            <input
              className="mb-4"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
            {existingImage && (
              <img
                src={`https://localhost:7096/${existingImage}`}
                alt="Current"
                width="100"
              />
            )}
            <br />
            <br />
            <FormControl fullWidth>
              
              <InputLabel id="demo-simple-select-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                
                {categories.map((category) => (
                  <MenuItem value={category.id}> {category.name} </MenuItem>
                ))}
              </Select>
            </FormControl>
          </td>
          <td style={{ width: "2%" }}></td>
          <td>
            
            <TextField
              fullWidth
              required
              label="Stock Quantity"
              variant="outlined"
              margin="normal"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <TextField
              fullWidth
              label="Sold Quantity"
              variant="outlined"
              margin="normal"
              value={sold}
              onChange={(e) => setSold(e.target.value)}
            />
            <TextField
              fullWidth
              required
              label="Price"
              variant="outlined"
              margin="normal"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              fullWidth
              required
              label="Discount Price"
              variant="outlined"
              margin="normal"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
            />
          </td>
        </table>
        <br />
        <br />
        <div className="d-flex">
          
          <Button
            className="me-2"
            variant="contained"
            color="primary"
            onClick={handleUpdateCategory}
          >
            
            Save
          </Button>
          <Button variant="outlined" color="black" onClick={handleClose}>
            
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
export default UpdateProductModal;
