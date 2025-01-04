import React, { useState, useEffect } from "react";
import { Modal, Box, Button, Typography, TextField } from "@mui/material";
import api from "../../../utils/api";

const UpdateCategoryModal = ({ open, handleClose, fetchCategories, category }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
      setExistingImage(category.imageUrl);
    }
  }, [category]);

  const handleUpdateCategory = async () => {
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Description", description);

    if (image) {
      formData.append("File", image);
    } else if (existingImage) {
      formData.append("ExistingFilePath", existingImage);
    }

    try {
      await api.put(`/Category/${category.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchCategories();
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
      <Box sx={{ ...style, width: 400 }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update Category
        </Typography>
        <TextField
          fullWidth
          label="Category Name"
          variant="outlined"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Typography variant="body2" gutterBottom>
          Current Image:
        </Typography>
        {existingImage && (
          <img
            src={`https://localhost:7096/${existingImage}`}
            alt="Current"
            width="100"
          />
        )}
        <br />
        <label>Upload New Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
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

export default UpdateCategoryModal;
