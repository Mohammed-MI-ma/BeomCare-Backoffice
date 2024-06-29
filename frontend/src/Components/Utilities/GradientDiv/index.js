import React from "react";

const GradientDiv = ({ position, direction, borderRadius }) => {
  const gradientStyle = {
    position: "absolute",
    width: "100px",
    height: "60px",
    background: `linear-gradient(to ${direction}, rgb(79 97 127 / 41%), transparent)`,
    ...borderRadius,
  };

  return <div style={gradientStyle} className={position}></div>;
};

export default GradientDiv;
