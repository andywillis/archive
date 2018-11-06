// Dependencies
import { connect } from 'react-redux';

// React
import Journal from '../../components/Journal';

/**
 * @function filterData
 * @param  {array} entries    Entries
 * @param  {object} filter    Filter object
 * @param  {number} pageLimit  Page limit
 * @param  {number} pageNumber Page number
 * @return {array} Entries
 */
function filterData(entries, filter, pageLimit, pageNumber) {
  switch (filter.type) {
    case 'entry':
      return entries.filter((entry) => {
        return entry.link === filter.value;
      });
    case 'tag':
      return entries.filter((entry) => {
        return entry.tags.map((tag) => {
          return tag.txt;
        }).indexOf(filter.value) > -1;
      });
    case 'page':
    default: {
      const start = (pageNumber - 1) * pageLimit;
      const end = start + pageLimit;
      return entries.slice(start, end);
    }
  }
}

const mapStateToProps = (state, ownProps) => {

  const { entries, pageLimit, links } = state.journal;
  const { type, value } = ownProps.match.params;

  const pageNumber = type === 'page' ? Number(value) : 1;
  const filter = { type: type || 'page', value: value || 'date' };
  const filteredEntries = filterData(entries, filter, pageLimit, pageNumber);
  const totalEntries = entries.length;
  const totalFilteredEntries = filter.type === 'tag' ? filteredEntries.length : totalEntries;

  return {
    entries: filteredEntries,
    totalEntries: totalFilteredEntries,
    links,
    pageLimit,
    filter,
    pageNumber
  };
};

export default connect(mapStateToProps)(Journal);
