import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Homepage from "./pages/Homepage";
import FlavorsPage from "./pages/FlavorsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";

function App() {
  console.log("Current UserID in App:", localStorage.getItem("userId"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/flavors" 
          element={localStorage.getItem("userId") ? <FlavorsPage /> : <Navigate to="/login" />} 
        />
        <Route
          path="/history"
          element={
            localStorage.getItem("userId") ? (
              <OrderHistoryPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
