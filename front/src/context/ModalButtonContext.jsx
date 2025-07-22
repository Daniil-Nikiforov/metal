import React, { createContext, useState } from "react";
import ModalButton from "../components/ModalButton/ModalButton";

export const ModalButtunContext = createContext();

export const ModalButtonProvider = ({ children }) => {
  const [modalButton, setModalButton] = useState({
    isOpen: false,
    closeAnimation: false,
  });

  const openModalButton = () => {
    setModalButton({ isOpen: !modalButton.isOpen });
    console.log(modalButton);
  };

  const closeModalButton = () => {
    setModalButton({ closeAnimation: true, isOpen: true });
    setTimeout(() => {
      setModalButton({ isOpen: false });
    }, 300);
  };

  return (
    <ModalButtunContext.Provider
      value={{ openModalButton, closeModalButton, modalButton }}
    >
      {children}
      {
        <ModalButton
          onClose={closeModalButton}
          onClick={openModalButton}
          modal={modalButton}
        ></ModalButton>
      }
    </ModalButtunContext.Provider>
  );
};
