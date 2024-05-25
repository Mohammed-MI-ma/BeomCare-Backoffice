import React from "react";
import { useTranslation } from "react-i18next";
import useFontFamily from "../../../Utilities/useFontFamily";
import { CustomDivider, LightLogoBeom } from "../../../Pages/LoginPage";

const RightContent = () => {
  const fontFamilyLight = useFontFamily("Light");
  const { t } = useTranslation();
  const styles = {
    container: {
      background: "var(--color-primary)",
      color: "var(--color-accent)",
      borderRadius: "30px",
      position: "absolute",
      right: "10px",
      boxShadow: "rgba(0, 0, 0, 0.6) -4px 0px 17px 0px",
    },
    content: {
      color: "var(--color-accent)",
      paddingLeft: "100px",
      paddingRight: "100px",
      bottom: "61px",
      fontSize: "11px",
      position: "absolute",
      fontFamily: fontFamilyLight,
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  };
  return (
    <main
      className={`lg:w-1/2 p-4 h-full items-center justify-center flex gap-1 flex-col shadow-lg`}
      style={styles.container}
    >
      <LightLogoBeom />
      <div style={styles.content}>
        <CustomDivider />
        <p>{t("beomSlogan")}</p>
      </div>
    </main>
  );
};

export default RightContent;
