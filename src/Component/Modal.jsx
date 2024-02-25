import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const Modal = ({ isOpen, onClose, fixedAmount }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">Закрыт счет</div>
        <div className="modal-body">
          <p>Зафиксированная сумма: {fixedAmount.toFixed(2)} сум</p>
        </div>
        <div className="modal-footer">
          <button className="modal-button" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
