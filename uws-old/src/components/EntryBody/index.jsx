// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// React
import Subtitle from '../Subtitle';
import Para from '../Para';
import Blockquote from '../Blockquote';

/**
 * @function Paras
 * @param  {object} parts Component properties
 * @return {jsx} Component
 */
const EntryBody = ({ body }) => {
  return (
    <div className="EntryBody">
      {body.map((part) => {
        switch (part.type) {
          case 'blockquote':
            return <Blockquote key={part.id} html={part.txt} />;
          case 'h2':
            return <Subtitle key={part.id} txt={part.txt} />;
          default:
            return <Para key={part.id} html={part.txt} />;
        }
      })}
    </div>
  );
};

export default EntryBody;

// Function proptypes
EntryBody.propTypes = {
  body: PropTypes.arrayOf(PropTypes.object).isRequired
};
