// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// React
import Arrow from '../Arrow';

// Style
import './style.css';

function displayArrows({ entry, links, totalEntries }) {
  const arrows = [];
  const pos = totalEntries - entry.id;
  arrows.push({ key: 'l', type: 'arrowleft', location: links[pos - 1], disabled: entry.id === totalEntries });
  arrows.push({ key: 'r', type: 'arrowright', location: links[pos + 1], disabled: entry.id === 1 });
  return arrows;
}

const ArrowStrip = (props) => {

  return (
    <div className="ArrowStrip">
      {displayArrows(props).map((arrow) => {
        if (arrow.disabled) {
          return (
            <span key={arrow.key}>
              <Arrow type={arrow.type} disabled={arrow.disabled} />
            </span>
          );
        }
        return (
          <Link key={arrow.key} to={{ pathname: `/entry/${arrow.location}` }}>
            <Arrow type={arrow.type} disabled={arrow.disabled} />
          </Link>
        );
      })}
      <Link key="home" to={{ pathname: '/' }}>
        <Arrow type={'Home'} />
      </Link>
    </div>
  );

};

export default ArrowStrip;
