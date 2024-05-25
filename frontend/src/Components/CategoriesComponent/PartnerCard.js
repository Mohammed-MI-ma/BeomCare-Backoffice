// src/components/PartnerCard.js

import React from "react";
import PropTypes from "prop-types";

const CategoryCard = ({ category }) => (
  <div className="flex justify-center items-center">
    <img src={category.logo} alt={category.name} className="w-[140px] h-auto" />
  </div>
);

CategoryCard.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryCard;
