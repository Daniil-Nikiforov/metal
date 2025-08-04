import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./BlueHeaderNav.css";
import ModalForm from "../ModalForm/ModalForm";
import { ModalContext } from "../../context/ModalContext";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

function BlueHeaderNav() {
  const { openModal } = useContext(ModalContext);
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="blue-header-nav">
      <button
        onClick={() => {
          // if (showMenu == false) {
          //   setShowMenu(!showMenu);
          //   setIsOpen(!isOpen);
          // } else {
          //   setIsOpen(!isOpen);
          //   setTimeout(() => {
          //     setShowMenu(!showMenu);
          //   }, 150);
          // }
          setShowMenu(!showMenu);
          setIsOpen(!isOpen);
        }}
      >
        <GiHamburgerMenu />
      </button>

      {showMenu && (
        <ul
          className={`blue-header-nav-ul-mb ${
            isOpen ? "burger-open" : "burger-close"
          }`}
        >
          <Link to="/uslugi">УСЛУГИ</Link>
          <Link to="/dostavka">ДОСТАВКА И ОПЛАТА</Link>
          <Link to="/kontakti">КОНТАКТЫ</Link>
          <Link
            to="#"
            onClick={() => {
              openModal();
            }}
          >
            ЗАКАЗАТЬ
          </Link>
          <Link to="/basket">
            <FaShoppingCart className="link-basket" />
          </Link>
        </ul>
      )}

      <ul className="blue-header-nav-ul-pc">
        <Link to="/uslugi">УСЛУГИ</Link>
        <Link to="/dostavka">ДОСТАВКА И ОПЛАТА</Link>
        <Link to="/kontakti">КОНТАКТЫ</Link>
        <Link
          to="#"
          onClick={() => {
            openModal();
          }}
        >
          ЗАКАЗАТЬ
        </Link>
        <Link to="/basket">
          <FaShoppingCart className="link-basket" />
        </Link>
      </ul>
    </div>
  );
}

export default BlueHeaderNav;
