const Footer = () => {
    return (
        <div>
            <footer className="py-5">
      <div className="container-lg">
        <div className="row">

          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="footer-menu">
              <img style={{ width: "200px", height: "200px" }} src="images/logo.png" alt="logo"/>
              <div className="social-links mt-3">
              </div>
            </div>
          </div>

          <div className="col-md-2 col-sm-6">
            <div className="footer-menu">
              <h5 className="widget-title">Organic</h5>
              <ul className="menu-list list-unstyled">
                <li className="menu-item">
                  <a href="#" className="nav-link">About us</a>
                </li>
                <li className="menu-item">
                  <a href="#" className="nav-link">Conditions </a>
                </li>
                <li className="menu-item">
                  <a href="#" className="nav-link">Our Journals</a>
                </li>
                <li className="menu-item">
                  <a href="#" className="nav-link">Careers</a>
                </li>
                <li className="menu-item">
                  <a href="#" className="nav-link">Affiliate Programme</a>
                </li>
                <li className="menu-item">
                  <a href="#" className="nav-link">Ultras Press</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2 col-sm-6">
            <div className="footer-menu">
              <h5 className="widget-title">Quick Links</h5>
              <ul className="menu-list list-unstyled">
                <li className="menu-item">
                  <a href="#" className="nav-link">Offers</a>
                </li>
                <li className="menu-item">
                  <a href="#" className="nav-link">Discount Coupons</a>
                </li>
                <li className="menu-item">
                  <a href="#" className="nav-link">Stores</a>
                </li>
                <li className="menu-item">
                  <a href="#" className="nav-link">Track Order</a>
                </li>
                <li className="menu-item">
                  <a href="#" className="nav-link">Shop</a>
                </li>
                <li className="menu-item">
                  <a href="#" className="nav-link">Info</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2 col-sm-6">
            <div className="footer-menu">
              <h5 className="widget-title">Customer Service</h5>
              <ul className="menu-list list-unstyled">
                <li className="menu-item">
                  <a href="#" className="nav-link">FAQ</a>
                </li>
                <li className="menu-item">
                  <a href="#" className="nav-link">Contact</a>
                </li>
                <li className="menu-item">
                  <a href="#" className="nav-link">Privacy Policy</a>
                </li>
                <li className="menu-item">
                  <a href="#" className="nav-link">Returns & Refunds</a>
                </li>
                <li className="menu-item">
                  <a href="#" className="nav-link">Cookie Guidelines</a>
                </li>
                <li className="menu-item">
                  <a href="#" className="nav-link">Delivery Information</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="footer-menu">
              <h5 className="widget-title">Subscribe Us</h5>
              <p>Subscribe to our newsletter to get updates about our grand offers.</p>
              <form className="d-flex mt-3 gap-0" action="index.html">
                <input className="form-control rounded-start rounded-0 bg-light" type="email" placeholder="Email Address" aria-label="Email Address"/>
                <button className="btn btn-dark rounded-end rounded-0" type="submit">Subscribe</button>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
    <div id="footer-bottom">
      <div className="container-lg">
        <div className="row">
          <div className="col-md-6 copyright">
            <p>© 2024 Online Souvenir Shop. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>    
        </div>
    )
}
export default Footer   