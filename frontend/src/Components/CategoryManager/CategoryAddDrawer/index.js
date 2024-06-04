import React from "react";
import DrawerGeneric from "../../Utilities/DrawerGeneric";
import useFontFamily from "../../../Utilities/useFontFamily";
import CenteredFlexComponent from "../../Utilities/CenteredFlexComponent";
import CategoryDetails from "../CategoryDetails";

const CategoryAddDrawer = ({ title, open, onClose }) => {
  const fontFamilyBold = useFontFamily("SemiBold");

  return (
    <DrawerGeneric
      width={"500px"}
      onClose={onClose}
      titre={
        <CenteredFlexComponent
          style={{
            justifyContent: "left",
            gap: "1rem",
          }}
        >
          <h1 style={{ fontFamily: fontFamilyBold }}>{title}</h1>
        </CenteredFlexComponent>
      }
      open={open}
    >
      <div
        className={
          "flex-col w-full gap-10 overflow-auto justify-start bordered shadow-md"
        }
        style={{
          borderRadius: "var(--border-radius-large)",
        }}
      >
        <CategoryDetails onSave={null} flag={1} />
      </div>
    </DrawerGeneric>
  );
};

export default CategoryAddDrawer;
