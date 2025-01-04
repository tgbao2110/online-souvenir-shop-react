// TextInput.js
import React from "react";

const TextInput = ({ type = "text", value, onChange, placeholder }) => {
  return (
    <div className="form-group mb-2">
      <input
        type={type}
        className="form-control p-3"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
