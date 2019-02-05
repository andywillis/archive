import React, { Component } from 'react';
import { Redirect, Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import List from '../../routes/List';
import View from '../../routes/View';
import Add from '../../routes/Add';
import LogIn from '../../routes/LogIn';

import PrivateRoute from '../PrivateRoute';

import style from './style.css';

class App extends Component {

  static chooseRoute() {
    return (
      <Switch>
        <Route exact path="/login" component={LogIn} />
        <PrivateRoute exact path="/project/list" component={List} />
        <PrivateRoute exact path="/project/view/:id" component={View} />
        <PrivateRoute exact path="/project/add" component={Add} />
        <Redirect to="/project/list" />
      </Switch>
    );
  }

  render() {

    return (
      <div className={style.app}>
        <header>OH API Test</header>
        <main>{App.chooseRoute()}</main>
      </div>
    );

  }

}

function mapStateToProps(state, otherProps) {

  const {
    user: { accessToken },
    app: { projects }
  } = state;

  return { accessToken, projects, otherProps };

}

export default withRouter(connect(mapStateToProps)(App));
