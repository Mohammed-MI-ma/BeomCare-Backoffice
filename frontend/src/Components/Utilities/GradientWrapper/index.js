import React from "react";
import GradientDiv from "../GradientDiv";

const GradientWrapper = () => {
  return (
    <>
      <GradientDiv
        position="top-0 left-0"
        direction="right"
        borderRadius={{
          borderTopLeftRadius: "50px",
          borderBottomLeftRadius: "50px",
        }}
      />
      <GradientDiv
        position="top-0 right-0"
        direction="left"
        borderRadius={{
          borderTopRightRadius: "50px",
          borderBottomRightRadius: "50px",
        }}
      />
    </>
  );
};

export default GradientWrapper;
