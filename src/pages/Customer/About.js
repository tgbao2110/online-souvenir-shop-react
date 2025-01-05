import React from "react";
import Header from "../../layout/Header";

const About = () => {
  return (
    <div>
      <Header/>
      <div class="bg-primary text-center py-5">
        <h1 className="text-white">About Us</h1>
      </div>

      <section class="container my-5">
        <div class="row">
          <div class="col-md-4">
            <img
              style={{ width: "200px", height: "200px", transform: "translateX(50%)" }}
              src="/images/logo.png"
              alt="Company Logo"
              class="img-fluid"
            />
          </div>
          <div class="col-md-6 mb-3">
            <h2>Welcome to Online Souvenir Shop</h2>
            <p>
              Online souvenir shop offers a wide range of handmade crafts,
              traditional clothing, home decor, local food products, and
              accessories. We pride Onlineselves on providing high-quality, unique
              items that showcase the rich cultural heritage of Online region.
            </p>
            <p>
              Online mission is to bring the beauty and craftsmanship of local
              artisans to a broader audience, promoting cultural appreciation
              and supporting the local community.
            </p>
          </div>
        </div>
      </section>
      <footer class="bg-dark text-white text-center py-3 mt-5">
        <p>&copy; 2025 Online Souvenir Shop. All rights reserved.</p>
      </footer>

      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </div>
  );
};

export default About;