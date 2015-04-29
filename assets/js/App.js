import DocumentTitle from 'react-document-title';
import React, { Component } from 'react';
import { RouteHandler } from 'react-router';

import Footer from './components/Footer';

export default class App extends Component {
  render() {
    return (
      <DocumentTitle title='SMSF Health Check'>
        <div>
          <RouteHandler/>
          <Footer/>
        </div>
      </DocumentTitle>
    );
  }
}
