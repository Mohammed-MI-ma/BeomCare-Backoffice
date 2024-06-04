import { createSlice } from "@reduxjs/toolkit";
import { GrArticle } from "react-icons/gr";
import { getAllCategories } from "./actions/applicationService";

// Initial state
const initialState = {
  language: "fr",
  isGettingCategories: false,
  categories: [],
  pagination: {
    totalItems: 0,
    currentPage: 1,
    totalPages: 0,
    itemsPerPage: 5,
    hasNextPage: false,
    hasPrevPage: false,
  },
  roleSelected: {
    id: "editor",
    role: "editor",
    title: "Rédacteur Beom",
    icon: <GrArticle size={40} />,
    missions: [
      { id: 1, desc: "Exclusivement pour la gestion de contenu" },
      { id: 2, desc: "Révision et édition de contenu" },
    ],
  },

  //DrawerSettings
  drawerOpenSettings: false,
};

// Slice definition
const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload;
    },
    setRoleSelected(state, action) {
      state.roleSelected = action.payload;
    },
    setIsGettingCategories(state, action) {
      state.isGettingCategories = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setDrawerOpenSettings: (state, action) => {
      state.drawerOpenSettings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.isGettingCategories = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isGettingCategories = false;
        state.categories = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.isGettingCategories = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const {
  setLanguage,
  setRoleSelected,
  setIsGettingCategories,
  setCategories,
  setDrawerOpenSettings,
} = applicationSlice.actions;

// Export reducer
export default applicationSlice.reducer;
