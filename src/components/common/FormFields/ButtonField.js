import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ButtonField = ({
  id,
  name,
  value,
  onClick,
  icon,
  iconPositionRight,
  customStyle,
  global
}) => {
  return (
    <div>
      {icon &&
        <span style={iconPositionRight ? {order: 1} : {order: 0}} className="flex items-center px-3">
          <img src={icon} className="" alt="" />
        </span>
      }
      <button
        id={id}
        name={name}
        onClick={onClick}
        className={customStyle}
        disabled={global.buttonLoading}
      >
        {global.buttonLoading &&
          <i className="fa fa-circle-notch fa-spin mr-2" viewBox="0 0 20 20"></i>
        }
        <span>
          {value}
        </span>
      </button>
    </div>
  )
}

ButtonField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  customStyle: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string,
  iconPositionRight: PropTypes.bool
}

ButtonField.propTypes = {
  global: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  global: state.global
});

export default connect(mapStateToProps)(ButtonField);
