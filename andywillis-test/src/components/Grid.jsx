import React, { Component } from 'react';
import Gridbox from './Gridbox';
import ColStrip from './ColStrip';
import { getImageName } from '../lib/image.js';

import '../style/Grid.css';

class Grid extends Component {

  constructor(props) {
    super(props);
    this.state = { cols: 'threeCols' }
    this.changeCols = this.changeCols.bind(this);
  }

  changeCols(e) {
    const icon = e.target.getAttribute('type');
    switch (icon) {
      case 'twoCols': this.setState({ cols: 'twoCols' }); break;
      case 'threeCols': this.setState({ cols: 'threeCols' }); break;
      default: break;
    }
  }

  render() {
    const items = this.props.items;
    return (
      <div className="Grid">
        <ColStrip cols={this.state.cols} process={this.changeCols} />
        {items.map((item, i) => {
          return (
            <Gridbox
              key={i}
              id={i}
              cols={this.state.cols}
              name={item.name}
              designer={item.designerData.name}
              code={item.code}
              alt={item.name}
              price={item.priceData.formattedPriceWithoutDecimals}
              src={getImageName(item.thumbnail)}
            />
          )
        })}
      </div>
    )
  }

};

export default Grid;
