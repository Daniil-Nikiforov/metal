import React from "react";
import "./Uslugi.css";
import YandexMap from "../../components/YandexMap/YandexMap";
import MainHeader from "../../components/MainHeader/MainHeader";
import MainContentSection from "../../components/MainContentSection/MainContentSection";

function Uslugi() {
  return (
    <div className="uslugi-page">
      <MainHeader tab="uslugi" />
      <MainContentSection header="Услуги">
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
      </MainContentSection>

      <YandexMap />
    </div>
  );
}

export default Uslugi;
