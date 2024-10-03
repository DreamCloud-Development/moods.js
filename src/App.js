import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";
import UserProfile from "./pages/UserProfile";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/user/:handle" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
