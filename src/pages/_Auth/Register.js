import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import TextInput from "../../components/TextInput";
import api from "../../utils/api";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [gender, setGender] = useState("Male");
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const response = await api.post("Account/register", {
        userName: username,
        email: email,
        password: password,
        fullname: fullname,
        phoneNumber: phoneNumber,
        address: address,
        avatar: image,
        gender: (gender==="Male")?true:false
      });

      if (response.status === 200) {
        setAlert("Sign up successfully!");
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        setError(error.message);
      } else if (error.request) {
        setError("No response from the server. Please try again later.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-3">
            <div className="card-body">
              <h3 className="text-primary text-center mb-4">Sign Up</h3>
              
              {error && <div className="alert alert-danger">{error}</div>}
              {alert && <div className="alert alert-success">{alert}</div>}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <TextInput
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                    />
                    <PasswordInput
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                  </div>
                  <div className="col-md-6">
                    <TextInput
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      placeholder="Full name"
                    />
                    <TextInput
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                    <TextInput 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Phone number" 
                    />
                    <TextInput 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Address" 
                    />
                    <label>Profile picture</label>
                    <br/>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                    <br/>
                    <div className="mb-3">
                      <label className="form-label">Gender</label>
                      <br/>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="male"
                          value="Male"
                          checked={gender === "Male"}
                          onChange={() => setGender("Male")}
                        />
                        <label className="form-check-label" htmlFor="male">Male</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="female"
                          value="Female"
                          checked={gender === "Female"}
                          onChange={() => setGender("Female")}
                        />
                        <label className="form-check-label" htmlFor="female">Female</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block my-4 flex-grow-1"
                  >
                    Sign up
                  </button>
                </div>
                <div className="text-center">
                    <span className="text-muted">
                      Already have an account?
                    </span>
                    <Link to="/login" className="text-primary">
                      Login here
                    </Link>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
