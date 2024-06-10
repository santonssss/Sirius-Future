import { Route, Routes } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Home.css";
import Main from "../../Components/Main/Main";
import { useState } from "react";
import Schedule from "../../Components/Schedule/Schedule";
import NotFound from "../../Components/NotFound/NotFound";
const Home = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  return (
    <div className="home" onClick={() => setIsDropdownOpen((prev) => false)}>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Main />} />{" "}
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Home;
