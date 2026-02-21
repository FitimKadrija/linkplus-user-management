import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light", // "light" | "dark"
  snackbar: {
    open: false,
    message: "",
    severity: "success", // success | info | warning | error
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMode(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    showSnackbar(state, action) {
      const { message, severity = "success" } = action.payload || {};
      state.snackbar.open = true;
      state.snackbar.message = message || "";
      state.snackbar.severity = severity;
    },
    hideSnackbar(state) {
      state.snackbar.open = false;
    },
  },
});

export const { toggleMode, showSnackbar, hideSnackbar } = uiSlice.actions;
export default uiSlice.reducer;