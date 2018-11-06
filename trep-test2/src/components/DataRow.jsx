import React from 'react';

import Details from './Details';

import '../style/DataRow.css';

const DataRow = ({ item }) => {
  return (
    <div className="DataRow">
      <div className="Thumbnail"><img alt="" src={item.ImageUrl} /></div>
      <Details
        name={item.Name}
        location={item.Location}
        stars={item.Stars}
        userRating={item.UserRating}
        userRatingTitle={item.UserRatingTitle}
        userRatingCount={item.UserRatingCount}
        minCost={item.MinCost}
      />
    </div>
  );
}

export default DataRow;
