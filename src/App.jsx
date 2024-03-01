import { useEffect, useState } from "react";
import "./App.css";
import ProductDetail from "./Component/ProductDetail";

function App() {
  const [uplo, setUplo] = useState(0);
  const [sg, setSg] = useState(0);
  const [dayData, setDayData] = useState({});
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString("ru-RU", { month: "long" })
  );
  const [selectedDay, setSelectedDay] = useState(
    new Date().getDate().toString()
  );

  useEffect(() => {
    const handleFetchData = async () => {
      try {
        const response = await fetch(
          `https://glitch.com/edit/#!/enchanted-marmalade-brie.me/getTotalAmount`
        );
        const data = await response.json();
        setSg(data.allTime);
        setDayData(data);
      } catch (error) {
        console.error("Ошибка запроса:", error);
      }
    };

    handleFetchData();
  }, [uplo]);

  const selectedDateData =
    dayData?.day?.[selectedYear]?.[selectedMonth]?.[selectedDay] || "0";
  const selectedDateDrinks =
    dayData?.dayNapitki?.[selectedYear]?.[selectedMonth]?.[selectedDay] || {};

  return (
    <>
      <h1>За все время {sg} сум</h1>
      <div>
        {/* Добавьте выбор даты (года, месяца и дня) */}
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

      {/* Отображение данных о продажах для выбранной даты */}
      <h2>За день {selectedDateData} сум</h2>

      {/* Отображение данных о продажах напитков для выбранной даты */}
      <h3>Продажи напитков за день:</h3>
      <ul>
        {Object.entries(selectedDateDrinks).map(([drinkName, quantity]) => (
          <li key={drinkName}>
            {drinkName}: {quantity} шт.
          </li>
        ))}
      </ul>

      <section>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((tableNumber) => (
          <ProductDetail
            key={tableNumber}
            uplo={uplo}
            setUplo={setUplo}
            tableNumber={tableNumber}
          />
        ))}
      </section>
    </>
  );
}

export default App;
