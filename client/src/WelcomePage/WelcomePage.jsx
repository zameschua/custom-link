import React, { Component } from 'react';
import NavBar from './NavBar';
import Banner from './Banner';

class WelcomePage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Banner />
      </div>
    );
  }
}

export default WelcomePage;
