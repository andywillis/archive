import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import Header from '../Header';
import NotFound from '../NotFound';
import SignUpForm from '../SignUpForm';
import SignUpList from '../SignUpList';

import styles from './style';

class App extends Component {

  static getRoutes() {
    return (
      <Switch>
        <Route exact path="/" component={SignUpForm} />
        <Route exact path="/signup" component={SignUpForm} />
        <Route exact path="/list" component={SignUpList} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }

  componentDidUpdate() {
    this.node.scrollIntoView();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.app} ref={node => (this.node = node)}>
        <Header />
        {App.getRoutes(this.props)}
      </div>
    );
  }
}

const routedApp = withRouter(App);
export default withStyles(styles)(routedApp);

