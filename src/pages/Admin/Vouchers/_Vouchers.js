import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import api from "../../../utils/api";
import AdminLayout from "../../../layouts/AdminLayout";
import CreateVoucherModal from "./Create";
import UpdateVoucherModal from "./Update";
import DeleteVoucherModal from "./Delete";
const Vouchers = () => {
  const [vouchers, setVouchers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentVoucher, setCurrentVoucher] = useState(null);
  useEffect(() => {
    fetchVouchers();
  }, []);
  const fetchVouchers = async () => {
    try {
      const response = await api.get("/Voucher");
      console.log("API Response:", response.data);
      setVouchers(response.data);
    } catch (error) {
      console.error("Error fetching vouchers", error);
      setError(error.message);
    }
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredVouchers = vouchers.filter((voucher) =>
    voucher.code.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <AdminLayout>
      <div className="container mt-5">
        <h1 className="text-secondary mb-4">Vouchers</h1>
        <div className="mb-3">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search vouchers"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowCreateModal(true)}
        >
          Add Voucher
        </Button>
        <table className="table table-hover table-group-divider mt-3">
          <thead>
            <tr>
              <th>Code</th> <th>Discount</th> <th>Exp Date</th> <th>Status</th>
              <th>Current Usage</th> <th>Max Usage</th> <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVouchers.map((voucher) => (
              <tr key={voucher.id}>
                <td>{voucher.code}</td> <td>{voucher.discountAmount}</td>
                <td>{voucher.expirationDate}</td> <td>{voucher.status}</td>
                <td>{voucher.maxUsageCount.toLocaleString()}</td>
                <td>{voucher.currentUsageCount.toLocaleString()}</td>
                <td>
                  <Button
                    style={{ marginRight: "10px" }}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setCurrentVoucher(voucher);
                      setShowUpdateModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setCurrentVoucher(voucher);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <CreateVoucherModal
          open={showCreateModal}
          handleClose={() => setShowCreateModal(false)}
          fetchVouchers={fetchVouchers}
        />
        <UpdateVoucherModal
          open={showUpdateModal}
          handleClose={() => setShowUpdateModal(false)}
          fetchVouchers={fetchVouchers}
          voucher={currentVoucher}
        />
        <DeleteVoucherModal
          open={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          fetchVouchers={fetchVouchers}
          voucher={currentVoucher}
        />
      </div>
    </AdminLayout>
  );
};
export default Vouchers;
