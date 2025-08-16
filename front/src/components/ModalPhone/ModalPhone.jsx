import React, { useContext, useState } from "react";
import { ModalPhoneContext } from "../../context/ModalPhoneContext";
import "./ModalPhone.css";
import { MdEmail } from "react-icons/md";
import { IoIosArrowRoundDown } from "react-icons/io";
import { Link } from "react-router";
import { FaPhoneVolume } from "react-icons/fa6";
import axios from "axios";

function ModalPhone({ onClose }) {
  const { modalPhone } = useContext(ModalPhoneContext);
  const [phoneData, setPhoneData] = useState("");

  const handleSubmit = async (e) => {
    try {
      await axios.post("http://185.23.35.28:3000/api/send-phone", {
        phone: phoneData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`modal-overlayP ${
        modalPhone.closeAnimation ? "modal-closeP" : ""
      }`}
      onClick={onClose}
    >
      <form className="modal-formP" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-form-h2P">Мы ответим на все ваши вопросы!</h2>

        <div className="modal-form-inputsP">
          <div className="modal-form-input-divP">
            <FaPhoneVolume />
            <input
              type="tel"
              className="modal-form-inputP"
              placeholder="Ваш телефон"
              required
              value={phoneData}
              onChange={(e) => setPhoneData(e.target.value)}
            />
          </div>
        </div>

        <div className="modal-form-textP">
          <input
            type="checkbox"
            name=""
            id=""
            className="modal-form-checkboxP"
            required
            defaultChecked
          />{" "}
          Я принимаю условия{" "}
          <Link to="/rules">Пользовательского соглашения</Link> и даю своё
          согласие на обработку моих персональных данных, в соответствии с
          Федеральным законом от 27.07.2006 года №152-ФЗ «О персональных
          данных», на условиях и для целей, определенных{" "}
          <Link to="/rules">Политикой конфиденциальности.</Link>
          <p className="modal-form-text-pP">
            Пожалуйста, заполните поля и нажмите на кнопку{" "}
            <IoIosArrowRoundDown />
          </p>
        </div>

        <div className="modal-form-btnsP">
          <button className="modal-form-btn-cancelP" onClick={onClose}>
            ОТМЕНА
          </button>
          <button className="modal-form-btn-submitP" onClick={handleSubmit}>
            ПЕРЕЗВОНИТЕ МНЕ
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalPhone;
