import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import chat from "../../Images/icons/chat.png";
import arrow from "../../Images/icons/Arrow.png";
import exit from "../../Images/icons/exit.png";
import { toggleDropdown, setTypedName } from "./headerSlice";
import UserProfile from "../UserProfile/UserProfile";
import { useNavigate } from "react-router-dom";
interface HeaderProps {
  handleDropdownToggle: () => void;
}
const Header: React.FC<HeaderProps> = ({ handleDropdownToggle }) => {
  const dispatch = useDispatch();
  const isDropdownOpen = useSelector(
    (state: RootState) => state.schedule.isDropdownOpen
  );
  const [addClass, setAddClass] = useState(false);
  const typedName = useSelector((state: RootState) => state.schedule.typedName);

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/sign-in");
  };
  const name = "Михаил";

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (!isDropdownOpen) {
      timer = setInterval(() => {
        if (name.length > typedName.length) {
          dispatch(setTypedName(typedName + name[typedName.length]));
        } else {
          clearInterval(timer as NodeJS.Timeout);
          timer = null;
        }
      }, 200);
    } else if (timer) {
      clearInterval(timer);
      timer = null;
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isDropdownOpen, typedName, dispatch, name]);

  const handleDropdownToggleClick = () => {
    handleDropdownToggle();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAddClass(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <header>
      <div className="main__header-title">
        Добро пожаловать, <span>{typedName}</span>
        {typedName === name && "!"}
      </div>
      <div
        className={`main__header-profiles ${
          isDropdownOpen && "main__header-profiles-check"
        }`}
      >
        <button className={` ${addClass ? "chatting" : ""}`}>
          <img src={chat} alt="chat" />
        </button>
        <button onClick={handleDropdownToggleClick}>
          <img
            src="https://s3-alpha-sig.figma.com/img/dae3/59ff/8f6d0de811237737f4dd4647e4b450b5?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cYD5~UVyi0e5FV6UufOzKn-kYLLkBtdbeNVh8Sc5D7hexbteNXIDyMA3L7QQ791nLZ~~MEdKDi16wngFy2UFv9AXHxGBInvlziicEY4n8U9pz~vSTdifZPI7eFWmINMRvMaIv69pbbIVwlksZ6jDGpx24XjEIit9WqE-ni6WDUUvw798cEJMbN8rZv9f6ghzfOpivOBDYZnCAyg3Fl9r8PRFckK4nCUuFvPZkxXKMybOqq7ojoOJ1iMITpNuGJxHHR9ODy8jXBtobCQQeHO2xUA7XwTiVQjpDKNtESAsYvWdo5RUviy1YIuUSqGqcjz~lvUKSTNfz8-lkSbYw5iqeQ__"
            alt="profile"
          />
        </button>
        <img src={arrow} alt="arrow" />
        {isDropdownOpen && (
          <div className={`main__header-profiles--dropdown-profile `}>
            <h4>Смена пользователя</h4>
            <div className="main__header-profiles--dropdown-profile__users">
              <UserProfile
                name="Михаил"
                description="это вы"
                imageUrl="https://s3-alpha-sig.figma.com/img/dae3/59ff/8f6d0de811237737f4dd4647e4b450b5?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cYD5~UVyi0e5FV6UufOzKn-kYLLkBtdbeNVh8Sc5D7hexbteNXIDyMA3L7QQ791nLZ~~MEdKDi16wngFy2UFv9AXHxGBInvlziicEY4n8U9pz~vSTdifZPI7eFWmINMRvMaIv69pbbIVwlksZ6jDGpx24XjEIit9WqE-ni6WDUUvw798cEJMbN8rZv9f6ghzfOpivOBDYZnCAyg3Fl9r8PRFckK4nCUuFvPZkxXKMybOqq7ojoOJ1iMITpNuGJxHHR9ODy8jXBtobCQQeHO2xUA7XwTiVQjpDKNtESAsYvWdo5RUviy1YIuUSqGqcjz~lvUKSTNfz8-lkSbYw5iqeQ__"
              />
              <UserProfile
                name="Анна"
                imageUrl="https://s3-alpha-sig.figma.com/img/e96c/a3a7/27213c5b6ea1e20ebaaf214effe6ab68?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fnnyHzJhX2LhzOgxj~tE6Ix16Hx8L2MncU1T433cgfwN5aN87zUYLyZ1xZf~iaxZut4g4HJIbjgA5kdeD1wYeU2wnbNB50leiRjcH0fO~y~~fpz-WWz6JbBqi3nnfQqTLMcmIV5ZIaQYsJpeJcqiz-Qbyl0S-wjA5fC8aZUh53c5vd28ZdfjGY7vEmVn3NMJgLkoa0YL5yZwV3CERDiQiP~CSYJmRGqDYEh7eWO7p23FHAnHX-EOSixI9PSz3uKUPedzkQym2hNbVTsfCo-QNh0wAUOQ4U7Kl7EeqeV8T~LxhDJtTzL~f63m60DvqV25sD-OOviRcL65MEDSyFmM~g__"
              />
              <div className="logout">
                <span onClick={handleLogout}>Выйти</span>
                <img onClick={handleLogout} src={exit} alt="exit" />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
