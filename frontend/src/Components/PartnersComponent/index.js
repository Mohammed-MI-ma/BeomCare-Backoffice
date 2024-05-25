import React from "react";
import vogue from "../../../src/Assets/images/vogue.png";
import { CustomDivider } from "../../Pages/LoginPage";
import useFontFamily from "../../Utilities/useFontFamily";
import { useTranslation } from "react-i18next";
import PartnersGrid from "./PartnersGrid";
const partners = [
  {
    id: 1,
    name: "Partner 1",
    logo: vogue,
  },
  { id: 2, name: "Partner 2", logo: vogue },
  { id: 3, name: "Partner 3", logo: vogue },
  { id: 4, name: "Partner 4", logo: vogue },
];

const PartnersComponent = () => {
  const fontFamilyLight = useFontFamily("Light");
  const { t } = useTranslation();

  return (
    <section
      className="bg-cover relative mb-5 flex items-center justify-center flex-col-reverse lg:flex-row items-center w-full"
      style={{
        width: "99vw",
        background: "black",
        color: "white",
      }}
    >
      <div
        className="container p-5 flex flex-col items-center"
        style={{
          maxWidth: "700px",
          textTransform: "uppercase",
          marginTop: "70px",
          marginBottom: "70px",
          textAlign: "center",
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
          {t("il nous ont fait confiance")}
        </h1>
        <PartnersGrid partners={partners} />
      </div>
    </section>
  );
};

export default PartnersComponent;
