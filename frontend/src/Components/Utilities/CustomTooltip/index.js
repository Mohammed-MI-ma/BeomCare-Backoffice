import { Tooltip } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import useFontFamily from "../../../Utilities/useFontFamily";

const CustomTooltip = ({ title, children }) => {
  const { t } = useTranslation();
  const fontFamilyExtraLight = useFontFamily("ExtraLight");

  return (
    <Tooltip
      title={
        <p
          style={{
            fontFamily: fontFamilyExtraLight,
          }}
        >
          {t(title)}
        </p>
      }
    >
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
