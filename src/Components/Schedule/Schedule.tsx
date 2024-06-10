import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDropdown, cancelEvent, setSelectedNames } from "./scheduleSlice";
import Header from "../Header/Header";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import ruLocale from "@fullcalendar/core/locales/ru";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./Schedule.css";
import payload from "../../Images/icons/payload.png";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["Ментальная Арифметика", "Скорочтение", "Программирование"];

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

type Props = {};

const Schedule: React.FC<Props> = () => {
  const calendarRef = useRef<any>(null);
  const events = useSelector((state: any) => {
    const selectedNames = state.schedule.selectedNames;
    return state.schedule.events.filter((event: any) =>
      selectedNames.includes(event.title)
    );
  });
  const isDropdownOpen = useSelector(
    (state: any) => state.schedule.isDropdownOpen
  );
  const selectedNames = useSelector(
    (state: any) => state.schedule.selectedNames
  );
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof selectedNames>) => {
    const {
      target: { value },
    } = event;
    dispatch(
      setSelectedNames(typeof value === "string" ? value.split(",") : value)
    );
  };

  const renderEventContent = (eventInfo: any) => {
    const startTime = eventInfo.event.start
      ? eventInfo.event.start.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";
    const endTime = eventInfo.event.end
      ? eventInfo.event.end.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

    const eventClass = eventInfo.event.extendedProps.canceled
      ? "cancelled"
      : "";

    return (
      <div className={`custom-event ${eventClass}`}>
        <img src={payload} className="payload-icon" alt="payload" />
        <strong>
          {startTime} - {endTime}
        </strong>
        <br />
        <span>{eventInfo.event.title}</span>
      </div>
    );
  };

  const handleDropdownToggle = () => {
    dispatch(toggleDropdown());
  };

  return (
    <div className="schedule">
      <Header handleDropdownToggle={handleDropdownToggle} />
      <div className="select-block">
        <FormControl sx={{ m: 1, width: 300, height: 40 }}>
          <InputLabel id="demo-multiple-name-label">Выбрать</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={selectedNames}
            onChange={handleChange}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, selectedNames, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <button>Изменить расписание</button>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={renderEventContent}
        locale={ruLocale}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "",
        }}
        customButtons={{
          today: {
            text: "Сегодня",
            click: () => {
              const today = new Date();
              calendarRef.current?.gotoDate(today);
            },
          },
        }}
      />
    </div>
  );
};

export default Schedule;
