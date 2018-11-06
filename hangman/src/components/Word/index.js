import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateCompleted } from '../../redux/actions';

import './style.css';

class Word extends Component {

  static isComplete(word, matches) {
    return word.split('').every(el => matches.indexOf(el) > -1);
  }

  componentWillReceiveProps({ word, matches, updateCompleted }) {
    const complete = Word.isComplete(word, matches);
    if (complete) updateCompleted();
  }

  render() {
    const { completed, matches, word, strikes } = this.props;
    const className = `slot ${completed && 'complete'}`;
    return (
      <section className="word">
        {word.split('').map((el, i) => {
          const fill = matches.includes(el) || strikes >= 8 ? el : '_';
          return (
            <span
              key={i}
              className={className}
              data-letter={word[i]}
            >{fill}
            </span>
          );
        })}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { word, matches, completed, strikes } = state.hangman;

  return {
    word,
    matches,
    completed,
    strikes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCompleted: () => dispatch(updateCompleted())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Word);

Word.propTypes = {
  word: PropTypes.string.isRequired,
  matches: PropTypes.arrayOf(String).isRequired,
  updateCompleted: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  strikes: PropTypes.number.isRequired
};
