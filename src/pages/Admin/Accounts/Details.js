import React from "react";
import { Modal, Box, Button, Typography } from "@mui/material";

const AccountDetailsModal = ({ 
  open, 
  handleClose, 
  account 
}) => {
  if (!account) {
    return null;
  }

  const gender = account.gender ? "Male" : "Female";
  
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, width: 600 }}>
        <Typography id="modal-modal-title" className="text-center" variant="h6" component="h2">
          Account Details
        </Typography>
        <Box sx={{ mt: 2 }}>
          <section>
            <img src={account.avatarUrl || "default-avatar.png"} alt="Avatar" width="100" />
            <Typography variant="body1"><strong>Full Name:</strong> {account.fullName}</Typography>
            <Typography variant="body1"><strong>User Name:</strong> {account.userName}</Typography>
            <Typography variant="body1"><strong>Gender:</strong> {gender}</Typography>
          </section>
          <br/>
          <section>
            <Typography variant="h6">Basic Info</Typography>
            <Typography variant="body1"><strong>Email:</strong> {account.email}</Typography>
            <Typography variant="body1"><strong>Phone Number:</strong> {account.phoneNumber || "N/A"}</Typography>
            <Typography variant="body1"><strong>Address:</strong> {account.address}</Typography>
          </section>
          <br/>
          <section>
            <Typography variant="h6">Favourite Products</Typography>
            <h2>Favourite Products</h2>
          </section>
          <br/>
          <section>
            <Typography variant="h6">Orders</Typography>
            <h2>Orders</h2>
          </section>
          <br/>
          <section>
            <Typography variant="h6">Review</Typography>
            <h2>Review</h2>
          </section>
          <br/>
          <div className="d-flex justify-content-center">
            <Button variant="outlined" color="black" onClick={handleClose}>
              Close
            </Button>
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
