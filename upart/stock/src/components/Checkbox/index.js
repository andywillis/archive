import React, { Component } from 'react';

import style from './style.css';

class Checkbox extends Component {

  constructor(props) {
    super(props);
    this.state = { checked: true };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({ checked: !this.state.checked }, () => {
      this.props.onChange(this.state.checked);
    });
  }

  render() {

    const { id, size, labelText } = this.props;

    return (
      <label className={style[size]} htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          onChange={this.handleChange}
          checked={this.state.checked && 'checked'}
        />
        {labelText}
      </label>
    );
  }

}

export default Checkbox;
