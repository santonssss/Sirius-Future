import { useEffect, useState } from "react";
import "./App.css";
import ProductDetail from "./Component/ProductDetail";
import { Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import Grafa from "./pages/Grafa";

function App() {
  const [uplo, setUplo] = useState(0);
  const [serverIsWork, setServerIsWork] = useState(false);
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

  const [monthlyData, setMonthlyData] = useState();
  useEffect(() => {
    const handleFetchData = async () => {
      try {
        const response = await fetch(
          `https://enchanted-marmalade-brie.glitch.me/getTotalAmount`
        );
        if (response.status === 500) {
          setServerIsWork(false);
        }
        const data = await response.json();
        setSg(data.allTime);
        setMonthlyData(data.monthly);
        setDayData(data);
        setServerIsWork(true);
      } catch (error) {
        setServerIsWork(false);
        console.error("Ошибка запроса:", error);
      }
    };
    handleFetchData();
  }, [uplo, selectedYear, selectedMonth]);

  const selectedDateData =
    dayData?.day?.[selectedYear]?.[selectedMonth]?.[selectedDay] || "0";
  const selectedDateDrinks =
    dayData?.dayNapitki?.[selectedYear]?.[selectedMonth]?.[selectedDay] || {};
  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <Admin setUplo={setUplo} serverIsWork={serverIsWork} uplo={uplo} />
        }
      />
      <Route
        path={"/admin-panel"}
        element={
          <Grafa
            sg={sg}
            monthlyData={monthlyData}
            setSelectedDay={setSelectedDay}
            setSelectedMonth={setSelectedMonth}
            setSelectedYear={setSelectedYear}
            selectedDay={selectedDay}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            selectedDateDrinks={selectedDateDrinks}
            selectedDateData={selectedDateData}
          />
        }
      />
    </Routes>
  );
}

export default App;
