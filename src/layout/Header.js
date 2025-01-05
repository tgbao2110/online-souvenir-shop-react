import { Link } from "react-router-dom";
import AuthButtons from "./AuthButtons";
import UserArea from "./UserArea";
import { useAuth } from "../contexts/AuthContext"; // Import the useAuth hook

const Header = () => {
  const { role } = useAuth();

  return (
    <div className="container-fluid">
      <div className="row py-3 border-bottom d-flex justify-content-between align-items-center">

        {/* --------------- Logo --------------- */}
        <div className="col-sm-4 col-md-2 d-flex align-items-center">
          <Link to="/">
            <img src="images/logo.svg" alt="logo" className="img-fluid" />
          </Link>
          <button
            className="navbar-toggler ms-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              {/* <use xlink:href="#menu"></use> */}
            </svg>
          </button>
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
              <a href="index.html" className="nav-link">
                Categories
              </a>
            </li>
            <li className="nav-item active">
              <a href="/products" className="nav-link">
                Products
              </a>
            </li>
            <li className="nav-item active">
              <a href="index.html" className="nav-link">
                About us
              </a>
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
