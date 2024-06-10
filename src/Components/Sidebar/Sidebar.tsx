import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import calendar from "../../Images/icons/calendar.png";
import folder from "../../Images/icons/folder.png";
import headpones from "../../Images/icons/headpones.png";
import home from "../../Images/icons/home.png";
import kubok from "../../Images/icons/kubok.png";
import payload from "../../Images/icons/payload.png";
import pazzle from "../../Images/icons/pazzle.png";
import question from "../../Images/icons/question.png";
import settings from "../../Images/icons/settings.png";
import Logomark from "../../Images/icons/Logomark_1_.png";
import logotype from "../../Images/icons/logotype2.png";
import gyft from "../../Images/icons/gift.png";

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const menuItems = [
    {
      id: 1,
      name: "Главная",
      path: "/",
      backgroundColor: "#8D7FC7",
      icon: home,
    },
    {
      id: 2,
      name: "Расписание",
      path: "/schedule",
      backgroundColor: "#8D7FC7",
      icon: calendar,
    },
    {
      id: 3,
      name: "Оплата",
      path: "/payload",
      backgroundColor: "#8D7FC7",
      icon: payload,
    },
    {
      id: 4,
      name: "Достижения",
      path: "/congrutalation",
      backgroundColor: "#8D7FC7",
      icon: kubok,
    },
    {
      id: 5,
      name: "Тренажеры",
      path: "/traning",
      backgroundColor: "#8D7FC7",
      icon: pazzle,
    },
    {
      id: 6,
      name: "Библиотека",
      path: "/library",
      backgroundColor: "#8D7FC7",
      icon: folder,
    },
    {
      id: 7,
      name: "Проверка связи",
      path: "/testing",
      backgroundColor: "#8D7FC7",
      icon: headpones,
    },
    {
      id: 8,
      name: "Настройки",
      path: "/settings",
      backgroundColor: "#8D7FC7",
      icon: settings,
    },
    {
      id: 9,
      name: "Вопросы",
      path: "/faq",
      backgroundColor: "#8D7FC7",
      icon: question,
    },
  ];

  useEffect(() => {
    const storedActiveItem = localStorage.getItem("activeItem");
    if (storedActiveItem) {
      setActiveItem(storedActiveItem);
    } else {
      setActiveItem(menuItems[0].name);
    }
  }, []);

  const handleMenuItemClick = (itemName: string) => {
    setActiveItem(itemName);
    localStorage.setItem("activeItem", itemName);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__logotype">
        <img src={Logomark} alt="logomark" />
        <img src={logotype} alt="" />
      </div>
      <nav>
        <ul>
          {menuItems.map((menuItem) => (
            <li
              key={menuItem.id}
              className={
                activeItem === menuItem.name ? "sidebar__logotype--active" : ""
              }
            >
              <Link
                to={menuItem.path}
                style={{ color: "#434B74", textDecoration: "none" }}
                onClick={() => handleMenuItemClick(menuItem.name)}
              >
                <button
                  className={`sidebar__link-button ${
                    activeItem === menuItem.name ? "active" : ""
                  }`}
                >
                  <img
                    src={menuItem.icon}
                    alt={menuItem.name}
                    style={{ marginRight: "10px" }}
                  />
                  {menuItem.name}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="aksiya">
        <h3>Учитесь бесплатно</h3>
        <p>
          Приводите друзей с детьми <br /> заниматься в Sirius Future <br /> и
          получайте подарки!
        </p>
        <button>Узнать</button>
        <img src={gyft} alt="" />
      </div>
    </div>
  );
};

export default Sidebar;
