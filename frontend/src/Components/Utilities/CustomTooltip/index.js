import { Tooltip } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import useFontFamily from "../../../Utilities/useFontFamily";

const CustomTooltip = ({ title, children }) => {
  const { t } = useTranslation();
  const fontFamilyExtraLight = useFontFamily("ExtraLight");

  // Ensure title is correctly translated
  const translatedTitle = t(title);

  return (
    <Tooltip
      title={
        <p
          style={{
            fontFamily: fontFamilyExtraLight,
          }}
        >
          {translatedTitle}
        </p>
      }
    >
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
