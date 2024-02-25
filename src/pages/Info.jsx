import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import { Link } from "react-router-dom";
const Info = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchP = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchP();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="cards">
        {data.map((pr) => {
          return (
            <div className="card">
              <h2>{pr.title}</h2>
              <Link to={`/product/${pr.id}`}>Go more</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Info;
