import React from 'react';

import { SortOrder } from '../actions/items';

import '../style/SortBar.css';

const getClass = (key, current) => {
  return key === current ? 'SortBarType active' : 'SortBarType';
}

const SortBar = (props) => {
  return (
    <div className="SortBar">
      <div className="SortLabel">Sort</div>
      {Object.keys(SortOrder).map((key, i) => {
        return (
          <div
            key={i}
            className={getClass(key, props.current)}
            data-type={key}
            onClick={props.click}
          >{key.split('_')[2].toLowerCase()}
          </div>
        )
      })}
    </div>
  )
}

export default SortBar;
