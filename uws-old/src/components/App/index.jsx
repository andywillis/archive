// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// React
import Header from '../Header';
import JournalContainer from '../../containers/Journal';
import Footer from '../Footer';
import NotFound from '../NotFound';
import Spinner from '../Spinner';

// Redux
import { fetchData } from '../../redux/actions/journal';

// Style
import './style.css';

/**
 * @function App
 * @return {jsx} Component
 */
class App extends Component {

  static getRoutes({ fetchLoading, entries }) {
    if (fetchLoading || !entries.length) return <Spinner />;
    return (
      <Switch>
        <Route exact path="/" component={JournalContainer} />
        <Route exact path="/:type/:value" component={JournalContainer} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }

  componentDidMount() {
    this.props.fetchData('/entries');
  }

  componentDidUpdate() {
    this.node.scrollIntoView();
  }

  render() {
    return (
      <div className="App" ref={node => (this.node = node)}>
        <Header />
        {App.getRoutes(this.props)}
        <Footer />
      </div>
    );
  }
}

// Connect
const mapStateToProps = (state) => {
  return {
    entries: state.journal.entries,
    fetchLoading: state.fetchLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: url => dispatch(fetchData(url))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));

// Proptpypes
App.propTypes = {
  fetchData: PropTypes.func.isRequired
};
