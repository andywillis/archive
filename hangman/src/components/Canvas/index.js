import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import bodyParts from './bodyParts';
import './style.css';

function getParts(strikes) {
  return [
    'frame', 'noose', 'head', 'body',
    'leftarm', 'rightarm', 'leftleg', 'rightleg'
  ].slice(0, strikes);
}

class Canvas extends Component {

  constructor() {
    super();
    this.updateCanvas = this.updateCanvas.bind(this);
  }

  componentWillReceiveProps({ strikes }) {
    this.updateCanvas(strikes);
  }

  updateCanvas(strikes) {
    const { canvas } = this.refs;
    const ctx = canvas.getContext('2d');
    getParts(strikes).forEach((part) => {
      bodyParts[part](ctx);
    });
    if (strikes === 0) ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (strikes === 8) canvas.classList.add('fail');
  }

  render() {
    return (
      <section className="canvasSection" role="presentation">
        <canvas id="canvas" ref="canvas" />
      </section>
    );
  }

}

const mapStateToProps = (state) => {
  const { strikes } = state.hangman;
  return {
    strikes
  };
};

export default connect(mapStateToProps)(Canvas);

Canvas.propTypes = {
  strikes: PropTypes.number.isRequired
};

