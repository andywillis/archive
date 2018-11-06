// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Style
import './style.css';

/**
 * @function Keyword
 * @param  {object} props Component properties
 * @return {jsx} Component
 */
const Keyword = ({ keyword }) => (
  <li className="Keyword">{keyword}</li>
);

export default Keyword;

// Function proptypes
Keyword.propTypes = {
  keyword: PropTypes.string.isRequired
};
