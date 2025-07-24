import React, { useContext, useState } from "react";
import "./ModalButton.css";
import { ModalButtunContext } from "../../context/ModalButtonContext";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ModalContext } from "../../context/ModalContext";
import { ModalPhoneContext } from "../../context/ModalPhoneContext";

function ModalButton({ onClose, openModalButton, modal }) {
  const { modalButton } = useContext(ModalButtunContext);
  const { openModal } = useContext(ModalContext);
  const { openModalPhone } = useContext(ModalPhoneContext);

  const [isOpenModal, setIsOpenModal] = useState({
    isOpen: modalButton.isOpen,
    isAnimation: false,
  });
  return (
    <div className="modal-button-container">
      <div className="modal-button-container-relative">
        <button
          className="modal-button-container-button"
          onClick={() => {
            openModalButton;
            setIsOpenModal({
              isOpen: isOpenModal.isOpen,
              isAnimation: !isOpenModal.isAnimation,
            });
            setTimeout(() => {
              setIsOpenModal({
                isOpen: !isOpenModal.isOpen,
                isAnimation: false,
              });
            }, 150);
          }}
        >
          <FaPhone />
        </button>

        {isOpenModal.isOpen && (
          <div
            className={`modal-button-container-div ${
              isOpenModal.isAnimation ? " modal-button-animation" : ""
            }`}
          >
            <div className="modal-button-container-div-inner">
              <div>Письмо</div>
              <button
                className="modal-button-container-div-btn"
                onClick={openModal}
              >
                <MdEmail />
              </button>
            </div>

            <div className="modal-button-container-div-inner">
              <div>Перезвоните мне</div>
              <button
                id="modal-button-container-phone"
                className="modal-button-container-div-btn"
                onClick={openModalPhone}
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
