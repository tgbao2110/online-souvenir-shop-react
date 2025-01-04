import React, { useState } from "react";
import { Modal, Box, TextField } from "@mui/material";
import api from "../../../utils/api";

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
        <h6>
          Create Category
        </h6>
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
        <label>
          Image
        </label><br/>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br/><br/>
        <button  className="btn btn-primary me-1" onClick={handleCreateCategory}>
          Save
        </button>
        <button  className="btn btn-outline-secondary" onClick={handleClose}>
          Close
        </button>
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
