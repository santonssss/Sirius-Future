import React, { useState, useEffect } from "react";
import TableCard from "./TableCard";
export default function ProductDetail({ setUplo, uplo }) {
  const [sg, setSg] = useState(0);
  const [day, setDay] = useState(0);
  useEffect(() => {
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
  }, [uplo]);
  const totalForDay = Object.values(day)
    .reduce((acc, value) => acc + parseFloat(value), 0)
    .toFixed(2);
  return (
    <>
      <h1>За все время {sg} сум</h1>
      <h2>За день {totalForDay} сум </h2>
      <section>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((tableNumber) => (
          <TableCard
            key={tableNumber}
            tableNumber={tableNumber}
            setUplo={setUplo}
          />
        ))}
      </section>
    </>
  );
}
