import React from 'react';

import '../style/Title.css';

const Title = (props) => {
  return (
    <div className="Title" type={props.type}>{props.txt}</div>
  );
};

export default Title;
