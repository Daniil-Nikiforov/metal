import React, { useContext, useState } from "react";
import "./ModalButton.css";
import { ModalButtunContext } from "../../context/ModalButtonContext";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function ModalButton({ onClose, openModalButton, modal }) {
  const { modalButton } = useContext(ModalButtunContext);
  const [isOpenModal, setIsOpenModal] = useState(modalButton.isOpen);
  return (
    <div className="modal-button-container">
      <div className="modal-button-container-relative">
        <button
          className="modal-button-container-button"
          onClick={() => {
            openModalButton;
            setIsOpenModal(!isOpenModal);
          }}
        >
          <FaPhone />
        </button>

        {isOpenModal && (
          <div className="modal-button-container-div">
            <div className="modal-button-container-div-inner">
              <div>Письмо</div>
              <button className="modal-button-container-div-btn">
                <MdEmail />
              </button>
            </div>

            <div className="modal-button-container-div-inner">
              <div>Перезвоните мне</div>
              <button
                id="modal-button-container-phone"
                className="modal-button-container-div-btn"
              >
                <FaPhone />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalButton;
