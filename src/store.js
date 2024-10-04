import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice";
// Redux store'unun oluşturulması
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
