// Dependencies
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// React
import Header from '../Header';
import Footer from '../Footer';
import NoteList from '../../containers/NoteList';
import NotFound from '../NotFound';

// Style
import './style.css';

/**
 * @function App
 * @return {jsx} Component
 */
const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Switch>
          <Route exact path="/" component={NoteList} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
