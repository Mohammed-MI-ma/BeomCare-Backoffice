import React from "react";
import useFontFamily from "../../../Utilities/useFontFamily";

const FooterItem = ({ descriptionContent, header }) => {
  const fontFamilyBold = useFontFamily("SemiBold");

  const headerStyles = {
    fontFamily: fontFamilyBold,
    color: "var(--color-primary)",
    textTransform: "uppercase",
    marginBottom: "1rem",
  };
  return (
    <div className={`flex justify-start flex-col w-full`}>
      <div>
        <h1 style={headerStyles}>{header}</h1>
        {descriptionContent}
      </div>
    </div>
  );
};

export default FooterItem;
