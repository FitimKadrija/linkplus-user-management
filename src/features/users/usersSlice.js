import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  return res.data;
});

const initialState = {
  items: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare({ name, email, company }) {
        return {
          payload: {
            id: nanoid(),
            name,
            email,
            company: { name: company || "Local User" },
            phone: "",
            website: "",
            address: {
              street: "",
              suite: "",
              city: "",
              zipcode: "",
            },
            isLocal: true,
          },
        };
      },
    },
    updateUser(state, action) {
      const { id, changes } = action.payload;
      const idx = state.items.findIndex((u) => String(u.id) === String(id));
      if (idx !== -1) {
        state.items[idx] = { ...state.items[idx], ...changes };
        if (typeof state.items[idx].company === "string") {
          state.items[idx].company = { name: state.items[idx].company };
        }
      }
    },
    deleteUser(state, action) {
      const id = action.payload;
      state.items = state.items.filter((u) => String(u.id) !== String(id));
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to fetch users";
      });
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;