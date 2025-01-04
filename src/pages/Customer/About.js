import React from "react";
import CustomerLayout from "../../layout/CustomerLayout";

const About = () => {
  return (
    <CustomerLayout>
      <div class="bg-primary text-white text-center py-5">
        <h1>About Us</h1>
      </div>

      <section class="container my-5">
        <div class="row">
          <div class="col-md-6">
            <img
              src="/images/icons/logo.png"
              alt="Company Logo"
              class="img-fluid"
            />
          </div>
          <div class="col-md-6">
            <h2>Welcome to Our Souvenir Shop</h2>
            <p>
              Our souvenir shop offers a wide range of handmade crafts,
              traditional clothing, home decor, local food products, and
              accessories. We pride ourselves on providing high-quality, unique
              items that showcase the rich cultural heritage of our region.
            </p>
            <p>
              Our mission is to bring the beauty and craftsmanship of local
              artisans to a broader audience, promoting cultural appreciation
              and supporting the local community.
            </p>
          </div>
        </div>
      </section>

      <footer class="bg-dark text-white text-center py-3">
        <p>&copy; 2025 Our Souvenir Shop. All rights reserved.</p>
      </footer>

      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </CustomerLayout>
  );
};
