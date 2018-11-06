// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Style
import './style.css';

/**
 * @function getTitle
 * @param  {number} id    Entry id
 * @param  {stringe} type  Entry type
 * @param  {string} title Entry title
 * @return {jsx} JSX
 */
function getTitle({ type, link, children }) {
  if (type === 'entry') {
    return <div className="Title" type={type}>{children}</div>;
  }
  return (
    <Link to={{ pathname: `/entry/${link}` }}>
      <div className="Title" type="list">{children}</div>
    </Link>
  );
}

/**
 * @function Title
 * @param  {string} type Title type
 * @param  {string} txt  Title text
 * @return {jsx} Component
 */
const Title = (props) => {
  return getTitle(props);
};

export default Title;

// Function proptypes
getTitle.propTypes = {
  type: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
};
