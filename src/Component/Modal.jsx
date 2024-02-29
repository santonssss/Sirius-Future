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
  handleCloseAccountNapitki,
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
          <p>Зафиксированная сумма на стол: {fixedAmount.toFixed(2)} сум</p>
          <p>Зафиксированная сумма на напитки: {totalAmount.toFixed(2)} сум</p>
          <p>Зафиксированная сумма общая сумма: {allAmount.toFixed(2)} сум</p>
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
