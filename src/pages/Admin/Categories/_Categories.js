import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import api from "../utils/api";
import CreateCategoryModal from "../components/CreateCategoryModal";
import UpdateCategoryModal from "../components/UpdateCategoryModal";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

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
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1>Categories</h1>
      <div className="mb-3">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search categories"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <Button variant="contained" color="primary" onClick={() => setShowCreateModal(true)}>
        Add Category
      </Button>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => {
                    setCurrentCategory(category);
                    setShowUpdateModal(true);
                  }}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CreateCategoryModal
        open={showCreateModal}
        handleClose={() => setShowCreateModal(false)}
        fetchCategories={fetchCategories}
      />

      <UpdateCategoryModal
        open={showUpdateModal}
        handleClose={() => setShowUpdateModal(false)}
        fetchCategories={fetchCategories}
        category={currentCategory}
      />
    </div>
  );
};

export default Categories;
