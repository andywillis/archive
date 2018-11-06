// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// React
import EntryHeader from '../EntryHeader';
import EntryBody from '../EntryBody';
import EntryFooter from '../EntryFooter';

// Style
import './style.css';

/**
 * @function Entry
 * @param  {object} props Component properties
 * @return {jsx} Component
 */
const Entry = (props) => {

  const { id, title, link, date, type, body, tags } = props;

  return (
    <div className="Entry" id={id}>
      <EntryHeader
        id={id}
        title={title}
        link={link}
        type={type}
        date={date}
      />
      <EntryBody body={body} />
      <EntryFooter tags={tags} />
    </div>
  );

};

export default Entry;

// Function proptypes
Entry.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  body: PropTypes.arrayOf(PropTypes.object).isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  link: PropTypes.string.isRequired
};
