import { createSlice } from "@reduxjs/toolkit";
import { GrArticle } from "react-icons/gr";

// Initial state
const initialState = {
  language: "fr",
  isGettingCategories: false,
  categories: [],
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
