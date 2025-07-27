import React from "react";
import "./AddToBasket.css";
import { FaShoppingBasket } from "react-icons/fa";

function AddToBasket({ add }) {
  return (
    <div className="add-to-basket-container">
      <input
        type="number"
        className="add-to-basket-input"
        min={0}
        defaultValue={1}
      />
      <div>шт</div>
      <button className="add-to-basket-btn" onClick={add}>
        <FaShoppingBasket />
      </button>
    </div>
  );
}

export default AddToBasket;
