import React, { Component } from 'react';

import StockList from './../StockList';
import Loader from './../Loader';

import style from './style.css';

class App extends Component {

  constructor() {
    super();
    this.state = null;
  }

  componentDidMount() {
    fetch('/api')
      .then(response => response.json())
      .then(data => this.setState(data));
  }

  render() {
    if (!this.state) return <Loader />;
    return (
      <section className={style.app}>
        <StockList stocklist={this.state} />
      </section>
    );
  }

}

export default App;
