import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  decreaseQuantity,
} from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  const getTotal = () => {
    return cartItems.reduce(
      (total, item) =>
        total + Number(item.price) * item.quantity,
      0
    );
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-info">
          Your cart is empty
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="card mb-3 shadow-sm"
            >
              <div className="row g-0 align-items-center">

                {/* Product Image */}
                <div className="col-md-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-fluid rounded-start"
                    style={{
                      height: "180px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Product Details */}
                <div className="col-md-6">
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.name}
                    </h5>

                    <p className="mb-1">
                      <strong>Price:</strong> $
                      {item.price}
                    </p>

                    <p className="text-success fw-bold">
                      Subtotal: $
                      {(
                        Number(item.price) *
                        item.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="col-md-3 text-center">
                  <div className="d-flex justify-content-center align-items-center mb-3">

                    <button
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        dispatch(
                          decreaseQuantity(item.id)
                        )
                      }
                    >
                      -
                    </button>

                    <div className="px-4 py-2 border-top border-bottom fw-bold">
                      {item.quantity}
                    </div>

                    <button
                      className="btn btn-outline-primary"
                      onClick={() =>
                        dispatch(addToCart(item))
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      dispatch(
                        removeFromCart(item.id)
                      )
                    }
                  >
                    Remove
                  </button>
                </div>

              </div>
            </div>
          ))}

          {/* Cart Summary */}
          <div className="mt-4">
            <div className="card-body">
              <h4>
                Total: $
                {getTotal().toFixed(2)}
              </h4>
              <div className="d-flex gap-2 mt-3">
              <button
                className="btn btn-success border-round mt-3"
                onClick={() =>
                  navigate("/checkout")
                }
              >
                Proceed to Checkout
              </button>
              <button
                  className="btn btn-primary border-round mt-3"
                  onClick={() => navigate("/products")}
                >
                  Go Shopping
                </button>
              </div>
                          </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;