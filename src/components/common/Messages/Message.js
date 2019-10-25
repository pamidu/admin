
import React from "react";
import PropTypes from "prop-types";

const Message = ({
  type,
  msgStyle,
  containerStyle,
  icon,
  message
}) => {
  return (
    <>
      <div className={type + " " + "flex flex-row px-2 py-2 mb-8 items-center" + " " + containerStyle}>
        {icon &&
          <div className="flex items-center px-3">
            <img src={icon} className="ml-2 mr-2" alt="" />
          </div>
        }
          <div className={icon? "pl-4 text-base " + msgStyle : "text-base " + msgStyle }>{message}</div>
      </div>
    </>
  );
};

Message.propTypes = {
  type: PropTypes.string,
  msgStyle: PropTypes.string,
  containerStyle: PropTypes.string,
  icon: PropTypes.string,
  message: PropTypes.string
}

export default Message;
