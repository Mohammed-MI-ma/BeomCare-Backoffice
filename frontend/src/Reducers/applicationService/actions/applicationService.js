import Axios from "axios";
import { message } from "antd";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllCategories = createAsyncThunk(
  "application/fetchCategories",
  async ({ accessToken, page = 1, limit = 5 }, { rejectWithValue }) => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_BASE_API_URI_DEV}api/application/category/getAll`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
          params: { page, limit },
        }
      );
      return res.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Problème serveur";
      message.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
