import React from 'react';
import { Link } from 'react-router-dom';

import Title from './Title';
import SubTitle from './SubTitle';
import Para from './Para';

const NotFound = () => {
  return (
    <div className="NotFound">
      <Title txt="404" />
      <SubTitle txt="Page not found" />
      <Link to="/">
        <Para txt={['Go back to the main page']} />
      </Link>
    </div>
  );
};

export default NotFound;
