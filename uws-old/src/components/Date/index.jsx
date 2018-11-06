// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Style
import './style.css';

/**
 * @function Date
 * @param  {string} date Component text
 * @return {jsx} Component
 */
const Date = ({ date }) => {
  return <div className="Date">{date}</div>;
};

export default Date;

// Function proptypes
Date.propTypes = {
  date: PropTypes.string.isRequired
};
