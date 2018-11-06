// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// React
import Byline from '../Byline';
import Paginator from '../Paginator';
import EntryList from '../EntryList';

// Style
import './style.css';

const createByline = ({ type, value }) => {
  return (
    <Byline
      type={type !== 'page' ? type : 'date'}
      value={type !== 'page' ? value : ''}
    />
  );
};

const getPaginator = (totalEntries, pageNumber, pageLimit) => {
  if (totalEntries > pageLimit) {
    return (
      <Paginator
        totalEntries={totalEntries}
        pageNumber={pageNumber}
        pageLimit={pageLimit}
      />
    );
  }
};

const buildJournal = (props) => {

  const {
    entries,
    links,
    filter,
    totalEntries,
    pageLimit,
    pageNumber
  } = props;

  const isEntry = filter.type === 'entry';

  return (
    <div>
      {!isEntry && createByline(filter)}
      {!isEntry && getPaginator(totalEntries, pageNumber, pageLimit)}
      <EntryList
        entries={entries}
        links={links}
        filter={filter}
        totalEntries={totalEntries}
      />
      {!isEntry && getPaginator(totalEntries, pageNumber, pageLimit)}
    </div>
  );

};

/**
 * @function Journal
 * @param  {object} props Component properties
 * @return {jsx} Component
 */
const Journal = (props) => {
  return (
    <div className="Journal">
      {buildJournal(props)}
    </div>
  );
};

export default Journal;

// Function proptypes
createByline.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

buildJournal.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.any).isRequired,
  links: PropTypes.arrayOf(PropTypes.any).isRequired,
  filter: PropTypes.string.isRequired,
  totalEntries: PropTypes.number.isRequired,
  pageLimit: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired
};
