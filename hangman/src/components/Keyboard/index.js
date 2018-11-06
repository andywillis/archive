import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Letter from '../Letter';

import './style.css';

function buildLetterArray() {
  const arr = [];
  for (let i = 65; i <= 90; i++) {
    arr.push(String.fromCharCode(i));
  }
  return arr;
}

function checkInWord(word, letter) {
  return word.includes(letter);
}

function Keyboard({ word }) {
  return (
    <section className="keyboard">
      {buildLetterArray().map((letter, i) => {
        return (
          <Letter
            key={i}
            letter={letter}
            match={checkInWord(word, letter)}
          />
        );
      })}
    </section>
  );
}

const mapStateToProps = (state) => {
  const { word } = state.hangman;
  return {
    word
  };
};

export default connect(mapStateToProps)(Keyboard);

Keyboard.propTypes = {
  word: PropTypes.string.isRequired
};
