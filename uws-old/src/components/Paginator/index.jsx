// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// React
import PageNumber from '../PageNumber';

// Style
import './style.css';

function getNumbers(props) {
  const { totalEntries, pageLimit, pageNumber } = props;
  const lower = Math.floor(totalEntries / pageLimit);
  const mod = totalEntries % pageLimit;
  const pageTotal = mod === 0 ? Math.round(lower) : Math.round(lower + 1);
  const arr = [];
  for (let i = 1, l = pageTotal; i <= l; i++) {
    arr.push(
      <PageNumber
        status={i === pageNumber ? 'active' : 'inactive'}
        key={i}
        number={i}
      />
    );
  }
  return arr;
}

/**
 * @function Paginator
 * @param  {object}  Component properties
 * @return {jsx} Component
 */
const Paginator = (props) => {
  return (
    <div className="Paginator">
      {getNumbers(props)}
    </div>
  );
};

export default Paginator;

// Function proptypes
Paginator.propTypes = {
  totalEntries: PropTypes.number.isRequired,
  pageLimit: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired
};
