import { createContext, useState } from "react";
import ModalPhone from "../components/ModalPhone/ModalPhone";

export const ModalPhoneContext = createContext();

export const ModalPhoneProvider = ({ children }) => {
  const [modalPhone, setModalPhone] = useState({
    isOpen: false,
    closeAnimation: false,
  });

  const openModalPhone = () => {
    setModalPhone({ isOpen: true });
  };

  const closeModalPhone = () => {
    setModalPhone({ closeAnimation: true, isOpen: true });
    setTimeout(() => {
      setModalPhone({ isOpen: false });
    }, 300);
  };

  return (
    <ModalPhoneContext.Provider
      value={{ openModalPhone, closeModalPhone, modalPhone }}
    >
      {children}
      {modalPhone.isOpen && <ModalPhone onClose={closeModalPhone}></ModalPhone>}
    </ModalPhoneContext.Provider>
  );
};
