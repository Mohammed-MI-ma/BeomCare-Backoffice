import React from "react";
import DrawerGeneric from "../Utilities/DrawerGeneric";

const AddCategoryComponent = ({ isOpenDrawer, onCloseHandler, children }) => {
  return (
    <DrawerGeneric
      titre={"Espace Ajout Catégorie BeomCare"}
      open={isOpenDrawer}
      onClose={() => onCloseHandler(false)}
    >
      {children}
    </DrawerGeneric>
  );
};

export default AddCategoryComponent;
