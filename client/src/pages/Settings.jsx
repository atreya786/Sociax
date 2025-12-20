import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../features/auth/authSlice";

const Settings = () => {
  // Local state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();

  const { isLoading, error } = useSelector((state) => state.auth);

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      changePassword({
        currentPassword,
        newPassword,
      })
    );

    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <div className="max-w-xl mx-auto mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Change Password</h2>

      <form onSubmit={handleSubmit}>
        // Current password
        <input
          type="password"
          placeholder="Current password"
          className="w-full p-2 border rounded mb-3"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        // New password
        <input
          type="password"
          placeholder="New password"
          className="w-full p-2 border rounded mb-3"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        // Error message
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        // Submit button
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isLoading ? "Updating..." : "Update password"}
        </button>
      </form>
    </div>
  );
};

export default Settings;
