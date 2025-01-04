import React, { useState } from "react";
import { Modal, Box, Button, Typography, TextField } from "@mui/material";
import api from "../utils/api";

const CreateCategoryModal = ({ open, handleClose, fetchCategories }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleCreateCategory = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      await api.post("/Category", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchCategories();
      handleClose();
    } catch (error) {
      console.error("Error creating category", error);
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
          Create Category
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
        <Button
          variant="contained"
          component="label"
        >
          Upload Image
          <input
            type="file"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Button>
        <Button variant="contained" color="primary" onClick={handleCreateCategory}>
          Save
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default CreateCategoryModal;
