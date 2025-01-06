import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate(); // Use useNavigate in Layout
  const location = useLocation(); // Use useLocation to get the current path
  const [hoveredItem, setHoveredItem] = useState(null);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleMouseEnter = (index) => setHoveredItem(index);
  const handleMouseLeave = () => setHoveredItem(null);

  const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Orders', path: '/admin/orders' },
    { label: 'Categories', path: '/admin/categories' },
    { label: 'Products', path: '/admin/products' },
    { label: 'Vouchers', path: '/admin/vouchers' },
    { label: 'Accounts', path: '/admin/accounts' },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h3 style={styles.sidebarHeader}>Admin</h3>
        <ul style={styles.sidebarList}>
          {menuItems.map((item, index) => (
            <li
              key={index}
              style={{
                ...styles.sidebarItem,
                ...(hoveredItem === index ? styles.sidebarItemHover : {}),
                ...(location.pathname === item.path ? styles.sidebarItemActive : {}),
              }}
              onClick={item.onClick || (() => navigate(item.path))}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {item.label}
            </li>
          ))}
          <li>
            <button onClick={handleLogout} className="btn bg-danger text-white mt-3">
                <ExitToAppRoundedIcon className="me-2"/>
                Logout
            </button>
          </li>
        </ul>
      </div>
      <div style={styles.content}>
        {React.Children.toArray(children)}
      </div>
    </div>
  );
};

export default AdminLayout;

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
  },
  sidebar: {
    width: '200px',
    background: '#f4f4f4',
    padding: '20px',
  },
  sidebarHeader: {
    marginBottom: '20px',
  },
  sidebarList: {
    listStyle: 'none',
    padding: '0',
  },
  sidebarItem: {
    marginTop: '15px',
    marginBottom: '15px',
    cursor: 'pointer',
    padding: '10px',
    borderRadius: '4px',
    transition: 'background-color 0.3s, color 0.3s',
  },
  sidebarItemHover: {
    backgroundColor: '#ddd',
    color: '#000',
  },
  sidebarItemActive: {
    backgroundColor: '#ccc',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: '20px',
    minHeight: '100vh',
  },
};
