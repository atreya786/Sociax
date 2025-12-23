import Navbar from "./components/common/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import React from "react";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
