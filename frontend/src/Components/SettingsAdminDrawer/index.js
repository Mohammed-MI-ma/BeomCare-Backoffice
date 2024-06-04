import React from "react";
import { useTranslation } from "react-i18next";
import useFontFamily from "../../Utilities/useFontFamily";
import DrawerGeneric from "../Utilities/DrawerGeneric";
import { Button, Divider } from "antd";
import { useDispatch } from "react-redux";
import { LogoutOutlined } from "@ant-design/icons";
import { setDrawerOpenSettings } from "../../Reducers/applicationService/applicationSlice";
import { logout } from "../../Reducers/authService/authSlice";
const SettingsAdminDrawer = ({ openSettings, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const fontFamilyMedium = useFontFamily("Medium");

  const logoutAction = async () => {
    try {
      dispatch(setDrawerOpenSettings(false));
      dispatch(logout());
    } catch (error) {
      // Handle any errors if necessary
      dispatch(setDrawerOpenSettings(false));
      console.log(error);
    }
  };
  const fontFamilyLight = useFontFamily("Light");
  return (
    <DrawerGeneric
      open={openSettings}
      onClose={onClose}
      titre={
        <h1
          style={{
            fontFamily: fontFamilyLight,
            fontSize: "var(--font-medium-size)",
          }}
        >
          {t("Paramètres")}
        </h1>
      }
    >
      <div
        className="absolute w-full flex items-center flex-col"
        style={{ bottom: 0, color: "white", left: 0 }}
      >
        <Divider
          style={{
            width: "100%",
            backgroundColor: "white",
            height: "2px",
          }}
        />
        <Button
          onClick={logoutAction}
          type="link"
          style={{
            fontFamily: fontFamilyMedium,
            color: "rgba(4, 30, 73, 1)",
          }}
          icon={<LogoutOutlined />}
        >
          {t("se déconnecter")}
        </Button>
      </div>
    </DrawerGeneric>
  );
};

export default SettingsAdminDrawer;
