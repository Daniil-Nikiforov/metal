import React from "react";
import HeaderHome from "./components/HeaderHome/HeaderHome";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
