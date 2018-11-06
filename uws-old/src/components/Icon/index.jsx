// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Style
import './style.css';

/**
 * @function Icon
 * @param  {object} props Component properties
 * @return {jsx} Component
 */
const Icon = ({ type, clicked }) => {
  if (type === 'avatar') {
    return (
      <div
        role="Img"
        className="Icon"
        type={type}
        onClick={clicked}
      />
    );
  }
  return (
    <div
      className="Icon"
      type={type}
    />
  );
};

export default Icon;

// Function proptypes
Icon.propTypes = {
  type: PropTypes.string.isRequired,
  clicked: PropTypes.func
};
