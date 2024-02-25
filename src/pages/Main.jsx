import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";

const Main = () => {
  const [prod, setProd] = useState([]);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchP = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProd(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchP();
  }, []);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  const sortProducts = (products, sortBy) => {
    if (sortBy === "title") {
      return [...products].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "body") {
      return [...products].sort((a, b) =>
        a.description.localeCompare(b.description)
      );
    }
    return products;
  };

  return (
    <div>
      <Navbar />
      <select name="" id="" onChange={handleSortChange} value={sortBy}>
        <option value="" disabled>
          Сортировка по
        </option>
        <option value="title">название</option>
        <option value="body">описанию</option>
      </select>
      {sortProducts(prod, sortBy).map((product) => {
        return (
          <div key={product.id} className="card">
            <h1
              style={{
                fontSize: "25px",
              }}
            >
              {product.title}
            </h1>
            <p
              style={{
                fontSize: "15px",
              }}
            >
              {product.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Main;
