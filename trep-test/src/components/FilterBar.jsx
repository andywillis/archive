import React from 'react';

import '../style/FilterBar.css';

const getStars = (stars) => {
  let arr = [];
  for (let i = 0, l = stars; i < l; i++) {
    arr.push(<div key={i} className="Star" />);
  }
  return arr;
}

const FilterBar = (props) => {
  return (
    <div className="FilterBar" onClick={props.filterStars}>
      <div className="FilterLabel">Filter</div>
      <div className="FilterBarGroup">
        <input type="checkbox" value="1" defaultChecked />
        {getStars(1)}
      </div>
      <div className="FilterBarGroup">
        <input type="checkbox" value="2" defaultChecked />
        {getStars(2)}
      </div>
      <div className="FilterBarGroup">
        <input type="checkbox" value="3" defaultChecked />
        {getStars(3)}
      </div>
      <div className="FilterBarGroup">
        <input type="checkbox" value="4" defaultChecked />
        {getStars(4)}
      </div>
      <div className="FilterBarGroup">
        <input type="checkbox" value="5" defaultChecked />
        {getStars(5)}
      </div>
    </div>
  )
}

export default FilterBar;
