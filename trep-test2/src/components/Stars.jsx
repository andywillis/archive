import React from 'react';

import '../style/Stars.css';

const getStars = (stars) => {
  let arr = [];
  if (stars) {
    for (let i = 0, l = stars; i < l; i++) {
      arr.push(<div key={i} className="Star" />);
    }
  } else {
    arr.push(<div key={0} className="NoStar">No stars</div>);
  }
  return arr;
}

const Stars = (props) => {
  return (
    <div className="Stars">
      {getStars(props.stars)}
    </div>
  );
}

export default Stars;
