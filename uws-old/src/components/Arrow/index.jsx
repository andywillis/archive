// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Style
import './style.css';

/**
 * @function Arrow
 * @param  {object} props Component properties
 * @return {jsx} Component
 */
const Arrow = (props) => {

  const { disabled, type, location } = props;

  return (
    <div
      className={disabled ? 'Arrow' : 'Arrow enabled'}
      type={type}
      data-location={location}
    />
  );
};

export default Arrow;

// Function proptypes
Arrow.propTypes = {
  disabled: PropTypes.bool,
  type: PropTypes.string.isRequired,
  location: PropTypes.string
};
