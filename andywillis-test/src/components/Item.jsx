import React, { Component } from 'react';
import ItemImage from './ItemImage';
import ItemDescription from './ItemDescription';

import '../style/Item.css';

class Item extends Component {

  constructor(props) {
    super(props);
    this.getItem = this.getItem.bind(this);
  }

  getItem(items, code) {
    return items.find((item) => {
      return item.code === code;
    });
  }

  render() {
    const { items, code } = this.props;
    return (
      <div className="Item">
        <ItemImage details={this.getItem(items, code)} />
        <ItemDescription details={this.getItem(items, code)} />
      </div>
    )
  }
}

export default Item;
