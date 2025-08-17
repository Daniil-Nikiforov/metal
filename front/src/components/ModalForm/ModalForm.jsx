import React, { useContext, useState } from "react";
import "./ModalForm.css";
import { MdEmail } from "react-icons/md";
import { IoIosArrowRoundDown } from "react-icons/io";
import { ModalContext } from "../../context/ModalContext";
import { Link } from "react-router";
import axios from "axios";
import ModalNotification from "../ModalNotification/ModalNotification";

function ModalForm({ onClose }) {
  const { modal } = useContext(ModalContext);
  const [isSending, setIsSending] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 700);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (email.length > 1 && message.length > 1) {
        setIsSending(true);
        showNotification("Сообщение отправлено", "success");
        await axios.post("http://185.23.35.28:3000/api/send-textarea", {
          textArea: message,
          customerEmail: email,
        });
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };
  return (
    <div
      className={`modal-overlay ${modal.closeAnimation ? "modal-close" : ""}`}
      onClick={onClose}
    >
      <form
        className="modal-form"
        onClick={(e) => {
          e.stopPropagation();
          handleSubmit(e);
        }}
      >
        {notification && (
          <ModalNotification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
        <h2 className="modal-form-h2">Мы ответим на все ваши вопросы!</h2>

        <div className="modal-form-inputs">
          <textarea
            name=""
            id=""
            className="modal-form-textarea"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <div className="modal-form-input-div">
            <MdEmail />
            <input
              type="email"
              className="modal-form-input"
              placeholder="Ваш email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="modal-form-text">
          <input
            type="checkbox"
            name=""
            id=""
            className="modal-form-checkbox"
            required
            defaultChecked
          />{" "}
          Я принимаю условия{" "}
          <Link to="/rules">Пользовательского соглашения</Link> и даю своё
          согласие на обработку моих персональных данных, в соответствии с
          Федеральным законом от 27.07.2006 года №152-ФЗ «О персональных
          данных», на условиях и для целей, определенных{" "}
          <Link to="/rules">Политикой конфиденциальности.</Link>
          <p className="modal-form-text-p">
            Пожалуйста, заполните поля и нажмите на кнопку{" "}
            <IoIosArrowRoundDown />
          </p>
        </div>

        <div className="modal-form-btns">
          <button className="modal-form-btn-cancel" onClick={onClose}>
            ОТМЕНА
          </button>
          <button className="modal-form-btn-submit" disabled={isSending}>
            ОТПРАВИТЬ
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalForm;
