import React from "react";
import HeaderHome from "./components/HeaderHome/HeaderHome";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Uslugi from "./pages/Uslugi/Uslugi";
import Dostavka from "./pages/Dostavka/Dostavka";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/uslugi" element={<Uslugi />} />
      <Route path="/dostavka" element={<Dostavka />} />
    </Routes>
  );
}

export default App;
