import React from "react";
import PropTypes from "prop-types";

const TextFieldInput = ({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  disabled,
  customStyle,
  containerStyle,
  icon,
  iconPositionRight,
  error,
  maxLength,
  readonly,
  focus,
  blur,
  changeDefaultStyles
}) => {
  focus = () => {
    document.getElementById(id+"-container").classList.replace("border-si-grey-light", "border-si-grey-dark");

  }

  blur = () => {
    document.getElementById(id+"-container").classList.replace("border-si-grey-dark", "border-si-grey-light");
  }

  return (
    <>
      <div id={id+"-container"} className={!changeDefaultStyles ? (error ? containerStyle + " customBorder border-si-grey-light rounded-lg textInputError" : containerStyle + " customBorder border-si-grey-light rounded-lg") : containerStyle}>
        {icon &&
          <span style={iconPositionRight ? {order: 1} : {order: 0}} className="flex items-center px-3">
            <img src={icon} className="" alt="" />
          </span>
        }
        <input
          id={id}
          type={type}
          className={!changeDefaultStyles ? ("px-2 py-4 customInput focus:outline-none " + customStyle) : customStyle}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          maxLength={maxLength}
          readOnly={readonly}
          onFocus={() => focus()}
          onBlur={() => blur()}
        />
      </div>
      {error && <div className="flexChild text-sm text-error py-2">{error}</div>}
    </>
  );
};

TextFieldInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  customStyle: PropTypes.string,
  containerStyle: PropTypes.string,
  icon: PropTypes.string,
  maxLength: PropTypes.string,
  error: PropTypes.string,
  iconPositionRight: PropTypes.bool,
  readonly: PropTypes.bool,
  focus: PropTypes.func,
  blur: PropTypes.func,
  changeDefaultStyles: PropTypes.bool,
}

export default TextFieldInput;
