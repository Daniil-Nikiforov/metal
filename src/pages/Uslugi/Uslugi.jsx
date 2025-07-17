import React from "react";
import "./Uslugi.css";
import YandexMap from "../../components/YandexMap/YandexMap";
import MainHeader from "../../components/MainHeader/MainHeader";

function Uslugi() {
  return (
    <div className="uslugi-page">
      <MainHeader tab="uslugi" />
      <YandexMap />
    </div>
  );
}

export default Uslugi;
