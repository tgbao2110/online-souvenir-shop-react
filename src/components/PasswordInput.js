import React, { useState } from "react";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-group mb-2">
      <input
        type={showPassword ? "text" : "password"}
        className="form-control p-3"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <button type="button" onClick={toggleShowPassword}>
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>
  );
};

export default PasswordInput;
