import React from 'react';
import DocumentTitle from 'react-document-title';

import BaseComponent from '../../utils/BaseComponent';
import locals from '../../utils/locals';

export default class NotFoundPage extends BaseComponent {
  render() {
    return (
      <DocumentTitle title={`${locals.name} - 404 Not Found`}>
        <div className='container text-center prepend-xs-2 append-xs-3'>
          <h1 className='append-xs-3'>404</h1>
          <h3 className='append-xs-2'>Sorry, the page you tried cannot be found.</h3>
          <p className='text-muted'>
            You may have typed the address incorrectly or you may have used an outdated link.
            <br/>
            If you found a broken link from another site or from our site, please contact us.
          </p>
        </div>
      </DocumentTitle>
    );
  }
}
