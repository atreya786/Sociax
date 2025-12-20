import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import React from "react";

import { signupUser } from "../features/auth/authSlice";

const Signup = () => {
  // Local state for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redux hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Auth state from Redux
  const { token, isLoading, error } = useSelector((state) => state.auth);

  // Redirect after successful signup
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      signupUser({
        email,
        password,
      })
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Sign up</h2>
        Enter your mail
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        Create your password
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
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {isLoading ? "Creating account..." : "Sign up"}
        </button>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
