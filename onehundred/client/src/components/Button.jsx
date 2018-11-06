import React from 'react';
import '../style/Button.css';

const Button = ({ type }) => {

  return (
    <div className="button">
      <input className={ type } type={ type } />
    </div>
  );

};

export default Button;
