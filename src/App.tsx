import React from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignIn from "./Pages/SignIn/SignIn";
import Home from "./Pages/Home/Home";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
