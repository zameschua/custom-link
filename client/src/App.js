import React, { Component } from 'react';
import WelcomePage from './WelcomePage/WelcomePage';

class App extends Component {
  render() {
    return (
      <div className="App"
        style={{height: "100vh"}}>
        <WelcomePage />
      </div>
    );
  }
}

export default App;
