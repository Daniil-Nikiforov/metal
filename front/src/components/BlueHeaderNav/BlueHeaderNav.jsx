import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./BlueHeaderNav.css";
import ModalForm from "../ModalForm/ModalForm";
import { ModalContext } from "../../context/ModalContext";
import { FaShoppingCart } from "react-icons/fa";

function BlueHeaderNav() {
  const { openModal } = useContext(ModalContext);
  return (
    <div className="blue-header-nav">
      <ul>
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
