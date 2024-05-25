import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import CustomSuspense from "../../CustomSuspense";

const RoleBasedRoute = ({
  component: Component,
  adminComponent: AdminComponent,
  editorComponent: EditorComponent,
  ...rest
}) => {
  const roleSelected = useSelector((state) => state.auth.userInfo?.mission);
  console.log(roleSelected);

  if (roleSelected === "boss") {
    return (
      <CustomSuspense id="adminPage">
        <AdminComponent />
      </CustomSuspense>
    );
  } else if (roleSelected === "editor") {
    return (
      <CustomSuspense id="editorPage">
        <EditorComponent />
      </CustomSuspense>
    );
  } else {
    return <Navigate to="/" />; // Redirect to home or a not authorized page if role is not matched
  }
};
export default RoleBasedRoute;
