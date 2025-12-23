import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import React from "react";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    toast.info("Logged out");
  };

  if (!token) return null;

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Sociax
        </Link>

        <div className="flex gap-4 items-center flex-wrap">
          <Link to="/" className="text-sm font-semibold">
            Feed
          </Link>

          <Link to={`/profile/${user?._id}`} className="text-sm font-semibold">
            Profile
          </Link>

          <Link to="/settings" className="text-sm font-semibold">
            Settings
          </Link>

          <button
            onClick={handleLogout}
            className="text-sm text-red-600 font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
