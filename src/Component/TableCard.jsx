import React, { useState, useEffect } from "react";

const TableCard = ({ tableNumber, setUplo }) => {
  return (
    <div className="card">
      <h1>{tableNumber} Стол</h1>
      {isOpen ? (
        <>
          <button onClick={cl}>Закрыть счет</button>
          <h3>
            Время: <span>{formatTime(time)}</span>
          </h3>
          <h4>Сумма: {amount.toFixed(2)}</h4>
        </>
      ) : (
        <button onClick={handleOpenAccount}>Открыть счет</button>
      )}
      <Modal
        setUplo={setUplo}
        handleCloseAccount={handleCloseAccount}
        isOpen={isClosed}
        onClose={() => setIsClosed(false)}
        fixedAmount={fixedAmount}
      />
    </div>
  );
};
export default TableCard;
