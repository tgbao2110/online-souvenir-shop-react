
const AdminLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-90">
      <main className="flex-grow-1 min-vh-90">
        {children}
      </main>
    </div>
  );
};
export default AdminLayout;
