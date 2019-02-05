import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

function PrivateRoute(props) {
  const { component: Component, accessToken, ...rest } = props;
  return (
    <Route
      {...rest}
      render={props => (
        accessToken
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )}
    />
  );
}

function mapStateToProps(state) {
  const { user: { accessToken } } = state;
  return { accessToken };
}

export default connect(mapStateToProps)(PrivateRoute);
