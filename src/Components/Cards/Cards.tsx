import React, { useEffect, useState } from "react";
import "./Cards.css";
import background from "../../Images/icons/background.png";
import timeProfile from "../../Images/icons/profileTime.png";

type Props = {};

const Cards: React.FC<Props> = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 6,
    hours: 12,
    minutes: 24,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const { days, hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          return { ...prevTime, seconds: seconds - 1 };
        } else if (minutes > 0) {
          return { ...prevTime, minutes: minutes - 1, seconds: 59 };
        } else if (hours > 0) {
          return { ...prevTime, hours: hours - 1, minutes: 59, seconds: 59 };
        } else if (days > 0) {
          return {
            ...prevTime,
            days: days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        } else {
          clearInterval(timer);
          return prevTime;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="main__cards">
      <div className="main__cards-top">
        <div className="main__cards-top_card">
          <span>
            До 31 декабря любой <br /> курс со скидкой 20%
          </span>
          <p>
            До конца года у вас есть уникальная <br /> возможность
            воспользоваться нашей <br />
            новогодней скидкой 20% на любой курс!
          </p>
          <img src={background} alt="background" />
        </div>
        <div className="main__cards-top_card">
          <span>
            Следующее занятие <br /> начнется через:
          </span>
          <div className="timer">
            <span>{timeLeft.days}</span> д <span>{timeLeft.hours}</span> ч{" "}
            <span>{timeLeft.minutes}</span> мин <span>{timeLeft.seconds}</span>{" "}
            сек
          </div>
          <button>Button</button>
        </div>
      </div>
      <div className="main__cards-bottom">
        <div className="main__cards-bottom_card">
          <span className="mb">Баланс занятий</span>
          <div className="main__cards-bottom_card-lessons">
            <div className="main__cards-bottom_card-lessons_card">
              <span> Ментальная Арифметика</span> <span>32</span>
            </div>{" "}
            <div className="main__cards-bottom_card-lessons_card">
              <span>Программирование</span> <span>0</span>
            </div>{" "}
            <div className="main__cards-bottom_card-lessons_card">
              <span>Скорочтение</span> <span>4</span>
            </div>
          </div>
          <button>Button</button>
        </div>
        <div className="main__cards-bottom_card">
          <span>Ближайшие уроки</span>
          <div className="main__cards-bottom_card-discount-lessons">
            <div className="main__cards-bottom_card-discount-lessons_card">
              <div className="main__cards-bottom_card-discount-lessons_card-number">
                <p>15</p>
                <p>Мая</p>
              </div>
              <span className="mg ft bold">Ментальная Арифметика</span>
              <span className="time">
                14:00-14:25
                <span className="ft ">
                  {" "}
                  <img src={timeProfile} alt="profileIcon" />
                  Белкина Инна
                </span>
              </span>
              <div className="main__cards-bottom_card-discount-lessons_card-btns">
                <button>Button</button>
                <button>Button</button>
              </div>
            </div>{" "}
            <div className="main__cards-bottom_card-discount-lessons_card">
              <div className="main__cards-bottom_card-discount-lessons_card-number">
                <p>30</p>
                <p>Октября</p>
              </div>
              <span className="mg ft bold">Программирование</span>
              <span className="time">
                11:00-11:11
                <span className="ft">
                  {" "}
                  <img src={timeProfile} alt="profileIcon" />
                  Животновская Оксана
                </span>
              </span>
              <div className="main__cards-bottom_card-discount-lessons_card-btns">
                <button>Button</button>
                <button>Button</button>
              </div>
            </div>{" "}
            <div className="main__cards-bottom_card-discount-lessons_card">
              <div className="main__cards-bottom_card-discount-lessons_card-number">
                <p>16</p>
                <p>Ноября</p>
              </div>
              <span className="mg ft bold">Скорочтение</span>
              <span className="time">
                09:00-09:45
                <span className="ft">
                  {" "}
                  <img src={timeProfile} alt="profileIcon" />
                  Мин Елена
                </span>
              </span>
              <div className="main__cards-bottom_card-discount-lessons_card-btns">
                <button>Button</button>
                <button>Button</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
