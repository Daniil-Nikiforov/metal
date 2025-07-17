import React, { useContext } from "react";
import logoImg from "../../assets/logoWhite.png";
import "./MainHeader.css";
import { Link } from "react-router";
import { ModalContext } from "../../context/ModalContext";

function MainHeader(props) {
  const { openModal } = useContext(ModalContext);

  return (
    <div className="main-header">
      <div className="main-header-section">
        <div className="main-header-section-first">
          <div className="img-div">
            <Link to="/">
              <img src={logoImg} alt="logo" />
            </Link>
          </div>

          <div className="main-header-gray-nav">
            <ul>
              <Link
                to="/"
                className={`${
                  props.tab == "price"
                    ? "main-header-current-tab"
                    : "main-header-a"
                }`}
              >
                ПРАЙСЫ
              </Link>
              <Link
                to="/uslugi"
                className={`${
                  props.tab == "uslugi"
                    ? "main-header-current-tab"
                    : "main-header-a"
                }`}
              >
                УСЛУГИ
              </Link>
              <Link
                to="/dostavka"
                className={`${
                  props.tab == "dostavka"
                    ? "main-header-current-tab"
                    : "main-header-a"
                }`}
              >
                ДОСТАВКА И ОПЛАТА
              </Link>
              <Link
                to="/kontakti"
                className={`${
                  props.tab == "kontakti"
                    ? "main-header-current-tab"
                    : "main-header-a"
                }`}
              >
                КОНТАКТЫ
              </Link>
              <Link
                to="#"
                className={`${
                  props.tab == "zakaz"
                    ? "main-header-current-tab"
                    : "main-header-a"
                }`}
                onClick={() => openModal()}
              >
                ЗАКАЗАТЬ
              </Link>
            </ul>
          </div>
        </div>
      </div>
      <div className="main-header-section-second">
        <ul>
          <Link
            to="/"
            className={`${
              props.tab == "cvet"
                ? "main-header-current-tab-metal"
                : "main-header-a-metal"
            }`}
          >
            Цветной
          </Link>
          <Link
            to="/"
            className={`${
              props.tab == "chern"
                ? "main-header-current-tab-metal"
                : "main-header-a-metal"
            }`}
          >
            Черный
          </Link>
          <Link
            to="/"
            className={`${
              props.tab == "nershav"
                ? "main-header-current-tab-metal"
                : "main-header-a-metal"
            }`}
          >
            Нержавеющая сталь
          </Link>
          <Link
            to="/"
            className={`${
              props.tab == "set"
                ? "main-header-current-tab-metal"
                : "main-header-a-metal"
            }`}
          >
            Сетка
          </Link>
          <Link
            to="/"
            className={`${
              props.tab == "list"
                ? "main-header-current-tab-metal"
                : "main-header-a-metal"
            }`}
          >
            Перфорированный лист
          </Link>
          <Link
            to="/"
            className={`${
              props.tab == "shtok"
                ? "main-header-current-tab-metal"
                : "main-header-a-metal"
            }`}
          >
            Трубы и штоки
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default MainHeader;
