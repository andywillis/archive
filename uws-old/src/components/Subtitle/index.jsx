// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Style
import './style.css';

/**
 * @function SubTitle
 * @param  {string} txt Component text
 * @return {jsx} Component
 */
const SubTitle = ({ txt }) => {
  return <div className="SubTitle">{txt}</div>;
};

export default SubTitle;

// Function proptypes
SubTitle.propTypes = {
  txt: PropTypes.string.isRequired
};
