import React from 'react';

import Ratings from './Ratings';
import Costing from './Costing';

import '../style/Details.css';

const Details = (props) => {
  return (
    <div className="Details">
      <div className="Text">
        <div className="Name">{props.name}</div>
        <div className="Location">{props.location}</div>
        <Ratings
          stars={props.stars}
          userRating={props.userRating}
          userRatingTitle={props.userRatingTitle}
          userRatingCount={props.userRatingCount}
        />
      </div>
      <Costing mincost={props.minCost} />
    </div>
  );
}

export default Details;
