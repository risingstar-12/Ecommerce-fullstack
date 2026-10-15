import { createSlice } from "@reduxjs/toolkit";

/* LOAD FROM LOCALSTORAGE */
const loadUser = () => {
  try {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    return {
      user: user ? JSON.parse(user) : null,
      token: token || null,
    };
  } catch (e) {
    return {
      user: null,
      token: null,
    };
  }
};

const initialState = loadUser();

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;

      // SAVE TO LOCALSTORAGE
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },

    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;