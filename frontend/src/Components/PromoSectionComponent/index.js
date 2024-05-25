import React from "react";
import FullScreenVideo from "../FullScreenVideo";
import CenteredFlexComponent from "../Utilities/CenteredFlexComponent";
import { Button } from "antd";
import useFontFamily from "../../Utilities/useFontFamily";
import { useTranslation } from "react-i18next";
import style from "./promoSectionComponent.module.css";

const PromoSectionComponent = () => {
  const { t } = useTranslation();
  const fontFamilyLight = useFontFamily("Light");

  return (
    <section
      className="bg-cover relative mb-5 flex items-center justify-center flex-col-reverse lg:flex-row items-center w-full"
      style={{
        width: "99vw",
        margin: "0px",
        background: "black",
        color: "white",
        height: "300px",
        position: "relative",
      }}
    >
      <div
        id="searchEngine"
        className="shadow-netflix p-4 rounded-lg text-center absolute"
        style={{
          boxShadow:
            "0 3px 10px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)",
        }}
      >
        <h1> {t("Beom Care | Tableau de bord")}</h1>
        <p
          style={{
            fontFamily: fontFamilyLight,
            fontSize: "small",
            marginBottom: "20px",
          }}
        >
          Sécurisé avec pare-feu | JWT
        </p>
      </div>
    </section>
  );
};

export default PromoSectionComponent;
