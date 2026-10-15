import { createSlice } from "@reduxjs/toolkit";

/* ---------------- SAFE LOAD ---------------- */
const loadCart = () => {
  try {
    const data = localStorage.getItem("cart");
    const parsed = JSON.parse(data);

    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
};

/* ---------------- SAVE ---------------- */
const saveCart = (state) => {
  localStorage.setItem("cart", JSON.stringify(state.items));
};

const initialState = {
  items: loadCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existing = state.items.find(
        (i) => String(i.id) === String(item.id)
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          ...item,
          id: String(item.id),
          quantity: 1,
        });
      }

      saveCart(state);
    },

    decreaseQuantity: (state, action) => {
      const id = String(action.payload);

      const item = state.items.find(
        (i) => String(i.id) === id
      );

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (i) => String(i.id) !== id
          );
        }
      }

      saveCart(state);
    },

    removeFromCart: (state, action) => {
      const id = String(action.payload);

      state.items = state.items.filter(
        (item) => String(item.id) !== id
      );

      saveCart(state);
    },

    clearCart: (state) => {
      state.items = [];
      saveCart(state);
    },
  },
});

export const {
  addToCart,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;