import Axios from "axios";
import * as Types from "./types";
import { message } from "antd";

export const handleChangeLoginInput = (name, value) => (dispatch) => {
  let data = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.CHANGE_LOGIN_INPUT, payload: data });
};

//REGISTER_DONE
export const handleChangeRegisterInput = (name, value) => (dispatch) => {
  let data = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.CHANGE_REGISTER_INPUT, payload: data });
};

export const loginAdmin =
  (postData, maxRetries = 1) =>
  async (dispatch) => {
    return new Promise(async (resolve, reject) => {
      let response = {
        status: false,
        message: "",
        isLoading: true,
        accessToken: null,
        refreshToken: null,
        userData: null,
      };
      dispatch({ type: Types.AUTH_LOGIN_CHECK, payload: response });
      const performLoginRequest = () => {
        Axios.post(
          `${process.env.REACT_APP_BASE_API_URI_DEV}api/auth/login-admin`,
          postData
        )
          .then((res) => {
            const { accessToken, refreshToken, user, message, success } =
              res.data;

            response.message = message;
            response.status = success;
            if (response.status) {
              response.accessToken = accessToken;
              response.refreshToken = refreshToken;
              response.userData = user;

              // Store data's to local storage
              localStorage.setItem("is_logged_in", true);
              localStorage.setItem("accessToken", accessToken);
              localStorage.setItem("refreshToken", refreshToken);

              localStorage.setItem("userData", JSON.stringify(user));
              resolve(response); // Resolve the promise with the response
            } else {
              resolve(response);
            }
          })
          .catch((err) => {
            const message = err.response?.data
              ? err.response?.data.message
              : "Probleme servuer";
            response.message = message;
            console.error(message);
            resolve(response); // Reject the promise with the response
          });
      };

      try {
        performLoginRequest();
      } catch (err) {
        // Handle other errors or exceptions
        const message = "An unexpected error occurred. Please try again later.";
        response.message = message;
        message.error(message);
        resolve(response);
      } finally {
        response.isLoading = false;
        dispatch({ type: Types.AUTH_LOGIN_CHECK, payload: response });
      }
    });
  };

export const registerUser = (postData) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    let response = {
      status: false,
      message: "",
      isLoading: true,
      // access_token: null,
      userData: null,
      errors: [],
    };
    dispatch({ type: Types.AUTH_REGISTER_SUBMIT, payload: response });

    try {
      const res = await Axios.post(
        `${process.env.REACT_APP_BASE_API_URI_DEV}api/auth/signup`,
        postData
      );
      const { message, success } = res.data;
      response.message = message;
      response.status = success;

      if (success) {
        resolve(response); // Resolve the promise with the response
      } else {
        resolve(response); // Reject the promise with the response
      }
    } catch (err) {
      const errorsResponse = JSON.parse(err.request.response);
      if (
        errorsResponse.errors &&
        Object.entries(errorsResponse.errors).length > 0
      ) {
        const message = errorsResponse.message;
        response.message = message;
        response.errors = errorsResponse.errors;

        resolve(response); // Reject the promise with the response
      } else {
        const message = JSON.parse(err.request.response).message;
        response.message = message;
        resolve(response); // Reject the promise with the response
      }
    } finally {
      response.isLoading = false;
      dispatch({ type: Types.AUTH_REGISTER_SUBMIT, payload: response });
    }
  });
};

export const logoutAction = () => async (dispatch) => {
  let response = {
    status: false,
    message: "",
    isLoading: true,
  };
  dispatch({ type: Types.AUTH_POST_LOGOUT, payload: response });

  try {
    localStorage.removeItem("is_logged_in");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userData");
    if (typeof window !== "undefined") {
      window.loction.href = "/auth/login";
    }
  } catch (error) {
    response.message = "Something Went Wrong !";
    message.error(error);
  }
  response.isLoading = false;
  dispatch({ type: Types.AUTH_POST_LOGOUT, payload: response });
};

export const getAuthAction = () => async (dispatch) => {
  let data = {
    status: false,
    accessToken: null,
    userData: null,
  };

  const userData = localStorage.getItem("userData");
  const tokenData = localStorage.getItem("accessToken");

  if (userData != null && tokenData != null) {
    data.status = true;
    data.userData = JSON.parse(userData);
    data.accessToken = tokenData;
  } else {
    data.status = false;
  }

  dispatch({ type: Types.GET_AUTH_DATA, payload: data });
};
export const requestResetPasswordLinkAction =
  ({ email }) =>
  async (dispatch) => {
    let response = {
      status: false,
      message: "",
      isLoading: true,
    };
    dispatch({ type: Types.RESET_PASSWORD_LINK_REQUEST, payload: response });

    try {
      const res = await Axios.post(
        `http://127.0.0.1:5000/api/auth/forgot-password`,
        { email }
      );

      const { message, success } = res.data;
      response.message = message;
      response.status = success;

      if (success) {
      } else {
      }

      // Resolve the promise with the response
      return response;
    } catch (err) {
      const message = JSON.parse(err.request.response).message;
      response.message = message;
      message.error(message);

      // Reject the promise with the error
      throw response;
    } finally {
      response.isLoading = false;
      dispatch({ type: Types.RESET_PASSWORD_LINK_REQUEST, payload: response });
    }
  };

export const resetPasswordAction =
  ({ email, resetToken, newPassword }) =>
  async (dispatch) => {
    let response = {
      status: false,
      message: "",
      isLoading: true,
    };
    dispatch({ type: Types.RESET_PASSWORD, payload: response });

    try {
      const res = await Axios.post(
        `http://127.0.0.1:5000/api/auth/reset-password`,
        { email, resetToken, newPassword }
      );

      const { message, success } = res.data;
      response.message = message;
      response.status = success;

      if (success) {
      } else {
      }
      return response; // Return the response object
    } catch (err) {
      const message = JSON.parse(err.request.response).message;
      response.message = message;
      message.error(message);
    } finally {
      response.isLoading = false;
      dispatch({ type: Types.RESET_PASSWORD, payload: response });
    }
  };

export const verifyUser = (userId, accessToken) => async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `http://127.0.0.1:5000/api/auth/verify-user/${userId}`, // Updated API route
        headers: {
          "x-auth-token": accessToken,
        },
      };

      const response = await Axios.request(config);
      resolve(response);
    } catch (error) {
      reject(error);
      console.error(error);
    }
  });
};
