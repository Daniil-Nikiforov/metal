import React from "react";
import "./DeliveryFrom.css";

function DeliveryFrom() {
  return (
    <form className="delivery-form">
      <p className="delivery-form-p">Заполните форму для заказа</p>
      <div>
        <input
          type="text"
          required
          placeholder="ФИО"
          className="delivery-form-fio"
        ></input>
        <input
          type="email"
          required
          placeholder="Почта"
          className="delivery-form-email"
        ></input>
        <input
          type="tel"
          required
          placeholder="Телефон"
          maxlength="12"
          className="delivery-form-phone"
        ></input>
        <textarea
          type="text"
          required
          placeholder="Адрес доставки"
          className="delivery-form-delivery"
        ></textarea>
        <textarea
          type="text"
          placeholder="Комментарий"
          className="delivery-form-comment"
        ></textarea>
        <button className="delivery-form-button">Оформить заказ</button>
      </div>
    </form>
  );
}

export default DeliveryFrom;
