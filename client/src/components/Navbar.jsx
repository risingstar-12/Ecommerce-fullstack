import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { clearCart } from "../features/cart/cartSlice";

function Navbar() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm">
      <div className="container-fluid">

        <Link className="navbar-brand fw-bold" to="/">
          SHOP.CO
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarMenu"
        >

          <ul className="navbar-nav me-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart (
                {cartItems.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}
                )
              </Link>
            </li>

          </ul>

          <div className="d-flex align-items-center gap-2">

            {user ? (
              <>
                <span className="nav-link">
                  Welcome {user?.username || user || "User"}
                </span>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                className="btn btn-sm btn-primary"
                to="/login"
              >
                Login
              </Link>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;