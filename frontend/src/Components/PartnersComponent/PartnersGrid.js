// src/components/PartnersGrid.js

import React from "react";
import PartnerCard from "./PartnerCard";
import PropTypes from "prop-types";

const PartnersGrid = ({ partners }) => (
  <div
    className="grid grid-cols-2 md:grid-cols-4 gap-5 p-5"
    style={{ border: "1px solid #5B5B5B" }}
  >
    {partners.map((partner) => (
      <PartnerCard key={partner.id} partner={partner} />
    ))}
  </div>
);

PartnersGrid.propTypes = {
  partners: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PartnersGrid;
