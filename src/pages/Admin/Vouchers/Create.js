import React, { useState } from "react";
import dayjs from "dayjs";
import { Modal, Box, Button, Typography, TextField } from "@mui/material";
import api from "../../../utils/api";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const CreateVoucherModal = ({ 
  open, 
  handleClose, 
  fetchVouchers 
}) => {
  const today = dayjs();

  const [code, setCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [expirationDate, setExpirationDate] = useState(today);
  const [maxUsage, setMaxUsage] = useState(0);

  const handleCreateVoucher = async () => {
    const voucherData = {
      code,
      discountAmount,
      expirationDate: expirationDate.toISOString(),
      maxUsageCount: maxUsage,
    };

    try {
      await api.post("/Voucher", voucherData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      fetchVouchers();
      handleClose();
    } catch (error) {
      console.error("Error creating voucher", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={{ ...style, width: 400 }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Create Voucher
        </Typography>
        <TextField
          fullWidth
          required
          label="Code"
          variant="outlined"
          margin="normal"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <TextField
          fullWidth
          required
          label="Discount Amount"
          variant="outlined"
          margin="normal"
          value={discountAmount}
          onChange={(e) => setDiscountAmount(e.target.value)}
          type="number"
          className="mb-4"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Expiration Date"
            value={expirationDate}
            onChange={(newValue) => setExpirationDate(newValue)}
            disablePast
            sx={{ minWidth: 336 }}
          />
        </LocalizationProvider>
        <TextField
          fullWidth
          required
          label="Max Usage"
          variant="outlined"
          margin="normal"
          value={maxUsage}
          onChange={(e) => setMaxUsage(parseInt(e.target.value))}
          type="number"
        />
        <br/><br/>
        <div className="d-flex">
          <Button className="me-2" variant="contained" color="primary" onClick={handleCreateVoucher}>
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
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default CreateVoucherModal;
