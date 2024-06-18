import { createSlice } from "@reduxjs/toolkit";
const accessToken = localStorage.getItem("accessToken") || null;
const refreshToken = localStorage.getItem("refreshToken") || null;
const userInfo = JSON.parse(localStorage.getItem("userData")) || null;

const initialState = {
  userInfo: userInfo,
  accessToken: accessToken,
  refreshToken: refreshToken,
  registerData: null,
  loginData: {},
  error: null,
  success: false,
  forgotPasswordData: {},
  isUserLoggedIn: Boolean(accessToken),
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.userInfo = initialState.userInfo;
      state.accessToken = initialState.accessToken;
      state.refreshToken = initialState.refreshToken;
      state.registerData = initialState.registerData;
      state.loginData = initialState.loginData;
      state.error = initialState.error;
      state.success = initialState.success;
      state.forgotPasswordData = initialState.forgotPasswordData;
      state.isUserLoggedIn = false;
      state.loading = initialState.loading;
    },
    setForgotPasswordData: (state, { payload }) => {
      state.forgotPasswordData = payload;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
    setRegisterData: (state, { payload }) => {
      state.registerData = payload;
      localStorage.setItem("registerData", JSON.stringify(payload));
    },
    setLoginData: (state, { payload }) => {
      state.loginData = payload;
      localStorage.setItem("loginData", JSON.stringify(payload));
    },
    setRefreshToken: (state, { payload }) => {
      state.refreshToken = payload;
      localStorage.setItem("refreshToken", payload);
    },
    resetRegisterData: (state) => {
      state.registerData = {};
    },
    setUserIsLoggedIn: (state, { payload }) => {
      state.isUserLoggedIn = payload;
    },
    setUserToken: (state, { payload }) => {
      state.accessToken = payload;
      localStorage.setItem("accessToken", payload);
    },
    // Define your reducer actions here
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    // Other actions...
  },
});

export const {
  logout,
  setForgotPasswordData,
  setCredentials,
  setRegisterData,
  setLoginData,
  setRefreshToken,
  resetRegisterData,
  setUserIsLoggedIn,
  setUserToken,
  setLoading,
  setError,
} = authSlice.actions;

export default authSlice.reducer;
