import React from "react";
import "./ModalCs.css";
import { useState } from "react";
const ModalToDr = ({
  openModalDr,
  setOpenModalDr,
  addNapitk,
  handleQuantityChange,
  drinks,
  handleCancel,
}) => {
  if (!openModalDr) {
    return null;
  }
  return (
    <div className="modal2-overlay">
      <div className="modal2-content">
        <div className="modal2-header">Добавьте напитки</div>
        <div className="napitki">
          {drinks.map((drink) => (
            <div key={drink.id} className="drink-item">
              <span>{drink.name}</span>
              <input
                type="number"
                value={drink.quantity}
                onChange={(e) =>
                  handleQuantityChange(drink.id, parseInt(e.target.value, 10))
                }
              />
              <span>{drink.price * drink.quantity} сум</span>
              <button onClick={() => addNapitk(drink)}>Выбрать</button>
              <button onClick={() => handleCancel(drink.id)}>Отмена</button>
            </div>
          ))}
        </div>
        <div className="modal2-footer">
          <button
            className="modal2-button"
            onClick={() => {
              setOpenModalDr(!openModalDr);
            }}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalToDr;
