import { createContext, useState } from "react";
import ModalForm from "../components/ModalForm/ModalForm";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    isOpen: false,
    closeAnimation: false,
  });

  const openModal = () => {
    setModal({ isOpen: true });
  };

  const closeModal = () => {
    setModal({ closeAnimation: true, isOpen: true });
    setTimeout(() => {
      setModal({ isOpen: false });
    }, 300);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, modal }}>
      {children}
      {modal.isOpen && <ModalForm onClose={closeModal}></ModalForm>}
    </ModalContext.Provider>
  );
};
