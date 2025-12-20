import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import React from "react";

import { loginUser } from "../features/auth/authSlice";

const Login = () => {
  // Local state for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redux hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get auth state from Redux
  const { token, isLoading, error } = useSelector((state) => state.auth);

  // Redirect after successful login
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch login action
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        Enter your mail
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        Enter your password
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <p className="text-sm text-center mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
