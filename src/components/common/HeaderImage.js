import React from "react";
import PropTypes from "prop-types";

const HeaderImage = ({
  image,
  customStyle,
  containerStyle
}) => {
  return (
    <div className={"headerImage mx-auto mt-0 sm:-mt-2 pb-5" + " " + containerStyle}>
      <img src={image} className={customStyle} alt=""/>
    </div>
  );
};

HeaderImage.propTypes = {
  image:PropTypes.string,
  customStyle: PropTypes.string
}

export default HeaderImage;
