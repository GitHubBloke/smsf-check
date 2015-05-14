import DocumentTitle from 'react-document-title';
import React from 'react';
import reactMixin from 'react-mixin';
import { RouteHandler } from 'react-router';

import BaseComponent from './utils/BaseComponent';
import Header from './components/Header';
import Footer from './components/Footer';
import locals from './utils/locals';

export default class App extends BaseComponent {
  render() {
    return (
      <DocumentTitle title={locals.name}>
        <div>
          <Header />
          <div className='body'>
            <RouteHandler {...this.props} />
          </div>
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
}
