import DocumentTitle from 'react-document-title';
import React, { Component } from 'react';
import { RouteHandler } from 'react-router';

import Footer from './components/Footer';
import locals from '../utils/locals';

export default class App extends Component {
  render() {
    return (
      <DocumentTitle title={locals.name}>
        <div>
          <RouteHandler/>
          <Footer/>
        </div>
      </DocumentTitle>
    );
  }
}
