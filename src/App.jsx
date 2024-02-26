import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "./Component/ProductDetail";
function App() {
  const [uplo, setUplo] = useState(0);
  return (
    <Routes>
      <Route
        path="/"
        element={<ProductDetail setUplo={setUplo} uplo={uplo} />}
      />
    </Routes>
  );
}

export default App;
