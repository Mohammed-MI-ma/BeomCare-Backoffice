// src/components/PartnerCard.js

import React from "react";
import PropTypes from "prop-types";

const PartnerCard = ({ partner }) => (
  <div className="flex justify-center items-center">
    <img src={partner.logo} alt={partner.name} className="w-[140px] h-auto" />
  </div>
);

PartnerCard.propTypes = {
  partner: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
  }).isRequired,
};

export default PartnerCard;
