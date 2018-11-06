import React from 'react';

import DataRow from './DataRow';
import SortBar from './SortBar';
import FilterBar from './FilterBar';

import '../style/DataTable.css';

const DataTable = (props) => {

  return (
    <div className="DataTable">
      <div className="TableHeader">
        <FilterBar filterStars={props.filterStars} />
        <SortBar current={props.sortOrder} click={props.setSortOrder} />
      </div>
      {props.items.map((item, i) => {
        return <DataRow key={i} item={item} />;
      })}
    </div>
  )

};

export default DataTable;
