
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";

function ProductList() {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const { items, loading, error } = useSelector(
    (state) => state.products
  );

  const [brand, setBrand] = useState(
    searchParams.get("brand") || ""
  );
  
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    dispatch(
      fetchProducts({
        brand,
        category,
        color,
        minPrice,
        maxPrice,
      })
    );
  }, [dispatch, brand, category, color, minPrice, maxPrice]);

  const handleClearFilters = () => {
    setBrand("");
    setCategory("");
    setColor("");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4">
        ALL PRODUCTS
      </h2>

      <div className="row">

        {/* FILTERS */}
        <div className="col-md-3 mb-4">

          <div className="border rounded p-4">

            <h5 className="mb-4">
              FILTERS
            </h5>

            {/* CATEGORY */}
            <div className="mb-4">
              <h6>Category</h6>

              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Shirts">Shirts</option>
                <option value="T-Shirts">T-Shirts</option>
                <option value="Shoes">Shoes</option>
                {/* <option value="Clothing">Clothing</option> */}
                <option value="Bags">Bags</option>
                <option value="Watches">Watches</option>
                <option value="Sunglasses">Sunglasses</option>
                <option value="Dresses">Dresses</option>
                <option value="Jewellery">Jewellery</option>
              </select>
            </div>

            {/* COLOR */}
            <div className="mb-4">
              <h6>Color</h6>

              <select
                className="form-select"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                <option value="">All Colors</option>
                <option value="Black">Black</option>
                <option value="Pink">Pink</option>
                <option value="Blue">Blue</option>
                <option value="Brown">Brown</option>
              </select>
            </div>

            {/* PRICE */}
            <div className="mb-4">
              <h6>Price Range</h6>

              <input
                type="number"
                className="form-control mb-2"
                placeholder="Minimum price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />

              <input
                type="number"
                className="form-control"
                placeholder="Maximum price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            {/* CLEAR FILTERS */}
            <button
              type="button"
              className="btn btn-dark w-100"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>

          </div>

        </div>

        {/* PRODUCTS */}
        <div className="col-md-9">

          {loading && <p>Loading...</p>}

          {error && (
            <p className="text-danger">
              {error}
            </p>
          )}

          {!loading && items.length === 0 && (
            <p>No products found.</p>
          )}

          <div className="row g-4">

            {items.map((product) => (
              <div
                className="col-md-6 col-lg-4"
                key={product.id}
              >
                <ProductCard product={product} />
              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductList;

