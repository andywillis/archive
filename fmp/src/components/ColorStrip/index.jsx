// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import './style.css';

/**
 * @function ColorStrip
 * @param  {object} props Component properties
 * @return {jsx} Component
 */
class ColorStrip extends Component {

  constructor(props) {
    super(props);
    this.state = { color: props.defaultColor };
    this.handleSwatchChange = this.handleSwatchChange.bind(this);
  }

  handleSwatchChange(e) {
    const color = e.target.id;
    this.setState({ color });
    this.props.handleSwatchChange(color);
  }

  render() {
    return (
      <div className="ColorStrip">
        <div className="ColorItem">
          <input
            type="radio"
            name="color"
            id="blue"
            checked={this.state.color === 'blue'}
            onChange={this.handleSwatchChange}
          />
          <label htmlFor="blue" className="blue" />
        </div>
        <div className="ColorItem">
          <input
            type="radio"
            name="color"
            id="green"
            checked={this.state.color === 'green'}
            onChange={this.handleSwatchChange}
          />
          <label htmlFor="green" className="green" />
        </div>
        <div className="ColorItem">
          <input
            type="radio"
            name="color"
            id="red"
            checked={this.state.color === 'red'}
            onChange={this.handleSwatchChange}
          />
          <label htmlFor="red" className="red" />
        </div>
      </div>
    );
  }
}

export default ColorStrip;

ColorStrip.defaultProps = {
  defaultColor: 'blue'
};

ColorStrip.propTypes = {
  defaultColor: PropTypes.string,
  handleSwatchChange: PropTypes.func.isRequired
};
