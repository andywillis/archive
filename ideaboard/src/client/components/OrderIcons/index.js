import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeOrder } from '../../redux/actions';

import style from './style.css';

export class OrderIcons extends Component {

  constructor(props) {
    super(props);
    this.state = { selected: props.order };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(order) {
    const { changeOrder } = this.props;
    changeOrder(order);
    this.setState({ selected: order });
  }

  render() {
    const { selected } = this.state;
    return (
      <div className={style.ordering}>
        <ul>
          <li>
            <button
              className={selected === 'title' ? style.selected : undefined}
              type="button"
              onKeyUp={() => this.handleClick('title')}
              onClick={() => this.handleClick('title')}
            >A-Z
            </button>
          </li>
          <li>
            <button
              className={selected === 'timestamp' ? style.selected : undefined}
              type="button"
              onKeyUp={() => this.handleClick('timestamp')}
              onClick={() => this.handleClick('timestamp')}
            ><span role="img" aria-label="Order by timestamp">&#x1f550;</span>
            </button>
          </li>
        </ul>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return {
    changeOrder: order => dispatch(changeOrder(order))
  };
}

export default connect(null, mapDispatchToProps)(OrderIcons);
