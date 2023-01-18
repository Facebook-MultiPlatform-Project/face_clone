import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/index";

const rootReducer = combineReducers({
  user: userSlice,
});

export const store = configureStore({ reducer: rootReducer });
