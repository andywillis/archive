const sorter = (data, sortOrder) => {
  if (sortOrder === 'Name') {
    return data.sort((a, b) => {
      if (a[sortOrder] < b[sortOrder]) return -1;
      if (a[sortOrder] > b[sortOrder]) return 1;
      return 0;
    });
  }
  if (['Stars', 'UserRating'].indexOf(sortOrder) > -1) {
    return data.sort((a, b) => b[sortOrder] - a[sortOrder]);
  }
  if (sortOrder === 'MinCost') {
    return data.sort((a, b) => a[sortOrder] - b[sortOrder]);
  }
}

const sortData = (data, sortOrder) => {
  switch (sortOrder) {
    case 'SORT_BY_NAME': return sorter(data, 'Name');
    case 'SORT_BY_STARS': return sorter(data, 'Stars');
    case 'SORT_BY_USERRATING': return sorter(data, 'UserRating');
    case 'SORT_BY_MINCOST': return sorter(data, 'MinCost');
    default: return data;
  }
}

const getVisible = (items, pageLimit, pageNumber, sortOrder, starFilter) => {
  const filtered = items.filter((item) => starFilter.some((el) => el === item.Stars));
  return sortData(filtered, sortOrder).slice(pageNumber, pageLimit);
}

export { sorter, sortData, getVisible };
