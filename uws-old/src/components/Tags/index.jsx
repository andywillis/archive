// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// React
import Tag from '../Tag';

// Style
import './style.css';

/**
 * @function Tags
 * @param  {type} tags Components
 * @return {type} {description}
 */
const Tags = ({ tags }) => {
  return (
    <div className="Tags">
      <ul>
        {tags.map((tag) => {
          return <Tag key={tag.id} txt={tag.txt} />;
        })}
      </ul>
    </div>
  );
};

export default Tags;

// Function proptypes
Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object).isRequired
};
