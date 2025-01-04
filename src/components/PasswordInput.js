import React, { useState } from "react";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
const PasswordInput = ({ value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-group mb-2" style={{ position: "relative" }}>
      <input
        type={showPassword ? "text" : "password"}
        className="form-control p-3"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        onClick={toggleShowPassword}
        style={{
          color: "#777",
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          padding: "0",
          cursor: "pointer",
        }}
      >
        {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
      </button>
    </div>
  );
};

export default PasswordInput;
