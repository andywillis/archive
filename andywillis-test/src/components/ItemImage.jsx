import React from 'react';
import { getImageName } from '../lib/image.js';

import '../style/ItemImage.css';

const ItemImage = (props) => {
  return (
    <div className="ItemImage">
      <img src={getImageName(props.details.thumbnail)} />
    </div>
  )
}

export default ItemImage;
