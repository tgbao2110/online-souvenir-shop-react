import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import api from "../../../utils/api";

const CreateProductModal = ({ open, handleClose, fetchProducts }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [sold, setSold] = useState(0);
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [categoryId, setCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);

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

  const handleCreateProduct = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("stockQuantity", stock);
    formData.append("soldQuantity", sold);
    formData.append("basePrice", price);
    formData.append("discountPrice", discountPrice);
    formData.append("categoryId", categoryId);
    if (image) {
      formData.append("file", image);
    }

    try {
      await api.post("/Product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchProducts();
      handleClose();
    } catch (error) {
      console.error("Error creating product", error);
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
        <table>
          <td>
            <div className="me-lg-3" style={{ transform: "translateY(-6.5%)" }}>
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
            <label>Upload Image</label>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            </div>
          </td>
          <td>
            <div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                className="mb-2"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem value={category.id}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
            </div>
          </td>
          <td>
            <div className="me-lg-3"></div>
          </td>
        </table>
        <div className="d-flex">
          <button
            className="btn btn-primary me-2"
            onClick={handleCreateProduct}
          >
            Save
          </button>
          <button className="btn btn-outline-secondary" onClick={handleClose}>
            Close
          </button>
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

export default CreateProductModal;
