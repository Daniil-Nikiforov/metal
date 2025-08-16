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
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (phoneData.length > 1) {
        setIsSending(true);
        await axios.post("http://185.23.35.28:3000/api/send-phone", {
          phone: phoneData,
        });
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form
      className={`modal-overlayP ${
        modalPhone.closeAnimation ? "modal-closeP" : ""
      }`}
      onSubmit={handleSubmit}
    >
      <div className="modal-formP">
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
          <button className="modal-form-btn-submitP" disabled={isSending}>
            ПЕРЕЗВОНИТЕ МНЕ
          </button>
        </div>
      </div>
    </form>
  );
}

export default ModalPhone;
