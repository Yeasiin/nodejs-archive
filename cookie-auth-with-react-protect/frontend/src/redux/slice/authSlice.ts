import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  userInfo: null | unknown;
}
const userInfo = localStorage.getItem("userInfo");

const initialState: AuthState = {
  userInfo: userInfo ? JSON.parse(userInfo) : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredential: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    clearCredential: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredential, clearCredential } = authSlice.actions;

export default authSlice.reducer;
