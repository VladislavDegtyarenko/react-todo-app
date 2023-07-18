import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../utils/localStorage";

export const darkThemeSlice = createSlice({
  name: "darkTheme",
  initialState: () => getLocalStorage("darkTheme", true),
  reducers: {
    toggleDarkTheme: (state) => {
      return (state = !state);
    },
  },
});

export const { toggleDarkTheme } = darkThemeSlice.actions;

export default darkThemeSlice.reducer;
