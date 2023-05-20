import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import { apiBuilder } from "./services/api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiBuilder.reducerPath]: apiBuilder.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiBuilder.middleware),
});

export type RootType = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
