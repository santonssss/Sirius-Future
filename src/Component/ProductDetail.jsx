import React, { useState, useEffect } from "react";

import Modal from "./Modal";
import ModalToDr from "./ModalToDr";
export default function ProductDetail({ setUplo, uplo, tableNumber }) {
  const [time, setTime] = useState(0);
  const [amount, setAmount] = useState(0);
  const [isClosed, setIsClosed] = useState(false);
  const [fixedAmount, setFixedAmount] = useState(0);
  const [openModalDr, setOpenModalDr] = useState(false);
  const [totalDrinks, setTotalDrinks] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [drinks, setDrinks] = useState([
    { id: 1, name: "Cola 1.5 л", price: 15000, quantity: 0 },
    { id: 2, name: "Cola 1 л", price: 10000, quantity: 0 },
    { id: 3, name: "Cola 0.5 л", price: 6000, quantity: 0 },
  ]);
  useEffect(() => {
    const savedData = localStorage.getItem(`savedData_${tableNumber}`);
    if (savedData) {
      const { savedTime, savedAmount } = JSON.parse(savedData);
      setTime(savedTime);
      setAmount(savedAmount);
    }
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
      const response = await fetch(
        "https://enchanted-marmalade-brie.glitch.me/updateTotalAmount",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: Number(fixedAmount),
          }),
        }
      );

      if (response.ok) {
        console.log("Данные успешно отправлены на сервер Stol");
      } else {
        console.error("Произошла ошибка при отправке данных на сервер");
      }
    } catch (error) {
      console.error("Произошла ошибка при отправке данных на сервер", error);
    }
    try {
      const response = await fetch(
        "https://enchanted-marmalade-brie.glitch.me/updateTotalAmountNapitki",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: Number(fixedAmount),
            drinks: drinks,
          }),
        }
      );

      if (response.ok) {
        console.log("Данные успешно отправлены на сервер Napitki");
      } else {
        console.error("Произошла ошибка при отправке данных на сервер");
      }
    } catch (error) {
      console.error("Произошла ошибка при отправке данных на сервер", error);
    }
  };
  const handleCloseAccountNapitki = async () => {};
  useEffect(() => {
    let interval;

    if (isOpen) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          saveDataToStorage({ savedTime: prevTime, savedAmount: amount });
          return prevTime;
        });

        setTime((prevTime) => prevTime + 1);

        const newAmount = drinks.reduce(
          (total, drink) => total + drink.price * drink.quantity,
          0
        );
        setTotalAmount(newAmount);

        if (time % 60 === 0) {
          setAmount((prevAmount) => prevAmount + 35000 / 60);
        }
      }, 1000);
      const newTotalDrinks = drinks.reduce(
        (total, drink) => total + drink.quantity,
        0
      );
      setTotalDrinks(newTotalDrinks);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isOpen, time, drinks]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsRemaining = seconds % 60;

    return `${hours} ч : ${String(minutes).padStart(2, "0")} м : ${String(
      secondsRemaining
    ).padStart(2, "0")} с`;
  };
  const addNapitk = (drink) => {
    setDrinks((prevDrinks) =>
      prevDrinks.map((d) =>
        d.id === drink.id ? { ...d, quantity: d.quantity + 1 } : d
      )
    );
  };
  const handleQuantityChange = (id, quantity) => {
    setDrinks((prevDrinks) =>
      prevDrinks.map((drink) =>
        drink.id === id ? { ...drink, quantity } : drink
      )
    );
  };
  const handleCancel = (id) => {
    setDrinks((prevDrinks) =>
      prevDrinks.map((drink) =>
        drink.id === id ? { ...drink, quantity: 0 } : drink
      )
    );
  };
  return (
    <>
      <div className="card">
        <h1>{tableNumber} Стол</h1>
        {isOpen ? (
          <>
            <button
              onClick={() => {
                setOpenModalDr(!openModalDr);
              }}
            >
              Добавить напитки
            </button>
            <button onClick={cl}>Закрыть счет</button>
            <h3>
              Время: <span>{formatTime(time)}</span>
            </h3>
            <h4>Сумма: {amount.toFixed(2)} сум</h4>
            <div>
              <h4>Купленные напитки на сумму: {totalAmount.toFixed(2)} сум </h4>
              <ol>
                {drinks
                  .filter((drink) => drink.quantity > 0) // Фильтрация только купленных напитков
                  .map((drink) => (
                    <li key={drink.id}>
                      {drink.name} - Количество: {drink.quantity}
                    </li>
                  ))}
              </ol>
            </div>
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
          totalAmount={totalAmount}
          handleCloseAccountNapitki={handleCloseAccountNapitki}
        />
        <ModalToDr
          openModalDr={openModalDr}
          setOpenModalDr={setOpenModalDr}
          addNapitk={addNapitk}
          drinks={drinks}
          handleQuantityChange={handleQuantityChange}
          handleCancel={handleCancel}
        />
      </div>
    </>
  );
}
