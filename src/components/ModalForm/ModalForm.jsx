import React, { useContext } from "react";
import "./ModalForm.css";
import { MdEmail } from "react-icons/md";
import { IoIosArrowRoundDown } from "react-icons/io";
import { ModalContext } from "../../context/ModalContext";

function ModalForm({ onClose }) {
  const { modal } = useContext(ModalContext);
  return (
    <div
      className={`modal-overlay ${modal.closeAnimation ? "modal-close" : ""}`}
      onClick={onClose}
    >
      <form className="modal-form" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-form-h2">Мы ответим на все ваши вопросы!</h2>

        <div className="modal-form-inputs">
          <textarea
            name=""
            id=""
            className="modal-form-textarea"
            required
          ></textarea>
          <div className="modal-form-input-div">
            <MdEmail />
            <input
              type="email"
              className="modal-form-input"
              placeholder="Ваш email"
              required
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
          Я принимаю условия <a href="/rules">Пользовательского соглашения</a> и
          даю своё согласие на обработку моих персональных данных, в
          соответствии с Федеральным законом от 27.07.2006 года №152-ФЗ «О
          персональных данных», на условиях и для целей, определенных{" "}
          <a href="/rules">Политикой конфиденциальности.</a>
          <p className="modal-form-text-p">
            Пожалуйста, заполните поля и нажмите на кнопку{" "}
            <IoIosArrowRoundDown />
          </p>
        </div>

        <div className="modal-form-btns">
          <button className="modal-form-btn-cancel" onClick={onClose}>
            ОТМЕНА
          </button>
          <button className="modal-form-btn-submit">ОТПРАВИТЬ</button>
        </div>
      </form>
    </div>
  );
}

export default ModalForm;
