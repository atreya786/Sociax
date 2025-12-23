import { Routes, Route } from "react-router-dom";
import React from "react";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Feed from "../pages/Feed";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Feed />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
