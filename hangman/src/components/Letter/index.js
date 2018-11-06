import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addMatch, incrementStrikes } from '../../redux/actions';

import './style.css';

class Letter extends Component {

  constructor(props) {
    super();
    this.initalState = {
      letter: props.letter,
      match: props.match,
      clicked: false,
      found: null
    };
    this.state = this.initalState;
    this.checkInput = this.checkInput.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentWillReceiveProps({ matches, strikes }) {
    if (!matches.length && strikes === 0) this.setState(this.initalState);
  }

  checkInput() {
    this.setState({ clicked: true });
    if (this.state.match) {
      this.props.addMatch(this.state.letter);
      this.setState({ found: true });
    } else {
      this.props.incrementStrikes();
      this.setState({ found: false });
    }
  }

  handleKeyUp(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      this.checkInput();
    }
  }

  render() {

    const letterState = this.state.clicked ? 'clicked' : 'unclicked';
    const found = this.state.found ? 'found' : 'notfound';
    const className = `letter ${found} ${letterState}`;

    return (
      <div
        role="button"
        tabIndex="0"
        id={this.props.letter}
        className={className}
        onKeyUp={this.handleKeyUp}
        onClick={this.checkInput}
      >{this.props.letter}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { matches, strikes } = state.hangman;
  return {
    matches,
    strikes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMatch: letter => dispatch(addMatch(letter)),
    incrementStrikes: () => dispatch(incrementStrikes())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Letter);

Letter.propTypes = {
  letter: PropTypes.string.isRequired,
  match: PropTypes.bool.isRequired,
  addMatch: PropTypes.func.isRequired,
  incrementStrikes: PropTypes.func.isRequired
};
