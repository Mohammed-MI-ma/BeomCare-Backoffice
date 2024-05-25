import React from "react";
import PropTypes from "prop-types";

const ResponsiveIcon = ({ alt, images }) => {
  const {
    src: defaultImage,
    width,
    height,
  } = images.find((img) => img.default) || images[0];
  const srcSet = images.map((img) => `${img.src} ${img.width}w`).join(", ");
  const sizes = images
    .map((img) => `(max-width: ${img.width}px) ${img.width * 2}px`)
    .join(", ");

  return (
    <img
      src={defaultImage} // default image
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

ResponsiveIcon.propTypes = {
  alt: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number,
      default: PropTypes.bool,
    })
  ).isRequired,
};

export default ResponsiveIcon;
