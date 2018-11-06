import React, { Component } from 'react';
import Spinner from './Spinner';
import Grid from './Grid';
import Item from './Item';

import '../style/Container.css';

class Container extends Component {

  constructor(props) {
    super(props);
    this.state = { items: [] };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData('/json');
  }

  fetchData(endpoint) {
    fetch(endpoint)
      .then(res => res.json())
      .then(items => this.setState({ items }))
  }

  render() {
    const pathArr = this.props.match.url.split('/');
    const isItemPath = pathArr[1] === '' ? false : true;
    if (this.state.items.length) {
      if (isItemPath) {
        return <Item items={this.state.items} code={pathArr[2]} />
      }
      return <Grid items={this.state.items} />
    }
    return <Spinner />
  }

};

export default Container;
