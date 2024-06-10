import React from "react";
import "./Main.css";
import Header from "../Header/Header";
import Cards from "../Cards/Cards";
import { useDispatch } from "react-redux";
import { toggleDropdown } from "../Schedule/scheduleSlice";

type Props = {};

const Main: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const handleDropdownToggle = () => {
    dispatch(toggleDropdown());
  };
  return (
    <div className="main" onClick={(e) => e.stopPropagation()}>
      <Header handleDropdownToggle={handleDropdownToggle} />
      <Cards />
    </div>
  );
};

export default Main;
