import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          Input EVs (0-252), evens only.
        </p>
        <button>{'Add #' + (this.state.items.length + 1)}</button>
      </div>
    );
  }
}

function evCalc {

}

export default App;
