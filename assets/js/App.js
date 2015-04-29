import React, { Component } from 'react';
import { RouteHandler } from 'react-router';

import Footer from './components/Footer';

export default class App extends Component {
  render() {
    return (
      <div>
        <RouteHandler/>
        <Footer/>
      </div>
    );
  }
}
