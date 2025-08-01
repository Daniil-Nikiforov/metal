import React, { useContext } from "react";
import logoImg from "../../assets/logoWhite.png";
import "./MainHeader.css";
import { Link } from "react-router";
import { ModalContext } from "../../context/ModalContext";
import DropDownGreyHeader from "../DropDownGreyHeader/DropDownGreyHeader";
import { allLinks } from "../../jsDB/jsDb.js";
import { FaShoppingCart } from "react-icons/fa";
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
              <Link to="/basket" className="main-header-a">
                <FaShoppingCart className="link-basket-main" />
              </Link>
            </ul>
          </div>
        </div>
      </div>
      <div className="main-header-section-second">
        <ul>
          <DropDownGreyHeader
            className="main-header-a-metal"
            url={allLinks[0].link}
            name={allLinks[0].name}
            links={allLinks[0].links}
          />
          <DropDownGreyHeader
            className="main-header-a-metal"
            url={allLinks[1].link}
            name={allLinks[1].name}
            links={allLinks[1].links}
          />
          <DropDownGreyHeader
            className="main-header-a-metal"
            url={allLinks[2].link}
            name={allLinks[2].name}
            links={allLinks[2].links}
          />
          <DropDownGreyHeader
            className="main-header-a-metal"
            url={allLinks[3].link}
            name={allLinks[3].name}
            links={allLinks[3].links}
          />
          <DropDownGreyHeader
            className="main-header-a-metal"
            url={allLinks[4].link}
            name={allLinks[4].name}
            links={allLinks[4].links}
          />
          <DropDownGreyHeader
            className="main-header-a-metal"
            url={allLinks[5].link}
            name={allLinks[5].name}
            links={allLinks[5].links}
          />
        </ul>
      </div>
    </div>
  );
}

export default MainHeader;
