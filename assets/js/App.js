import DocumentTitle from 'react-document-title';
import React from 'react';
import reactMixin from 'react-mixin';
import { RouteHandler } from 'react-router';

import BaseComponent from './utils/BaseComponent';
import Footer from './components/Footer';
import locals from './utils/locals';
import { IntlMixin, FormattedNumber } from './shims/ReactIntl';

export default class App extends BaseComponent {
  render() {
    return (
      <DocumentTitle title={locals.name}>
        <div>
          <RouteHandler {...this.props} />
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
}

reactMixin.onClass(App, IntlMixin);
