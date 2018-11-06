// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// React
import Entry from '../Entry';
import ArrowStrip from '../ArrowStrip';

// Lib
import {
  removeScrollListeners,
  addScrollListeners,
  checkOnComponentMount
} from '../../lib/wrangleImage';

/**
 * @function EntryList
 * @param  {object} props Component properties
 * @return {jsx} Component
 */
class EntryList extends Component {

  static buildArrowStrip(entry, links, totalEntries) {
    return (
      <ArrowStrip
        entry={entry}
        links={links}
        totalEntries={totalEntries}
      />
    );
  }

  static buildEntry(entry, filter) {
    return (
      <Entry
        key={entry.id}
        id={entry.id}
        link={entry.link}
        type={filter.type}
        title={entry.title}
        date={entry.date}
        body={entry.body}
        tags={entry.tags}
      />
    );
  }

  static buildContainer(entry, links, totalEntries, filter) {
    const arrowStrip = EntryList.buildArrowStrip(entry, links, totalEntries);
    return (
      <div>
        {arrowStrip}
        {EntryList.buildEntry(entry, filter)}
        {arrowStrip}
      </div>
    );
  }

  componentDidMount() {
    addScrollListeners();
  }

  componentWillUnmount() {
    removeScrollListeners();
  }

  buildEntryList() {
    const { entries, links, filter, totalEntries } = this.props;
    if (filter.type === 'entry') {
      return EntryList.buildContainer(entries[0], links, totalEntries, filter);
    }
    return (
      <div>
        {entries.map((entry) => {
          return EntryList.buildEntry(entry, filter);
        })}
      </div>
    );
  }

  render() {
    const entryList = this.buildEntryList();
    checkOnComponentMount();
    return <div className="EntryList">{entryList}</div>;
  }
}

export default EntryList;

// Function proptypes
EntryList.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.any).isRequired,
  links: PropTypes.arrayOf(PropTypes.string).isRequired,
  filter: PropTypes.objectOf(PropTypes.string).isRequired,
  totalEntries: PropTypes.number.isRequired
};
