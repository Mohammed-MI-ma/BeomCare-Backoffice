import React from "react";
import { useTranslation } from "react-i18next";
import useFontFamily from "../../Utilities/useFontFamily";
import DrawerGeneric from "../Utilities/DrawerGeneric";

const SettingsAdminDrawer = ({ openSettings, onClose }) => {
  const { t } = useTranslation();
  const fontFamilyLight = useFontFamily("Light");
  return (
    <DrawerGeneric
      open={openSettings}
      onClose={onClose}
      titre={
        <h1
          style={{
            fontFamily: fontFamilyLight,
            fontSize: "var(--font-small-size)",
          }}
        >
          {t("Paramètres")}
        </h1>
      }
    ></DrawerGeneric>
  );
};

export default SettingsAdminDrawer;
