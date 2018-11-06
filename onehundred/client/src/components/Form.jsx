import React, { Component } from 'react';
import Counter from './Counter';
import Button from './Button';
import '../style/Form.css';

class Form extends Component {

  state = { count: 100 };

  changeTextArea = function (e) {
    const count = 100 - e.target.value.match(/\S+/g).length;
    this.setState({ count });
  };

  render () {
    return (
      <div className="form">
        <textarea onChange={this.changeTextArea.bind(this)} />
        <Counter count={this.state.count} />
        <Button type="submit" />
      </div>
    );
  };

};

export default Form;
