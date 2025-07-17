import React from "react";
import "./Kontakti.css";
import MainHeader from "../../components/MainHeader/MainHeader";
import MainContentSection from "../../components/MainContentSection/MainContentSection";
import YandexMap from "../../components/YandexMap/YandexMap";

function Kontakti() {
  return (
    <div className="kontakti-page">
      <MainHeader tab="kontakti" />
      <MainContentSection header="Контакты">
        <div className="kontakti-page-content">
          <p>
            <strong>Компания ООО «СоюзМеталл»</strong>
          </p>

          <p>
            В нашей компании вы можете купить металлопрокат, оптом и в розницу,
            любых марок стали и типоразмеров! Мы предлагаем доступные цены на
            металлопрокат, быструю доставку, услуги металлообработки. Качество
            реализуемой продукции подтверждено сертификатами.
          </p>

          <p>
            <strong>Контакты:</strong>
          </p>

          <p>Тел/факс +7 (812) 679-77-30</p>

          <p>
            E-mail:{" "}
            <a href="mailto:zakaz@spbmetalloprokat.ru">
              zakaz@spbmetalloprokat.ru
            </a>
          </p>

          <p>
            Адрес: г. Санкт-Петербург, улица Бухарестская, дом 24, корпус 2
            литера А, офис 8.
          </p>
        </div>
      </MainContentSection>
      <YandexMap />
    </div>
  );
}

export default Kontakti;
