import { connect } from 'react-redux';

import App from '../../components/App';

function sortByTitle(a, b) {
  return a.title.toLowerCase() > b.title.toLowerCase();
}

function sortByTimeStamp(a, b) {
  const dateA = new Date(a.timestamp);
  const dateB = new Date(b.timestamp);
  if (dateA > dateB) return 1;
  if (dateA < dateB) return -1;
  return 0;
}

function mapStateToProps({ ideas: state }) {
  const { order, ideas } = state;
  switch (order) {
    case 'title': ideas.sort(sortByTitle); break;
    case 'timestamp': ideas.sort(sortByTimeStamp); break;
  }
  return { order, ideas };
}


export default connect(mapStateToProps)(App);
