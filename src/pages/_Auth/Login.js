import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import TextInput from "../../components/TextInput";
import { useAuth } from "../../contexts/AuthContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    // Clear previous error messages
    setError("");
    // Check if email or password is missing
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    // Mock authentication logic
    if (email.toLowerCase() === "admin") {
      login("admin");
      navigate("/admin/dashboard");
    } else {
      login("customer");
      navigate("/");
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
                
                {/* --------------- Email --------------- */}
                <TextInput
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
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
