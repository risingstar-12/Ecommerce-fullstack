import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://ecommerce-fullstack-api-gwnu.onrender.com/products/${id}/`
        );

        setProduct(res.data);
      } catch (err) {
        console.log("ERROR:", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="container mt-5">
        <h4>Loading Product...</h4>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="container mt-5">
      <div className="row">

        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-6">

          <h2>{product.name}</h2>

          <h4 className="text-primary">
            ${product.price}
          </h4>

          <p>{product.description}</p>

          <p>
            <strong>Stock:</strong> {product.stock}
          </p>

          <div className="d-flex gap-2 mt-3">
  <button
    onClick={handleAddToCart}
    className="btn btn-success"
  >
    Add to Cart
  </button>

  <button
    className="btn btn-primary"
    onClick={() => navigate("/products")}
  >
    Go Shopping
  </button>
</div>

        </div>

      </div>
    </div>
  );
}

export default ProductDetail;