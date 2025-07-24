import React from "react";
import HeaderHome from "./components/HeaderHome/HeaderHome";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Uslugi from "./pages/Uslugi/Uslugi";
import Dostavka from "./pages/Dostavka/Dostavka";
import Kontakti from "./pages/Kontakti/Kontakti";
import { ModalProvider } from "./context/ModalContext";
import Rules from "./pages/Rules/Rules";
import MetalPage from "./pages/MetalPage/MetalPage";
import MetalList from "./pages/MetalList/MetalList";
import MetalListType from "./pages/MetalListType/MetalListType";
import { ModalButtonProvider } from "./context/ModalButtonContext";
import { ModalPhoneProvider } from "./context/ModalPhoneContext";

function App() {
  return (
    <ModalProvider>
      <ModalPhoneProvider>
        <ModalButtonProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/uslugi" element={<Uslugi />} />
            <Route path="/dostavka" element={<Dostavka />} />
            <Route path="/kontakti" element={<Kontakti />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/metals/:name" element={<MetalPage />} />
            <Route path="/metal-list/:name" element={<MetalList />} />
            <Route path="/:name" element={<MetalListType />} />
          </Routes>
        </ModalButtonProvider>
      </ModalPhoneProvider>
    </ModalProvider>
  );
}

export default App;
