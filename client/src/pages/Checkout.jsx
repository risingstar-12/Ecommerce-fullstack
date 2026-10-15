import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";
import { createOrder } from "../api/productApi"

function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  console.log("Redux token exists:", Boolean(token));

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const total = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  
const handlePlaceOrder = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.address || !formData.phone) {
    alert("Please fill all fields");
    return;
  }

  if (!token) {
    alert("Please log in before placing your order.");
    navigate("/login");
    return;
  }

  try {
    const order = await createOrder(
  cartItems.map((item) => ({
    product: Number(item.id),
    quantity: Number(item.quantity),
  })),
  token
);

    console.log("ORDER SAVED:", order);

    alert("Order placed successfully 🎉");

    dispatch(clearCart());
    navigate("/");
  } catch (err) {
    console.error("ORDER STATUS:", err.response?.status);
    console.error("ORDER ERROR DETAILS:", err.response?.data);
    alert(JSON.stringify(err.response?.data, null, 2));

    alert(
      "Could not save your order. Please check the error in the console."
    );
  }
};

  // const handlePlaceOrder = (e) => {
  //   e.preventDefault();

  //   if (
  //     !formData.name ||
  //     !formData.address ||
  //     !formData.phone
  //   ) {
  //     alert("Please fill all fields");
  //     return;
  //   }

  //   alert("Order placed successfully 🎉");

  //   console.log("ORDER DETAILS:", {
  //     customer: formData,
  //     items: cartItems,
  //     total,
  //   });

  //   dispatch(clearCart());
  //   navigate("/");
  // };

  if (cartItems.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3>Your cart is empty 🛒</h3>

        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/products")}
        >
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Checkout</h2>

      <div className="row">

        {/* LEFT: FORM + CART ITEMS */}
        <div className="col-md-8">

          {/* SHIPPING FORM */}
          <form
            onSubmit={handlePlaceOrder}
            className="card p-3 mb-4 shadow-sm"
          >
            <h4 className="mb-3">Shipping Details</h4>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="form-control mb-3"
              value={formData.name}
              onChange={handleChange}
            />

            <textarea
              name="address"
              placeholder="Address"
              className="form-control mb-3"
              value={formData.address}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="form-control mb-3"
              value={formData.phone}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="btn btn-success "
            >
              Place Order
            </button>
          </form>

          {/* CART ITEMS */}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="card mb-3 shadow-sm"
            >
              <div className="row g-0 align-items-center">

                <div className="col-md-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-fluid"
                    style={{
                      height: "150px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="col-md-9">
                  <div className="card-body">
                    <h5>{item.name}</h5>

                    <p>
                      <strong>Price:</strong> $
                      {item.price}
                    </p>

                    <p>
                      <strong>Quantity:</strong>{" "}
                      {item.quantity}
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

              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: SUMMARY */}
        <div className="col-md-4">
          <div className="card shadow-sm p-3">

            <h4>Order Summary</h4>
            <hr />

            <p>
              Items:{" "}
              {cartItems.reduce(
                (total, item) =>
                  total + item.quantity,
                0
              )}
            </p>

            <h5>Total: ${total.toFixed(2)}</h5>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Checkout;