import { configureStore } from "@reduxjs/toolkit";
import applicationReducer from "./Reducers/applicationService/applicationSlice";
import authReducer from "./Reducers/authService/authSlice";
import categoryReducer from "./Reducers/applicationService/actions/category/categorySlice";

const reducers = {
  application: applicationReducer,
  category: categoryReducer,
  auth: authReducer,
};

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
