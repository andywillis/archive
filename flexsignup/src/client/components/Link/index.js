import React from 'react';
import { Link as DomLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from './style';

const Link = ({ classes, details }) => {
  const { pathname, text } = details;
  return (
    <li className={classes.link}>
      <DomLink className={classes.anchor} to={{ pathname }}>
        {text}
      </DomLink>
    </li>
  );
};

export default withStyles(styles)(Link);
