import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from './style';

const NotFound = (props) => {
  const { classes } = props;
  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography component="h2" variant="h5">404</Typography>
        <Typography component="h5" variant="h6">
          <Link to="/">Return home.</Link>
        </Typography>
      </Paper>
    </main>
  );
};

export default withStyles(styles)(NotFound);
