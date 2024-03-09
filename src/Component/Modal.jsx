import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const Modal = ({
  setUplo,
  isOpen,
  onClose,
  fixedAmount,
  handleCloseAccount,
  totalAmount,
}) => {
  if (!isOpen) return null;
  const allAmount = totalAmount + fixedAmount;
  return ReactDOM.createPortal(
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onClose();
        handleCloseAccount();
      }}
      className="modal-overlay"
    >
      <div className="modal-content">
        <div className="modal-header">Закрыт счет</div>
        <div className="modal-body">
          <p>
            Зафиксированная сумма на стол:
            <strong> {fixedAmount.toFixed(2)}</strong> сум
          </p>
          <p>
            Зафиксированная сумма на напитки:
            <strong>{totalAmount.toFixed(2)}</strong> сум
          </p>
          <p>
            Зафиксированная сумма общая сумма:
            <strong>{allAmount.toFixed(2)}</strong> сум
          </p>
        </div>
        <div className="modal-footer">
          <button
            className="modal-button"
            onClick={() => {
              setUplo((prev) => prev + 1);
            }}
          >
            Закрыть
          </button>
        </div>
      </div>
    </form>,
    document.body
  );
};

export default Modal;
