import React from "react";
import "./Uslugi.css";
import YandexMap from "../../components/YandexMap/YandexMap";
import MainHeader from "../../components/MainHeader/MainHeader";

function Uslugi() {
  return (
    <div className="uslugi-page">
      <MainHeader tab="uslugi" />
      <section className="uslugi-page-content">
        <div className="uslugi-page-content-white-box">
          <h1>Услуги</h1>
          <ul>
            <li>Покраска</li>
            <li>
              Резка листового металлопроката
              <ul>
                <li>Резка на портальном станке с ЧПУ</li>
                <li>Плазменная резка</li>
                <li>Лазерная резка</li>
                <li>Рубка листового проката</li>
                <li>Разделительная резка газом</li>
              </ul>
            </li>
            <li>
              Резка сортового металлопроката
              <ul>
                <li>Резка на ленточнопильном станке</li>
                <li>Резка абразивным кругом</li>
              </ul>
            </li>
            <li>Гибка листового проката</li>
          </ul>
        </div>
      </section>
      <YandexMap />
    </div>
  );
}

export default Uslugi;
