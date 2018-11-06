import React from 'react';
import { Link } from 'react-router-dom';

import '../style/Header.css';

const Header = () => {

  return (
    <div className="Header">
      <Link key={0} to={{ pathname: '/' }}>
        MATCHESFASHION.COM
      </Link>
    </div>
  );

};

export default Header;
