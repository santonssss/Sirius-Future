import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HeaderState {
  isDropdownOpen: boolean;
  typedName: string;
}

const initialState: HeaderState = {
  isDropdownOpen: false,
  typedName: "",
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    toggleDropdown(state) {
      state.isDropdownOpen = !state.isDropdownOpen;
    },
    setTypedName(state, action: PayloadAction<string>) {
      state.typedName = action.payload;
    },
  },
});

export const { toggleDropdown, setTypedName } = headerSlice.actions;
export default headerSlice.reducer;
