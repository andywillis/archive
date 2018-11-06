import React from 'react';
import { Link } from 'react-router-dom';

import '../style/Gridbox.css';

const Gridbox = (props) => {
  const gridboxClass = 'Gridbox ' + props.cols;
  return (
    <div className={gridboxClass}>
      <Link key={props.id} to={{ pathname: '/item/' + props.code }}>
        <img alt={props.alt} src={props.src} />
        <p className="designer">{props.designer}</p>
        <p>{props.name}</p>
        <p>{props.price}</p>
      </Link>
    </div>
  );
}

export default Gridbox;
