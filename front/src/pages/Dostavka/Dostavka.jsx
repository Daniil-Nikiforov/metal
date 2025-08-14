import React, { useContext } from "react";
import "./Dostavka.css";
import MainHeader from "../../components/MainHeader/MainHeader";
import YandexMap from "../../components/YandexMap/YandexMap";
import MainContentSection from "../../components/MainContentSection/MainContentSection";
import { Link } from "react-router";
import { ModalContext } from "../../context/ModalContext";
import HeaderHome from "../../components/HeaderHome/HeaderHome";
import BlueHeaderNav from "../../components/BlueHeaderNav/BlueHeaderNav";
import GreyHeaderNav from "../../components/GreyHeaderNav/GreyHeaderNav";

function Dostavka() {
  const { openModal } = useContext(ModalContext);

  return (
    <div className="dostavka-page">
      <HeaderHome />
      <BlueHeaderNav />
      <GreyHeaderNav />
      <MainContentSection header="Доставка и оплата">
        <div className="dostavka-page-content">
          <p>
            <strong>Как оформить заказ</strong>
          </p>

          <p>Существует несколько вариантов оформления заказа:</p>

          <p>
            1) По телефону: достаточно одного звонка в компанию ООО «Доминион»»
            по номеру 8 (812) 988-65-38 Менеджер примет заявку и обсудит детали
            заказа.
          </p>

          <p>
            2) Заполнить&nbsp;
            <Link onClick={openModal}>онлайн-форму</Link>
            &nbsp;в свободной форме. Менеджер обработает заявку, рассчитает
            стоимость и ответит Вам.
          </p>

          <p>
            Мы быстро произведем все необходимые расчеты, выставим счет и
            оформим доставку.
          </p>

          <p>
            <strong>Способы оплаты</strong>
          </p>

          <p>
            Принимается как наличная оплата, так и безналичная. Заключаем
            контракты на поставку металлопроката с юридическими и физическими
            лицами. Выбор варианта оплаты подлежит согласованию в процессе
            обработки заказа.
          </p>

          <p>
            <ul className="dostavka-page-ul">
              <li>
                Оплата наличными производится в офисе компании ООО «Доминион»» (
                <Link to="/kontakti">см. схему проезда</Link>) по адресу:
                Санкт-Петербург, улица Бухарестская, дом 24, корпус 2 литера А,
                офис 8.
              </li>
              <li>
                Безналичные платежи принимаются путем осуществления перевода на
                наши реквизиты, выставляется счет.
              </li>
            </ul>
          </p>

          <p>
            <strong>Как получить заказ</strong>
          </p>

          <p>
            Для наших клиентов предусмотрены следующие способы получения
            металлопроката:
          </p>

          <p>
            <ol className="dostavka-page-ul">
              <li>
                Доставка собственным транспортом ООО «Доминион»» по любому
                адресу Петербурга и Ленинградской области.
              </li>
              <li>
                Самостоятельный вывоз товара со складского комплекса в
                Санкт-Петербурге. Для этого необходимо подъехать по адресу:
                улица Бухарестская, дом 24, корпус 2 литера А, офис 8. (
                <Link to="/kontakti">см. схему проезда</Link>).
              </li>
              <li>
                Доставка товара в регионы РФ осуществляется ТК. Стоимость
                доставки рассчитывается индивидуально по каждому заказу. Оплата
                транспортных услуг осуществляется по факту доставки товара на
                терминал ТК в Вашем регионе.
              </li>
            </ol>
          </p>
        </div>
      </MainContentSection>
      <YandexMap />
    </div>
  );
}

export default Dostavka;
