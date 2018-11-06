import React from 'react';

import '../style/ColIcon.css';

const ColIcon = (props) => {
  const className = 'ColIcon ' + (props.active ? 'active': '');
  return <div className={className} type={props.type} />;
};

export default ColIcon;
