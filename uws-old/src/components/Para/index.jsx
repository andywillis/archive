// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';

// Style
import './style.css';

/**
 * @function Para
 * @param  {object} props Component properties
 * @return {jsx} Component
 */
const Para = ({ html }) => {
  return (
    <div className="Para">{renderHTML(html)}</div>
  );
};

export default Para;

// Function proptypes
Para.propTypes = {
  html: PropTypes.string.isRequired
};

