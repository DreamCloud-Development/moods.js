import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";
import SearchManager from "./pages/SearchManager";
import UserProfile from "./pages/UserProfile";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/search" element={<SearchManager />} />
        <Route path="/user/:handle" element={<UserProfile />} />
        <Route path="/user/:handle/tracks" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
