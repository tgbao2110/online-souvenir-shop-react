import React, { useState } from "react";
import dayjs from "dayjs";
import api from "../../../utils/api";
import { Modal, Box, TextField } from "@mui/material";
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
          < button className=" btn btn-primary me-2" onClick={handleCreateVoucher}>
            Save
          </button>
          <button className="btn btn-outline-secondary" onClick={handleClose}>
            Close
          </button>
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
