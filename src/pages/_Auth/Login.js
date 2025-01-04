import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import TextInput from "../../components/TextInput";
import { useAuth } from '../../contexts/AuthContext';
import api from '../../utils/api';  // Update the import path as necessary

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Clear previous error messages
    setError("");

    // Check if username or password is missing
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      const response = await api.post('/Account/login', {
        userName: username,
        password: password
      });

      const token = response.data.token;
      localStorage.setItem('authToken', token);

      if (username.toLowerCase() === "admin@gmail.com") {
        login("admin");
        navigate("/admin/dashboard");
      } else {
        login("customer");
        navigate("/");
      }
    } catch (err) {
      setError("Login failed. Please check your username and password.");
    }
  };

  return (
    <div className="container mt-lg-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card p-3">
            <div className="card-body">
              {/* --------------- Title --------------- */}
              <h3 className="text-primary text-center mb-4">Login</h3>
              {/* --------------- Error --------------- */}
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                {/* --------------- Username --------------- */}
                <TextInput
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
                {/* -------------- Password -------------- */}
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                {/* ------------- Remember me ------------- */}
                <div className="d-flex align-items-center mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="remember"
                  />
                  <label className="form-check-label ms-2" htmlFor="remember">
                    Remember me
                  </label>
                </div>
                {/* ---------------- Submit ---------------- */}
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mt-4 flex-grow-1"
                  >
                    Login
                  </button>
                </div>
                {/* ---------------- Links ---------------- */}
                <div>
                  <div className="text-center mt-3">
                    <Link to="/forgotpassword" className="text-primary">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="text-center">
                    <span className="text-muted">
                      Don't have an account?
                    </span>
                    <Link to="/register" className="text-primary">
                      Register here
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
