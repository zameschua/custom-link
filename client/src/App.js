import React, { Component } from 'react';
import { Button } from 'reactstrap';

import NavBar from './Welcome/NavBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
      </div>
    );
  }
}

export default App;
