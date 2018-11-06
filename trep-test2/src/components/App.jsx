import React from 'react';

import Header from './Header';
import DataTableContainer from '../containers/DataTableContainer';
import Footer from './Footer';

import '../style/App.css';

const App = () => {

  return (
    <div className="App">
      <Header />
      <DataTableContainer />
      <Footer />
    </div>
  )

}

export default App;
