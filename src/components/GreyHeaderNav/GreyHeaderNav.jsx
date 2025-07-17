import React, { useContext } from "react";
import "./GreyHeaderNav.css";
import { Link } from "react-router-dom";

function GreyHeaderNav() {
  return (
    <div className="grey-header-nav">
      <ul>
        <Link to="/">ЦВЕТНОЙ</Link>
        <Link to="/">ЧЕРНЫЙ</Link>
        <Link to="/">НЕРЖАВЕЮЩАЯ СТАЛЬ</Link>
        <Link to="/">СЕТКА</Link>
        <Link to="/">ПЕРФОРИРОВАННЫЙ ЛИСТ</Link>
        <Link to="/">ТРУБЫ И ШТОКИ</Link>
      </ul>
    </div>
  );
}

export default GreyHeaderNav;
