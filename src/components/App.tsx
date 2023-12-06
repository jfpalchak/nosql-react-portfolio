import React from "react";
import Header from "./Header";
import PortfolioControl from "./PortfolioControl";
import LoginPage from "./LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<PortfolioControl />} />
      </Routes>
    </Router>
  );
};

export default App;
