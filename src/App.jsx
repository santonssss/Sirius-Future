import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "./Component/ProductDetail";
function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductDetail />} />
    </Routes>
  );
}

export default App;
