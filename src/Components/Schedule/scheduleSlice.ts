import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Event {
  id: number;
  title: string;
  start: string;
  end: string;
  canceled: boolean;
}

interface ScheduleState {
  events: Event[];
  isDropdownOpen: boolean;
  typedName: string;
  selectedNames: string[];
}

const initialState: ScheduleState = {
  events: [
    {
      id: 1,
      title: "Ментальная Арифметика",
      start: "2024-06-15T14:00:00",
      end: "2024-06-15T15:00:00",
      canceled: false,
    },
    {
      id: 2,
      title: "Программирование",
      start: "2024-06-16T10:00:00",
      end: "2024-06-16T11:00:00",
      canceled: false,
    },
    {
      id: 3,
      title: "Скорочтение",
      start: "2024-06-17T09:00:00",
      end: "2024-06-17T10:00:00",
      canceled: false,
    },
    {
      id: 4,
      title: "Ментальная Арифметика",
      start: "2024-06-15T14:00:00",
      end: "2024-06-15T15:00:00",
      canceled: false,
    },
    {
      id: 5,
      title: "Программирование",
      start: "2024-06-16T10:00:00",
      end: "2024-06-16T11:00:00",
      canceled: true,
    },
    {
      id: 6,
      title: "Скорочтение",
      start: "2024-06-17T09:00:00",
      end: "2024-06-17T10:00:00",
      canceled: false,
    },
    {
      id: 7,
      title: "Ментальная Арифметика",
      start: "2024-06-18T16:00:00",
      end: "2024-06-18T17:00:00",
      canceled: false,
    },
    {
      id: 8,
      title: "Скорочтение",
      start: "2024-06-19T11:00:00",
      end: "2024-06-19T12:00:00",
      canceled: true,
    },
    {
      id: 9,
      title: "Программирование",
      start: "2024-06-20T13:00:00",
      end: "2024-06-20T14:00:00",
      canceled: false,
    },
    {
      id: 10,
      title: "Ментальная Арифметика",
      start: "2024-06-21T15:00:00",
      end: "2024-06-21T16:00:00",
      canceled: true,
    },
  ],
  isDropdownOpen: false,
  typedName: "Михаил",
  selectedNames: ["Программирование", "Ментальная Арифметика", "Скорочтение"],
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    toggleDropdown: (state) => {
      state.isDropdownOpen = !state.isDropdownOpen;
    },
    cancelEvent: (state, action: PayloadAction<number>) => {
      const eventId = action.payload;
      const event = state.events.find((event) => event.id === eventId);
      if (event) {
        event.canceled = true;
      }
    },
    setSelectedNames: (state, action: PayloadAction<string[]>) => {
      state.selectedNames = action.payload;
    },
  },
});

export const { toggleDropdown, cancelEvent, setSelectedNames } =
  scheduleSlice.actions;

export default scheduleSlice.reducer;
