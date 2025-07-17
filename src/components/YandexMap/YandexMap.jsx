import React, { useEffect } from "react";
import "./YandexMap.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarkerAlt } from "react-icons/fa";

function YandexMap() {
  const position = [51.505, -0.09];
  useEffect(() => {
    let sad = document.querySelector(".leaflet-control-attribution");
    sad.innerHTML = "";
  }, []);
  return (
    <div className="yandex-container">
      <div className="yandex-header">
        <p className="">Как нас найти</p>
      </div>
      <div className="yandex-container-map-container">
        <MapContainer
          style={{ zIndex: "0" }}
          center={[59.886571, 30.36679]}
          zoom={15}
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[59.886571, 30.36679]}></Marker>
        </MapContainer>
        <a
          target="_blank"
          className="yandex-button"
          href="https://yandex.ru/maps/2/saint-petersburg/?from=mapframe&ll=30.343031%2C59.883352&mode=usermaps&source=mapframe&um=constructor%3A3777874c018ea3fdb9324f4ecd8a97cb239525e159bdcebe66748aa31e697244&utm_source=mapframe&z=13"
        >
          <FaMapMarkerAlt className="yandex-button-svg" />
          Открыть в яндекс картах
        </a>
      </div>

      <div className="yandex-footer">
        <div className="yandex-footer-col1">2020 © ООО "Союзметалл"</div>
        <div className="yandex-footer-col2">
          г. Санкт-Петербург ул Бухарестская, д 24, к 2 лит А, оф 8
          <br />
          Тел:&nbsp;
          <a href="tel:+78126797730" style={{ color: "#fff" }}>
            +7 (812) 679-77-30
          </a>
          &nbsp; E-mail:&nbsp;
          <a href="mailto:zakaz@spbmetalloprokat.ru" style={{ color: "#fff" }}>
            zakaz@spbmetalloprokat.ru
          </a>
        </div>
      </div>
    </div>
  );
}

export default YandexMap;
