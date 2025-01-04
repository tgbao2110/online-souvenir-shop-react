import React, { useState, useEffect } from "react";
import { Modal, Box, Button, Typography, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import api from "../../../utils/api";
import dayjs from "dayjs";

const UpdateVoucherModal = ({ 
  open, 
  handleClose, 
  fetchVouchers, 
  voucher 
}) => {
  const [code, setCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [expirationDate, setExpirationDate] = useState(dayjs());
  const [maxUsage, setMaxUsage] = useState(0);

  useEffect(() => {
    if (voucher) {
      setCode(voucher.code);
      setDiscountAmount(voucher.discountAmount);
      setExpirationDate(dayjs(voucher.expirationDate));
      setMaxUsage(voucher.maxUsageCount);
    }
  }, [voucher]);

  const handleUpdateVoucher = async () => {
    const updatedVoucher = {
      code,
      discountAmount,
      expirationDate: expirationDate.toISOString(),
      maxUsageCount: maxUsage,
    };

    try {
      await api.put(`/Voucher/${voucher.id}`, updatedVoucher, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      fetchVouchers();
      handleClose();
    } catch (error) {
      console.error("Error updating voucher", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={{ ...style, width: 400 }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update Voucher
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
          onChange={(e) => setDiscountAmount(parseFloat(e.target.value))}
          type="number"
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
          <Button className="me-2" variant="contained" color="primary" onClick={handleUpdateVoucher}>
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

export default UpdateVoucherModal;
