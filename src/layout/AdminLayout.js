import React from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import

const AdminLayout = ({ children }) => {
  const navigate = useNavigate(); // Use useNavigate in Layout

  const handleLogout = () => {
    // Define your logout logic here
    console.log('Logged out');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h3 style={styles.sidebarHeader}>Admin</h3>
        <ul style={styles.sidebarList}>
          <li style={styles.sidebarItem} onClick={() => navigate('/admin')}>Dashboard</li>
          <li style={styles.sidebarItem} onClick={() => navigate('/admin/categories')}>Categories</li>
          <li style={styles.sidebarItem}>Products</li>
          <li style={styles.sidebarItem}>Vouchers</li>
          <li style={styles.sidebarItem} onClick={handleLogout}>Logout</li>
        </ul>
      </div>
      <div style={styles.content}>
        {React.Children.toArray(children)} {/* Ensure children are rendered as an array */}
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
    marginBottom: '10px',
    cursor: 'pointer',
  },
  content: {
    flex: 1,
    padding: '20px',
    minHeight: '100vh', // Set the minimum height to the screen's height
  },
};