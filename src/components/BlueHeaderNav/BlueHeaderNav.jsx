import React from "react";
import { Link } from "react-router-dom";
import "./BlueHeaderNav.css";

function BlueHeaderNav() {
  return (
    <div className="blue-header-nav">
      <ul>
        <Link to="/">ПРАЙСЫ</Link>
        <Link to="/uslugi">УСЛУГИ</Link>
        <Link to="/">ДОСТАВКА И ОПЛАТА</Link>
        <Link to="/">КОНТАКТЫ</Link>
        <Link to="/">ЗАКАЗАТЬ</Link>
      </ul>
    </div>
  );
}

export default BlueHeaderNav;
