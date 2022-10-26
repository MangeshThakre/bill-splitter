import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    user: {},
    groups: [],
    friends: [],
  },

  reducers: {
    user: (state, action) => {
      state.user = action.payload;
    },
    groups: (state, action) => {
      state.groups = action.payload;
    },
    friends: (state, action) => {
      state.friends = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { user, groups, friends } = globalSlice.actions;

export default globalSlice.reducer;
