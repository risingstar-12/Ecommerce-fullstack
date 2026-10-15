
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginSuccess } from "../features/auth/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const res = await axios.post(
        "https://ecommerce-fullstack-api-gwnu.onrender.com/auth/login/",
        {
          username,
          password,
        }
      );

      console.log("API RESPONSE:", res.data);

      // Check whether Django returned an access token
      if (!res.data.access) {
        setError(res.data.message || "Invalid username or password.");
        return;
      }

      // Save login information in Redux
      dispatch(
        loginSuccess({
          user: res.data.user,
          token: res.data.access,
        })
      );

      // Save login information in localStorage
      localStorage.setItem("token", res.data.access);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Success");

      navigate("/");
    } catch (err) {
      console.error(
        "LOGIN ERROR:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
        "Login failed. Please check your username and password."
      );
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="p-4 border rounded shadow-sm bg-light"
      style={{ maxWidth: "400px", margin: "auto" }}
    >
      <h3 className="text-center mb-4">Login</h3>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Username</label>

        <input
          type="text"
          className="form-control"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>

        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100"
      >
        Login
      </button>

      <p className="text-center mt-3">
        Don't have an account?{" "}
        <Link to="/register">Register here</Link>
      </p>
    </form>
  );
}

