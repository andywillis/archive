// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @function NotFound
 * @return {jsx} Component
 */
const NotFound = () => {
  return (
    <div className="NotFound">
      <h1>404</h1>
      <Link to="/">
        <p>Return to main page</p>
      </Link>
    </div>
  );
};

export default NotFound;
