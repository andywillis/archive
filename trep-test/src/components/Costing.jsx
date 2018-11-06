import React from 'react';

import '../style/Costing.css';

const Costing = (props) => {
  return (
    <div className="Costing">
      <div>Rooms from</div>
      <div className="MinCost">£{props.mincost}</div>
    </div>
  );
}

export default Costing;
