import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
              
      "https://ecommerce-fullstack-api-gwnu.onrender.com/auth/register/"
      ,
        {
          username,
          password,
        }
      );

      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error(
        "REGISTER ERROR:",
        err.response?.data || err.message
      );

      alert(
        JSON.stringify(
          err.response?.data || "Registration failed"
        )
      );
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="p-4 border rounded shadow-sm bg-light"
      style={{ maxWidth: "400px", margin: "auto" }}
    >
      <h3 className="text-center mb-4">Register</h3>

      <div className="mb-3">
        <label className="form-label">Username</label>

        <input
          type="text"
          className="form-control"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
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
          autoComplete="new-password"
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-success w-100"
      >
        Register
      </button>
    </form>
  );
}