import React, { useState, useEffect } from "react";
import TableCard from "./TableCard";
export default function ProductDetail() {
  const [fruits, setFruits] = useState([]);
  const [newFruit, setNewFruit] = useState("");

  const fetchFruits = async () => {
    try {
      const response = await fetch("http://localhost:3000/fruits");
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      const data = await response.json();
      setFruits(data.fruits);
    } catch (error) {
      console.error("Ошибка при получении фруктов:", error.message);
    }
  };

  useEffect(() => {
    fetchFruits();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await fetch("http://localhost:3000/fruits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fruit: newFruit }),
      });
      console.log(fruits);
      fetchFruits();

      setNewFruit("");
    } catch (error) {
      console.error("Ошибка при добавлении фрукта:", error.message);
    }
  };

  return (
    <section>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((tableNumber) => (
        <TableCard key={tableNumber} tableNumber={tableNumber} />
      ))}
    </section>
  );
}
