import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      {/* Newsletter Section */}
      <div className="container my-5 bg-dark text-white p-4 rounded-4">
        <div className="row align-items-center">

          <div className="col-md-6">
            <h4 className="fw-bold">
              STAY UP TO DATE ABOUT OUR LATEST OFFERS
            </h4>
          </div>

          <div className="col-md-6">
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email address"
              />
            </div>

            <button
              className="btn btn-light w-100 rounded-pill"
              onClick={() => alert("Subscribed successfully!")}
            >
              Subscribe To Newsletter
            </button>
          </div>

        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-dark text-light py-5">
        <div className="container">
          <div className="row">

            {/* LOGO CLICKABLE */}
            <div className="col-md-4 mb-4">
              <Link
                to="/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h4 className="fw-bold">SHOP.CO</h4>
              </Link>

              <p>
                We have clothes that suit your style and which you're proud to wear.
                From women to men.
              </p>
            </div>

            {/* CONTACT CLICKABLE */}
            <div className="col-md-4 mb-4">
              <h5>Contact</h5>

              <p>
                Email:{" "}
                <a href="mailto:support@mystore.com" className="text-light">
                  support@mystore.com
                </a>
              </p>

              <p>
                Phone:{" "}
                <a href="tel:+971336669999" className="text-light">
                  +971 33 666 9999
                </a>
              </p>
            </div>

            {/* NEWSLETTER */}
            <div className="col-md-4 mb-4">
              <h5>Newsletter</h5>
              <p>Subscribe for latest offers and updates.</p>

              <Link
                to="/subscribe"
                className="btn btn-outline-light btn-sm"
              >
                Subscribe Page
              </Link>
            </div>

          </div>

          <hr />

          <div className="text-center">
            <p className="mb-0">
              © 2026 SHOP.CO. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;