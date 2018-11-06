import React from 'react';

import '../style/ItemDescription.css';

const ItemDescription = (props) => {
  const details = props.details;
  return (
    <div className="ItemDescription">
      <div className="designer">{details.designerData.name}</div>
      <div className="itemName">{details.name}</div>
      <div className="price">
        <span className="price">
          {details.priceData.formattedPriceWithoutDecimals}
        </span>
        {details.priceData.formattedWasPrice &&
          <span className="wasPrice">Was: {details.priceData.formattedWasPrice}</span>
        }
      </div>
    </div>
  )
}

export default ItemDescription;
