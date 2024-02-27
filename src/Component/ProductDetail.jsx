import React, { useState, useEffect } from "react";

import Modal from "./Modal";
export default function ProductDetail({ setUplo, uplo, tableNumber }) {
  const [sg, setSg] = useState(0);
  const [day, setDay] = useState(0);
  const [time, setTime] = useState(0);
  const [amount, setAmount] = useState(0);
  const [isClosed, setIsClosed] = useState(false);
  const [fixedAmount, setFixedAmount] = useState(0);
  useEffect(() => {
    const savedData = localStorage.getItem(`savedData_${tableNumber}`);
    if (savedData) {
      const { savedTime, savedAmount } = JSON.parse(savedData);
      setTime(savedTime);
      setAmount(savedAmount);
    }
    const handleFetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/getTotalAmount`);

        const data = await response.json();
        setSg(data.allTime);
        setDay(data.day);
      } catch (error) {
        console.error("Ошибка запроса:", error);
      }
    };
    handleFetchData();
  }, [uplo, tableNumber]);

  const saveDataToStorage = (data) => {
    localStorage.setItem(`savedData_${tableNumber}`, JSON.stringify(data));
  };
  const [isOpen, setIsOpen] = useState(
    localStorage.getItem(`isOpen_${tableNumber}`) === "true" || false
  );
  const handleOpenAccount = () => {
    setIsOpen(true);
    setTime(0);
    setAmount(0);
    setIsClosed(false);
    setFixedAmount(0);
    localStorage.setItem(`isOpen_${tableNumber}`, "true");
  };

  const cl = () => {
    setIsOpen(false);
    setIsClosed(true);
    setFixedAmount(amount);
    saveDataToStorage({ savedTime: time, savedAmount: amount });

    localStorage.setItem(`isOpen_${tableNumber}`, "false");
  };
  const handleCloseAccount = async () => {
    try {
      const response = await fetch("http://localhost:3001/updateTotalAmount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(fixedAmount),
        }),
      });

      if (response.ok) {
        console.log("Данные успешно отправлены на сервер");
      } else {
        console.error("Произошла ошибка при отправке данных на сервер");
      }
    } catch (error) {
      console.error("Произошла ошибка при отправке данных на сервер", error);
    }
  };

  useEffect(() => {
    let interval;

    if (isOpen) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          saveDataToStorage({ savedTime: prevTime, savedAmount: amount });
          return prevTime;
        });
        setTime((prevTime) => prevTime + 1);
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
    <>
      <div className="card">
        <h1>{tableNumber} Стол</h1>
        {isOpen ? (
          <>
            <button onClick={cl}>Закрыть счет</button>
            <h3>
              Время: <span>{formatTime(time)}</span>
            </h3>
            <h4>Сумма: {amount.toFixed(2)} сум</h4>
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
    </>
  );
}
