// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// React
import Title from '../Title';
import SubTitle from '../Subtitle';
import EntryBody from '../EntryBody';

/**
 * @function NotFound
 * @return {jsx} Component
 */
const NotFound = () => {
  return (
    <div className="NotFound">
      <Title txt="404" />
      <SubTitle txt="Page not found" />
      <Link to="/">
        <EntryBody parts={['Go back to the main page']} />
      </Link>
    </div>
  );
};

export default NotFound;
