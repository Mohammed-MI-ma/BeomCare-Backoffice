import { Drawer } from "antd";
import React from "react";
import useFontFamily from "../../../Utilities/useFontFamily";

const DrawerGeneric = ({ titre, open, onClose, children, style, width }) => {
  const fontFamilyLight = useFontFamily("Light");

  return (
    <Drawer
      style={{ ...style, overflow: "none" }}
      title={<p style={{ fontFamily: fontFamilyLight }}>{titre}</p>}
      onClose={onClose}
      open={open}
      width={width || "500px"}
    >
      {children}
    </Drawer>
  );
};

export default DrawerGeneric;
