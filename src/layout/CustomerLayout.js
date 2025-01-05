import Header from "./Header";
import Footer from "./Footer";

const CustomerLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1" style={{ minHeight: "calc(100vh - 100px)" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default CustomerLayout;
