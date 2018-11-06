import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import Container from './Container';
import Footer from './Footer';
import NotFound from './NotFound';

import '../style/App.css';

const App = () => {

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Container} />
        <Route exact path="/item/:id" component={Container} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </div>
  )

}

export default App;
