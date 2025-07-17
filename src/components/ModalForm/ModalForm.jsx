import React from "react";
import "./ModalForm.css";

function ModalForm({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <form className="modal-form" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-form-h2">Мы ответим на все ваши вопросы!</h2>

        {/* <div className="modal-form-inputs">
          <textarea
            name=""
            id=""
            className="modal-form-textarea"
            required
          ></textarea>
          <input
            type="email"
            className="modal-form-textarea"
            placeholder="Ваш email"
            required
          />
        </div>

        <div className="modal-form-text"></div> */}
      </form>
    </div>
  );
}

export default ModalForm;
