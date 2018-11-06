import React from 'react';
import ColIcon from './ColIcon';

import '../style/ColStrip.css';

const colTypes = ['twoCols', 'threeCols'];

const ColStrip = (props) => {

  return (
    <div className="ColStrip" onClick={props.process}>
      {colTypes.map((colType, key) => {
          return (
            <ColIcon
              key={key}
              active={colType === props.cols ? true : false}
              cols={props.cols}
              type={colType}
            />
          )
        })
      }
    </div>
  );

};

export default ColStrip;
