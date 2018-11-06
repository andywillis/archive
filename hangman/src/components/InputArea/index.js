import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Keyboard from '../Keyboard';
import Word from '../Word';
import Reset from '../Reset';
import Spinner from '../Spinner';

import './style.css';

function InputArea({ word, fetchLoading }) {
  if (fetchLoading || !word.length) return <Spinner />;
  return (
    <section className="inputarea">
      <Word />
      <Keyboard />
      <Reset />
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    word: state.hangman.word,
    fetchLoading: state.fetchLoading
  };
};

export default connect(mapStateToProps)(InputArea);

InputArea.propTypes = {
  fetchLoading: PropTypes.bool.isRequired,
  word: PropTypes.string.isRequired
};
