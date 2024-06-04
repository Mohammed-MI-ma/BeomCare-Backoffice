import { createSlice } from "@reduxjs/toolkit";
import { searchCategoryMeiliSearch } from "./categoryActions";

const ITEMS_PER_PAGE = 20;

const initialState = {
  loadingSearch: false,
  loadingCategory: false,
  categories: [{}],
  currentPage: 1,
  totalPages: 0,
  newEmptyCategory: {
    name: "",
    description: "",
    isActive: false,
    comment: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  },
  error: null,
  isAllowedToAddNewCategory: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload.hits;
      state.totalPages = Math.ceil(action.payload.hits.length / ITEMS_PER_PAGE);
    },

    setNewCategoryName: (state, action) => {
      state.newEmptyCategory.name = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setIsAllowedToAddNewCategory: (state, action) => {
      state.isAllowedToAddNewCategory = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchCategoryMeiliSearch.pending, (state) => {
        state.loadingSearch = true;
        state.error = null;
      })
      .addCase(searchCategoryMeiliSearch.fulfilled, (state, action) => {
        state.loadingSearch = false;
        state.error = null;
        state.categories = action.payload;
        state.currentPage = 1; // Reset to the first page
        state.totalPages = Math.ceil(
          action.payload.data?.length / ITEMS_PER_PAGE
        );
      })
      .addCase(searchCategoryMeiliSearch.rejected, (state, action) => {
        state.loadingSearch = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setCategories,
  setCurrentPage,
  setError,
  setNewCategoryName,
  clearError,
  setIsAllowedToAddNewCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
