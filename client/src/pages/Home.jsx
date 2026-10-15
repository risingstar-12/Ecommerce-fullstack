import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";
import { useNavigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleBrandClick = (brand) => {
  navigate(`/products?brand=${encodeURIComponent(brand)}`);
};

  return (
    <div>

      {/* HERO */}
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" style={{ height: "500px", objectFit: "cover" }}>
        <div className="carousel-inner">

          <div className="carousel-item active">
            <img src="https://m.media-amazon.com/images/I/71VDfr45JaL._SX3000_.jpg" className="d-block w-100" style={{ height: "500px", objectFit: "cover" }}/>
          </div>

          <div className="carousel-item">
            <img src="https://m.media-amazon.com/images/I/71a8+gOXm+L._SX3000_.jpg" className="d-block w-100" style={{ height: "500px", objectFit: "cover" }}/>
          </div>

          <div className="carousel-item">
            <img src="https://www.shutterstock.com/image-vector/happy-day-superhero-illustration-dad-600nw-2775635931.jpg" className="d-block w-100" style={{ height: "500px", objectFit: "cover" }}/>
          </div>

        </div>
        <button
  className="carousel-control-prev"
  type="button"
  data-bs-target="#carouselExample"
  data-bs-slide="prev"
>
  <span className="carousel-control-prev-icon"></span>
</button>

<button
  className="carousel-control-next"
  type="button"
  data-bs-target="#carouselExample"
  data-bs-slide="next"
>
  <span className="carousel-control-next-icon"></span>
</button>
      </div>

      {/* BRANDS */}
      <div className="container py-4">
        <div className="row text-center align-items-center">

          <div className="col">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg"
              style={{ height: "50px", cursor: "pointer" }}
              onClick={() => handleBrandClick("Nike")} />
          </div>

          <div className="col">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg"
              style={{ height: "50px", cursor: "pointer" }}
              onClick={() => handleBrandClick("Adidas")} />
          </div>

          <div className="col">
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg"
              style={{ height: "50px", cursor: "pointer" }}
              onClick={() => handleBrandClick("Zara")} />
          </div>

          <div className="col">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg"
              style={{ height: "50px", cursor: "pointer" }}
              onClick={() => handleBrandClick("H&M")} />
          </div>

          <div className="col">
            <img src="https://images.seeklogo.com/logo-png/31/2/lacoste-logo-png_seeklogo-318446.png"
              style={{ height: "100px", cursor: "pointer" }}
              onClick={() => handleBrandClick("Lacoste")} />
          </div>

        </div>
      </div>

      <hr />

      {/* NEW ARRIVALS */}
      <div className="container mt-5">
        <h2 className="text-center">NEW ARRIVALS</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="row g-4">
            {items.slice(0, 4).map((p) => (
              <div className="col-md-3" key={p.id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TOP SELLING */}
      <div className="container mt-5">
        <h2 className="text-center">TOP SELLING</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="row g-4">
            {items.slice(4, 8).map((p) => (
              <div className="col-md-3" key={p.id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>

     <div className="container mt-5 p-4 shadow rounded bg-light">

  <div className="row g-4">

    {/* PARTY */}
    <div className="col-md-3">
      <Link to="/products" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="card shadow-sm h-100">
          <img
            src="/images/party.jpg"
            className="card-img-top"
            style={{ height: "180px", objectFit: "cover" }}
          />
          <div className="card-body text-center">
            <h5>Party</h5>
          </div>
        </div>
      </Link>
    </div>

    {/* GYM */}
    <div className="col-md-3">
      <Link to="/products" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="card shadow-sm h-100">
          <img
            src="/images/gym.webp"
            className="card-img-top"
            style={{ height: "180px", objectFit: "cover" }}
          />
          <div className="card-body text-center">
            <h5>Gym</h5>
          </div>
        </div>
      </Link>
    </div>

    {/* CASUAL */}
    <div className="col-md-3">
      <Link to="/products" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="card shadow-sm h-100">
          <img
            src="/images/casual.webp"
            className="card-img-top"
            style={{ height: "180px", objectFit: "cover" }}
          />
          <div className="card-body text-center">
            <h5>Casual</h5>
          </div>
        </div>
      </Link>
    </div>

    {/* FORMAL */}
    <div className="col-md-3">
      <Link to="/products" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="card shadow-sm h-100">
          <img
            src="/images/formal.webp"
            className="card-img-top"
            style={{ height: "180px", objectFit: "cover" }}
          />
          <div className="card-body text-center">
            <h5>Formal</h5>
          </div>
        </div>
      </Link>
    </div>

  </div>
</div>
      {/* CUSTOMERS */}
      <div className="container mt-5 p-5">
  <h3 className="text-center mb-4">OUR HAPPY CUSTOMERS</h3>

  <div
    id="reviewCarousel"
    className="carousel slide"
    data-bs-ride="carousel"
  >
    <div className="carousel-inner">

      {/* First Slide */}
      <div className="carousel-item active">
        <div className="row text-center">

          <div className="col-md-4">
            <div className="card p-3 shadow-sm h-100">
              <h6>Ayesha</h6>
              <p>⭐⭐⭐⭐⭐</p>
              <p>Great quality!</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3 shadow-sm h-100">
              <h6>Rahul</h6>
              <p>⭐⭐⭐⭐⭐</p>
              <p>Nice products!</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3 shadow-sm h-100">
              <h6>Sara</h6>
              <p>⭐⭐⭐⭐⭐</p>
              <p>Fast delivery!</p>
            </div>
          </div>

        </div>
      </div>

      {/* Second Slide */}
      <div className="carousel-item">
        <div className="row text-center">

          <div className="col-md-4">
            <div className="card p-3 shadow-sm h-100">
              <h6>John</h6>
              <p>⭐⭐⭐⭐⭐</p>
              <p>Excellent customer service!</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3 shadow-sm h-100">
              <h6>Fatima</h6>
              <p>⭐⭐⭐⭐⭐</p>
              <p>Beautiful collection and good prices.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3 shadow-sm h-100">
              <h6>David</h6>
              <p>⭐⭐⭐⭐⭐</p>
              <p>Will definitely shop again!</p>
            </div>
          </div>

        </div>
      </div>

    </div>

    {/* Previous Button */}
    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#reviewCarousel"
      data-bs-slide="prev"
    >
      <span className="carousel-control-prev-icon bg-dark rounded-circle"></span>
    </button>

    {/* Next Button */}
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#reviewCarousel"
      data-bs-slide="next"
    >
      <span className="carousel-control-next-icon bg-dark rounded-circle"></span>
    </button>

  </div>
</div>

    </div>
  );
}

export default Home;