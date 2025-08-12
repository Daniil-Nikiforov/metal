import React from "react";
import "./Uslugi.css";
import YandexMap from "../../components/YandexMap/YandexMap";
import MainHeader from "../../components/MainHeader/MainHeader";
import MainContentSection from "../../components/MainContentSection/MainContentSection";
import HeaderHome from "../../components/HeaderHome/HeaderHome";
import BlueHeaderNav from "../../components/BlueHeaderNav/BlueHeaderNav";
import GreyHeaderNav from "../../components/GreyHeaderNav/GreyHeaderNav";

function Uslugi() {
  return (
    <div className="uslugi-page">
      {/* <MainHeader tab="uslugi" /> */}
      <HeaderHome />
      <BlueHeaderNav />
      <GreyHeaderNav />
      <MainContentSection header="Услуги">
        <ul className="uslugi-page-ul">
          <li>Покраска</li>
          <li>
            Резка листового металлопроката
            <ul className="uslugi-page-ul">
              <li>Резка на портальном станке с ЧПУ</li>
              <li>Плазменная резка</li>
              <li>Лазерная резка</li>
              <li>Рубка листового проката</li>
              <li>Разделительная резка газом</li>
            </ul>
          </li>
          <li>
            Резка сортового металлопроката
            <ul className="uslugi-page-ul">
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
