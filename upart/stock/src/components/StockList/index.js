import React, { Component } from 'react';
import uuid from 'uuid/v1';

import Checkbox from './../Checkbox';

import style from './style.css';

function getItems(stock) {
  return stock.map((item) => {
    return (
      <tr key={uuid()}>
        <td className={style.product}>{item.product}</td>
        <td className={style.qty}>{item.qty}</td>
        <td className={style.replenishment}>{item.replenishment}</td>
      </tr>
    );
  });
}

function getStock(stock) {
  if (!stock.length) return 'No stock available at this location';
  return (
    <section className={style.stockTable}>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Replenishment</th>
          </tr>
        </thead>
        <tbody>
          {getItems(stock)}
        </tbody>
      </table>
    </section>
  );
}

function displayWarning() {
  return (
    <p className={style.warning}>
      Stock information hidden<br />
      Check the stock information checkbox at the top of the page
    </p>
  );
}

function getLocations(locations, showStock) {
  return locations.map((location) => {
    return (
      <section className={style.location} key={location.name}>
        <h1>Location {location.name}</h1>
        {showStock ? getStock(location.stock) : displayWarning()}
      </section>
    );
  });
}

function getLevels(stocklist, showStock) {
  return stocklist.row.map((level) => {
    return (
      <section className={style.level} key={level.level}>
        <h1>Level {level.level}</h1>
        {getLocations(level.locations, showStock)}
      </section>
    );
  });
}

class StockList extends Component {

  constructor(props) {
    super(props);
    this.state = { showStock: true };
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  handleCheckbox(checked) {
    this.setState({ showStock: checked });
  }

  render() {

    const { stocklist } = this.props;
    const { showStock } = this.state;

    return (
      <section className={style.stocklist}>
        <h1>{stocklist.label}</h1>
        <Checkbox
          id="showstock"
          size="large"
          onChange={this.handleCheckbox}
          labelText="Show stock information?"
        />
        {getLevels(stocklist, showStock)}
      </section>
    );
  }
}

export default StockList;
