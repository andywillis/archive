// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';

// Style
import './style.css';


/**
 * @function Blockquote
 * @param  {object} props Component properties
 * @return {jsx} Component
 */
const Blockquote = ({ html }) => {
  return (
    <div className="Blockquote">{renderHTML(html)}</div>
  );
};

export default Blockquote;

// Function proptypes
Blockquote.propTypes = {
  html: PropTypes.string.isRequired
};
