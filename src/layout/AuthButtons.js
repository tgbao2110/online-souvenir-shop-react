import React from "react";
import { Link } from "react-router-dom";

const AuthButtons = () => {

  return (
    <div class="d-flex gap-2">
      <Link to="/login" class="btn btn-primary">Login</Link>
      <Link to="/register" class="btn btn-secondary">Register</Link>
    </div>
  );
};

export default AuthButtons;
