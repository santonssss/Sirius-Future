import React, { useState, useEffect } from "react";
import Modal from "./Modal";
const TableCard = ({ tableNumber }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState(0);
  const [amount, setAmount] = useState(0);
  const [isClosed, setIsClosed] = useState(false);
  const [fixedAmount, setFixedAmount] = useState(0);

  const handleOpenAccount = () => {
    setIsOpen(true);
    setTime(0);
    setAmount(0);
    setIsClosed(false);
    setFixedAmount(0);
  };

  const handleCloseAccount = () => {
    setIsOpen(false);
    setIsClosed(true);
    setFixedAmount(amount);
  };

  useEffect(() => {
    let interval;

    if (isOpen) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);

        // Обновляем сумму каждую минуту
        if (time % 60 === 0) {
          setAmount((prevAmount) => prevAmount + 35000 / 60);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isOpen, time]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsRemaining = seconds % 60;

    return `${hours} ч : ${String(minutes).padStart(2, "0")} м : ${String(
      secondsRemaining
    ).padStart(2, "0")} с`;
  };
  return (
    <div className="card">
      <h1>{tableNumber} Стол</h1>
      {isOpen ? (
        <>
          <button onClick={handleCloseAccount}>Закрыть счет</button>
          <h3>
            Время: <span>{formatTime(time)}</span>
          </h3>
          <h4>Сумма: {amount.toFixed(2)}</h4>
        </>
      ) : (
        <button onClick={handleOpenAccount}>Открыть счет</button>
      )}
      <Modal
        isOpen={isClosed}
        onClose={() => setIsClosed(false)}
        fixedAmount={fixedAmount}
      />
    </div>
  );
};
export default TableCard;
