import React from "react";

const AnimatesIcon = ({ icon, animation }) => {
  return (
    <div
      className={`animate__animated animate__${animation} animate__slower animate__infinite `}
    >
      {icon}
    </div>
  );
};

export default AnimatesIcon;
