import Axios from "axios";
import { message } from "antd";
import * as Types from "./actionTypes.js"; // Ensure you import your action types correctly

export const getAllCategories = () => async (dispatch) => {
  let response = {
    status: false,
    message: "",
    isLoading: true,
    categories: null,
  };

  dispatch({ type: Types.CATEGORIES_FETCH_INIT, payload: response });

  try {
    const res = await Axios.get(
      `${process.env.REACT_APP_BASE_API_URI_DEV}api/application/allCategories`
    );

    const { categories, message, success } = res.data;

    response.message = message;
    response.status = success;
    response.categories = success ? categories : null;
  } catch (err) {
    const errorMessage = err.response?.data?.message || "Probleme serveur";
    response.message = errorMessage;
    message.error(errorMessage);
    console.error(errorMessage);
  } finally {
    response.isLoading = false;
    dispatch({ type: Types.CATEGORIES_FETCH_COMPLETE, payload: response });
  }

  return response;
};
