// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Style
import './style.css';

/**
 * @function PageNumber
 * @param  {object} props Component properties
 * @return {jsx} Component
 */
const PageNumber = (props) => {

  const { status, number } = props;
  const className = ['PageNumber', status].join(' ');

  return (
    <Link to={{ pathname: `/page/${number}` }}>
      <div
        className={className}
        data-number={number}
      >{number}
      </div>
    </Link>
  );

};

export default PageNumber;

// Function proptypes
PageNumber.propTypes = {
  status: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired
};
