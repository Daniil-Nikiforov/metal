import React, { useState } from "react";
import "./DeliveryFrom.css";
import axios from "axios";

function DeliveryFrom(props) {
  console.log(props.basket);
  const [fio, setFio] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [delivery, setDelivery] = useState("");
  const [comment, setComment] = useState("");

  const [cart, setCart] = useState([]);

  const handleSubmit = async (e) => {
    try {
      const cartId = localStorage.getItem("cartId");
      await axios.post("http://localhost:3000/api/send-cart", {
        cart: props.basket,
        fio: fio,
        email: email,
        phone: phone,
        delivery: delivery,
        comment: comment,
        cart_id: cartId,
      });
      setCart(cart.filter((p) => p.cart_id !== cartId));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="delivery-form" action="/">
      <p className="delivery-form-p">Заполните форму для заказа</p>
      <div>
        <input
          type="text"
          required
          placeholder="ФИО"
          className="delivery-form-fio"
          value={fio}
          onChange={(e) => setFio(e.target.value)}
        ></input>
        <input
          type="email"
          required
          placeholder="Почта"
          className="delivery-form-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="tel"
          required
          placeholder="Телефон"
          maxlength="12"
          className="delivery-form-phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        ></input>
        <textarea
          type="text"
          required
          placeholder="Адрес доставки"
          className="delivery-form-delivery"
          value={delivery}
          onChange={(e) => setDelivery(e.target.value)}
        ></textarea>
        <textarea
          type="text"
          placeholder="Комментарий"
          className="delivery-form-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button className="delivery-form-button" onClick={handleSubmit}>
          Оформить заказ
        </button>
      </div>
    </form>
  );
}

export default DeliveryFrom;
