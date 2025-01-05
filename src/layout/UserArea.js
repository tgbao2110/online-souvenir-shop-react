import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Menu, MenuItem } from "@mui/material";
import Person3OutlinedIcon from '@mui/icons-material/Person3Outlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';


const UserArea = () => {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="d-flex gap-4 ms-3">
      <Link to="/cart">
        <div>
          <ShoppingCartOutlinedIcon className="text-primary fs-3"/>
        </div>
      </Link>
      
      {/* User button, with a dropdown "Profile", "Favourite" */}
      <div className="dropdown">
        <div
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        >
          <Person3OutlinedIcon className="text-primary fs-3"/>
        </div>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link to="/profile" className="text-decoration-none">
              <AccountBoxRoundedIcon className="me-2"/>
              Profile
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/favourite" className="text-decoration-none">
              <FavoriteRoundedIcon className="me-2"/>
              Favourite
            </Link>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ExitToAppRoundedIcon className="me-2"/>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default UserArea;
