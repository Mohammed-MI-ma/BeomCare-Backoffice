import React from "react";

const CenteredFlexComponent = ({ children, className, style }) => {
  return (
    <div
      className={`flex justify-center items-center ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default CenteredFlexComponent;
