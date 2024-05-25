import React from "react";
import PropTypes from "prop-types";
import useFontFamily from "../../../Utilities/useFontFamily";

//__styling
import style from "./membershipCard.module.css";

const MembershipCard = ({ step }) => {
  const fontFamilyExtraLight = useFontFamily("ExtraLight");

  return (
    <div
      className={`${style.membershipCard} shadow-lg rounded p-5 flex-col bg-white `}
    >
      <div>{step?.icon}</div>
      <div
        style={{
          fontSize: "var(--font-medium-size)",
          textAlign: "center",
          fontFamily: fontFamilyExtraLight,
          textTransform: "none",
        }}
      >
        {step?.description}
      </div>
    </div>
  );
};

MembershipCard.propTypes = {
  step: PropTypes.shape({
    id: PropTypes.number.isRequired,
    icon: PropTypes.element.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default MembershipCard;
