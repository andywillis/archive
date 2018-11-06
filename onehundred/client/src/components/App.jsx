import React, { Component } from 'react';
import Form from './Form';
import '../style/App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header"><h1>ONE HUNDRED WORDS</h1></div>
        <Form />
      </div>
    )
  }
}

export default App;
