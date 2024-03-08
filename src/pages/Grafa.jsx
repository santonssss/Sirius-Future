import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Grafa = ({
  sg,
  setSelectedDay,
  setSelectedMonth,
  setSelectedYear,
  selectedDay,
  selectedMonth,
  selectedYear,
  selectedDateDrinks,
  selectedDateData,
  monthlyData,
}) => {
  const [monthlyTotal, setMonthlyTotal] = useState(null);
  const [monthlyNapitki, setMonthlyNapitki] = useState(null);
  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear().toString();
    const currentMonth = currentDate.toLocaleString("ru-RU", { month: "long" });
    setSelectedMonth(currentMonth);
    const currentMonthData = monthlyData?.[currentYear]?.[currentMonth];

    if (currentMonthData !== undefined) {
      setMonthlyTotal(currentMonthData);
    } else {
    }
  }, [monthlyData]);
  return (
    <>
      <div className="statistic">
        <Link to={"/"}>Назад</Link>
        <div className="wrapper-s">
          <h1>За все время {sg} сум</h1>
          <h1>
            За {selectedYear} {selectedMonth} {monthlyTotal} месяц
          </h1>
          <div className="inp-s">
            <label>Выберите год:</label>
            <input
              type="text"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            />

            <label>Выберите месяц:</label>
            <input
              type="text"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            />

            <label>Выберите день:</label>
            <input
              type="text"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
            />
          </div>

          <h2>За день {selectedDateData} сум</h2>
          <h3>Продажи напитков за день:</h3>
          <ol>
            {Object.entries(selectedDateDrinks).map(([drinkName, quantity]) => (
              <li key={drinkName}>
                {drinkName}: {quantity} шт.
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default Grafa;
