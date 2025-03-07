import React, { useState, useEffect } from "react";
import {TextField } from "@mui/material";
import api from "../../../utils/api";
import AdminLayout from "../../../layout/AdminLayout";
import AccountDetailsModal from "./Details";
import TextInput from "../../../components/TextInput";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await api.get("/Account");
      console.log("API Response:", response.data);
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching accounts", error);
      setError(error.message);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAccounts = accounts.filter((account) =>
    account.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="container mt-5">
        <h1 className="text-primary mb-4">Accounts</h1>
        <div className="mb-3">
          <TextInput type="text" className="input-group outline-primary"
            placeholder="Search for accounts..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <table className="table table-hover table-group-divider mt-3">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((account) => (
              <tr key={account.id}>
                <td>{account.userName}</td>
                <td>{account.fullName}</td>
                <td>{account.email}</td>
                <td>
                  <button
                    className="btn btn-primary mr-2" 
                    onClick={() => {
                      setCurrentAccount(account);
                      setShowDetailsModal(true);
                    }}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <AccountDetailsModal
          open={showDetailsModal}
          handleClose={() => setShowDetailsModal(false)}
          account={currentAccount}
        />
      </div>
    </AdminLayout>
  );
};

export default Accounts;
