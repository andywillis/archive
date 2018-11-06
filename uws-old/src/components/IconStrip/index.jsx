// Dependencies
import React from 'react';

// React
import Icon from '../Icon';

// Style
import './style.css';

function processAnchor(e) {
  const type = e.target.getAttribute('type');
  switch (type) {
    case 'mail': {
      const address = 'dev@awillis.fastmail.fm';
      const subject = 'Message from uws site';
      window.location.href = ['mailto:', address, '?', 'subject=', subject].join('');
      break;
    }
    case 'flickr': {
      window.open('https://www.flickr.com/photos/urbanwhaleshark/');
      break;
    }
    case 'twitter': {
      window.open('https://twitter.com/urbanwhaleshark');
      break;
    }
    default:
      break;
  }
}

const locations = [
  { id: 0, type: 'mail' },
  { id: 1, type: 'flickr' }
];

const IconStrip = () => {

  return (
    <div role="Group" className="IconStrip" onClick={processAnchor}>
      {locations.map((location) => {
        return <Icon key={location.id} type={location.type} />;
      })}
    </div>
  );

};

export default IconStrip;
