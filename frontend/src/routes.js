// routes.js
import React, { lazy } from "react";
import CustomSuspense from "./Components/CustomSuspense";
import AdminPage from "./Pages/AdminPage";
import EditorPage from "./Pages/EditorPage";

import RoleBasedRoute from "./Components/Utilities/RoleBasedRoute";

//__lazy_loaded_components

//__Authentication_components
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const SignUpPage = lazy(() => import("./Pages/SignUpPage"));
const LandingPage = lazy(() => import("./Pages/LandingPage"));

//__protectedRoute
const HomePage = lazy(() => import("./Pages/HomePage"));

//__404_page
const NotFoundPage = lazy(() => import("./Pages/NotFoundPage"));

export const routes = [
  {
    path: "/",
    element: (
      <CustomSuspense id="landingPage">
        <LandingPage />
      </CustomSuspense>
    ),
  },
  // TODO: //AUTHENTICATION ROUTES

  //__loginRoute
  {
    path: "/beom/account/log-in",
    element: (
      <CustomSuspense id="login-page">
        <LoginPage />
      </CustomSuspense>
    ),
  },

  // TODO: //AUTHENTICATION ROUTES

  //__SignUp
  {
    path: "/beom/account/sign-up",
    element: (
      <CustomSuspense id="signUp-page">
        <SignUpPage />
      </CustomSuspense>
    ),
  },

  // TODO: //PROTECTED ROUTE
  {
    path: "/beom/homepage",
    element: (
      <CustomSuspense id="homepage">
        <HomePage />
      </CustomSuspense>
    ),
  },

  {
    path: "/beom/adminPage",
    element: (
      <RoleBasedRoute adminComponent={AdminPage} editorComponent={EditorPage} />
    ), // Include both components for RoleBasedRoute to handle
  },
  {
    path: "/beom/editorPage",
    element: (
      <RoleBasedRoute adminComponent={AdminPage} editorComponent={EditorPage} />
    ), // Include both components for RoleBasedRoute to handle
  },

  // TODO: //404 ROUTE
  {
    path: "*",
    element: (
      <CustomSuspense id="404">
        <NotFoundPage />
      </CustomSuspense>
    ),
  },
];
