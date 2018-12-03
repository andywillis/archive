// Dependencies
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Link from '../Link';

import styles from './style';

const links = [
  { id: 1, pathname: '/signup', text: 'Sign up' },
  { id: 2, pathname: '/list', text: 'View sign-up list' }
];

const Header = (props) => {
  const { classes } = props;
  return (
    <div className={classes.header}>
      <nav>
        <ul className={classes.links}>
          {links.map(({ id, ...rest }) => <Link key={id} details={rest} />)}
        </ul>
      </nav>
    </div>
  );
};

export default withStyles(styles)(Header);
