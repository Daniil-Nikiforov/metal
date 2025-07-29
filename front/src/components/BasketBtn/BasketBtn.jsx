import React from "react";
import "./BasketBtn.css";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

function BasketBtn() {
  return (
    <Link to="/basket" className="basket-btn-div">
      <FaShoppingCart />
    </Link>
  );
}

export default BasketBtn;
