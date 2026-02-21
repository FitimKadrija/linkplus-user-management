import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice";
import uiReducer from "../features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    ui: uiReducer,
  },
});