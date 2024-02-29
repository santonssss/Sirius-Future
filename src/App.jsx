import { useEffect, useState } from "react";
import "./App.css";
import ProductDetail from "./Component/ProductDetail";
function App() {
  const [uplo, setUplo] = useState(0);
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
  const today = new Date().getDate();
  const totalForDay =
    day && day.hasOwnProperty(today) ? parseFloat(day[today]).toFixed(2) : 0;

  return (
    <>
      <h1>За все время {sg} сум</h1>
      <h2>За день {totalForDay} сум </h2>
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
