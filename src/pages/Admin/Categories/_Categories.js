import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import AdminLayout from "../../../layout/AdminLayout";
import TextInput from "../../../components/TextInput";

import CreateCategoryModal from "./Create"
import UpdateCategoryModal from "./Update"

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
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
    <div className="container mt-5">
      <h1 className="text text-primary mb-3">Categories</h1>
      <div className="mb-3">
        <TextInput type="text" className="input-group outline-primary"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for categories..."
        />
      </div>
      <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
        Add Category
      </button>
      <table className="table table-hover table-group-divider mt-3">
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
                <button
                  className="btn btn-primary mr-2" 
                  onClick={() => {
                    setCurrentCategory(category);
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
    </AdminLayout>
  );
};

export default Categories;
