import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Datetime from "react-datetime";

import "./date-time.css";

const CalendarFieldInput = ({
  id,
  name,
  value,
  placeholder,
  onChange,
  dateValidation,
  containerStyle,
  icon,
  iconPositionRight,
  valid,
  readonly,
  error,
  changeDefaultStyles,
  auth,
  focus,
  blur,
}) => {
  valid = (current) => {
    let today = Datetime.moment.utc();
    if (current.isAfter(today)) {
      return true
    }
  }

  focus = () => {
    document.getElementById(id + "-container").classList.replace("border-si-grey-light", "border-si-grey-dark");

  }

  blur = () => {
    document.getElementById(id + "-container").classList.replace("border-si-grey-dark", "border-si-grey-light");
  }

  return (
    <>
      <div id={id + "-container"} className={!changeDefaultStyles ? (error ? containerStyle + " customBorder border-si-grey-light rounded-lg textInputError" : containerStyle + " customBorder border-si-grey-light rounded-lg") : containerStyle}>
        {icon &&
          <span style={iconPositionRight ? { order: 1 } : { order: 0 }} className="flex items-center px-3">
            <img src={icon} className="" alt="" />
          </span>
        }
        <Datetime
          id={id}
          name={name}
          value={value}
          dateFormat="MM/DD/Y"
          timeFormat={false}
          closeOnSelect={true}
          closeOnTab={true}
          className="w-full"
          inputProps={{ id: id, name: name, placeholder: placeholder, disabled: readonly, className: 'px-2 py-4 customInput focus:outline-none w-full' }}
          isValidDate={valid}
          onChange={ (e) => {
              const newDate = {
                  target: {
                      value: new Intl.DateTimeFormat('en-US', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit'
                        }).format(e),
                      name: id,
                  },
              };

              onChange(newDate);
          } }
          onFocus={() => focus()}
          onBlur={() => blur()}
        />
      </div>
      {error && <div className="text-sm text-error py-2">{error }</div>}
    </>
  )
}

CalendarFieldInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  dateValidation: PropTypes.string,
  customStyle: PropTypes.string,
  containerStyle: PropTypes.string,
  icon: PropTypes.string,
  error: PropTypes.string,
  iconPositionRight: PropTypes.bool,
  valid: PropTypes.bool,
  readonly: PropTypes.bool,
  focus: PropTypes.func,
  blur: PropTypes.func,
  changeDefaultStyles: PropTypes.bool,
}

CalendarFieldInput.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(CalendarFieldInput);
