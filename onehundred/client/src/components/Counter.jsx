import React from 'react';
import '../style/Counter.css';

const Counter = ({ count }) => {

  return (
    <div className="counter">{ count }</div>
  );

};

export default Counter;
