import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVisible } from '../lib/wrangleData';
import { itemsFetchData, setSortOrder, setStarFilter } from '../actions/items';

import DataTable from '../components/DataTable';
import Spinner from '../components/Spinner';

class DataTableContainer extends Component {

  constructor(props) {
    super(props);
    this.setSortOrder = this.setSortOrder.bind(this);
    this.setStarFilter = this.setStarFilter.bind(this);
  }

  componentDidMount() {
    this.props.fetchData('/json');
  }

  setStarFilter() {
    const query = '.FilterBar .FilterBarGroup input[type="checkbox"]:checked';
    const checkedStars = document.querySelectorAll(query);
    const arr = [...checkedStars].map((input) => parseInt(input.value, 10));
    this.props.setStarFilter(arr);
  }

  setSortOrder(e) {
    const type = e.target.getAttribute('data-type');
    this.props.setSortOrder(type);
  }

  render() {
    if (this.props.isLoading) return <Spinner />;
    return (
      <div className="DataTableContainer">
        <DataTable
          items={this.props.items}
          filterStars={this.setStarFilter}
          sortOrder={this.props.sortOrder}
          setSortOrder={this.setSortOrder}
        />
      </div>
    )
  }

};

const mapStateToProps = (state) => {

  const { items, pageLimit, pageNumber, sortOrder, starFilter } = state.items;

  return {
    items: getVisible(items, pageLimit, pageNumber, sortOrder, starFilter),
    sortOrder,
    starFilter,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading
  };

};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(itemsFetchData(url)),
    setSortOrder: (sortOrder) => dispatch(setSortOrder(sortOrder)),
    setStarFilter: (filter) => dispatch(setStarFilter(filter))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataTableContainer);
