import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
  console.log("SEND TO CART:", product); 

  dispatch(
  addToCart({
    id: String(product.id),
    name: product.name,
    price: Number(product.price),
    image: product.image,
  })
);
};

  return (
    <div className="card h-100 shadow-sm">

      <img
        src={product.image}
        className="card-img-top"
        alt={product.name}
        style={{ height: "220px", objectFit: "cover" }}
      />

      <div className="card-body">

        <h6 className="card-title text-center">
          {product.name}
        </h6>

        <div className="text-center">⭐⭐⭐⭐⭐</div>

        <p className="text-primary fw-bold text-center">
          ${product.price}
        </p>

        <div className="d-flex justify-content-between">

          <Link
            to={`/product/${product.id}`}
            className="btn btn-outline-primary btn-sm"
          >
            View Details
          </Link>

          <button
            onClick={handleAddToCart}
            className="btn btn-primary btn-sm"
          >
            Add to Cart
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductCard;