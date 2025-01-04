import React from "react";
import { Modal, Box, Avatar } from "@mui/material";

const AccountDetailsModal = ({ 
  open, 
  handleClose, 
  account 
}) => {
  if (!account) {
    return null;
  }
  
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, width: 600 }}>
        <Box sx={{ mt: 2 }}>
          <section className="mb-4">
            <table>
              <td>
                <Avatar  
                  className="avatar me-lg-3"
                  sx={{ width: 50, height: 50, transform: "translateY(30%)" }} 
                  src={
                    "https://localhost:7096"+ account.avatarUrl}
                  alt="Avatar"
                >
                  {account.avatarUrl==null && account.userName.charAt(0).toUpperCase()}
                </Avatar>
              </td>
              <td>
                <div><strong>Full Name:</strong> {account.fullName}</div>
                <div><strong>User Name:</strong> {account.userName}</div>
              </td>
            </table>
          </section>
          <section>
            <div>Basic Info</div>
            <div><strong>Gender:</strong> {account.gender ? "Male" : "Female"}</div>
            <div><strong>Email:</strong> {account.email}</div>
            <div><strong>Phone Number:</strong> {account.phoneNumber || "N/A"}</div>
            <div><strong>Address:</strong> {account.address}</div>
          </section>
          <br/>
          <div className="d-flex justify-content-center">
            <button className="btn btn-outline-secondary" onClick={handleClose}>
              Close
            </button>
          </div>
        </Box>
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

export default AccountDetailsModal;
