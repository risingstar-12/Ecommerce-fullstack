import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "https://ecommerce-fullstack-api-gwnu.onrender.com";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (filters = {}) => {
    const params = new URLSearchParams();
    

    if (filters.brand) {
      params.append("brand", filters.brand);
    }

    if (filters.category) {
      params.append("category", filters.category);
    }

    if (filters.color) {
      params.append("color", filters.color);
    }

    if (filters.minPrice) {
      params.append("min_price", filters.minPrice);
    }

    if (filters.maxPrice) {
      params.append("max_price", filters.maxPrice);
    }

    const queryString = params.toString();

    const url = queryString
      ? `${BASE_URL}/products/?${queryString}`
      : `${BASE_URL}/products/`;

    const res = await axios.get(url);

    return res.data;
  }
);

const productSlice = createSlice({
  name: "products",

  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;