import { createContext, useState } from "react";
import ModalForm from "../components/ModalForm/ModalForm";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    isOpen: false,
  });

  const openModal = () => {
    setModal({ isOpen: true });
  };

  const closeModal = () => {
    setModal({ isOpen: false });
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modal.isOpen && <ModalForm onClose={closeModal}></ModalForm>}
    </ModalContext.Provider>
  );
};
