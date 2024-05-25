import React from "react";
import { CustomDivider } from "../../Pages/LoginPage";
import useFontFamily from "../../Utilities/useFontFamily";
import { useTranslation } from "react-i18next";
import HorizontalScroll from "../HorizontalScroll";

const CategoriesComponent = () => {
  const fontFamilyLight = useFontFamily("Light");
  const { t } = useTranslation();

  return (
    <section
      className="bg-cover relative mb-5 flex items-center justify-center flex-col-reverse lg:flex-row items-center w-full"
      style={{ width: "99vw" }}
    >
      <div
        className="container p-5 flex flex-col items-center text-center"
        style={{
          textTransform: "uppercase",
          marginTop: "70px",
          marginBottom: "70px",
        }}
      >
        <CustomDivider style={{ marginBottom: "10px" }} />
        <h1
          style={{
            fontFamily: fontFamilyLight,
            fontSize: "20px",
            letterSpacing: "0.13em",
            marginBottom: "35px",
          }}
        >
          {t("Découvrez nos professionnels")}
        </h1>
        <HorizontalScroll />
      </div>
    </section>
  );
};

export default CategoriesComponent;
