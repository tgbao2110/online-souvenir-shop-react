import { Link } from "react-router-dom";
import AuthButtons from "./AuthButtons";
import UserArea from "./UserArea";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { role } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <div className="row py-3 border-bottom d-flex justify-content-between align-items-center">

        {/* --------------- Logo --------------- */}
        <div className="col-sm-4 col-md-2 d-flex align-items-center">
          <Link to="/">
            <img style={{ width: "70px", height: "70px" }} src="images/logo.png" alt="logo" className="img-fluid" />
          </Link>
        </div>

        {/* --------------- Navbar --------------- */}
        <div className="col-lg-6">
          <ul className="navbar-nav list-unstyled d-flex flex-row gap-3 gap-lg-5 justify-content-center flex-wrap align-items-center mb-0 fw-bold text-uppercase text-dark">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/products" className="nav-link">
                Shop now
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/about" className="nav-link">
                About us
              </Link>
            </li>
          </ul>
        </div>
        
        {/* --------------- Buttons --------------- */}
        <div className="col-sm-4 col-md-2 text-end">
          {role === "guest" ? <AuthButtons /> : <UserArea />}
        </div>

      </div>
    </div>
  );
};

export default Header;
