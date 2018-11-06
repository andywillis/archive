import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchData } from '../../redux/actions';

import Header from '../Header';
import InputArea from '../InputArea';
import Canvas from '../Canvas';

import './style.css';

class App extends Component {

  static randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  componentDidMount() {
    this.fetchWord();
  }

  componentWillReceiveProps({ word, fetchLoading }) {
    if (!fetchLoading && !word.length) this.fetchWord();
  }

  fetchWord() {
    const len = App.randomNum(3, 9);
    const url = `http://setgetgo.com/randomword/get.php?len=${len}`;
    this.props.fetchData(url);
  }

  render() {
    return (
      <section className="hangman">
        <Header />
        <section className="board">
          <InputArea />
          <Canvas />
        </section>
      </section>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    word: state.hangman.word,
    fetchLoading: state.fetchLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: url => dispatch(fetchData(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
