import Header from "./Header";
import Footer from "./Footer";

const CustomerLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-90">
      <Header/>
      <main className="flex-grow-1 min-vh-90">
        {children}
      </main>
      <Footer />
    </div>
  );
};
export default CustomerLayout;
