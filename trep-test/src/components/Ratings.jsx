import React from 'react';

import Stars from './Stars';

import '../style/Ratings.css';

const Ratings = (props) => {
  return (
    <div className="Ratings">
      <Stars stars={props.stars} />
      <div className="RatingsText">
        <div className="RatingAvg">{props.userRating}</div>
        <div className="RatingTitle">{props.userRatingTitle}</div>
        <div className="RatingCount">({props.userRatingCount} reviews)</div>
      </div>
    </div>
  );
}

export default Ratings;
