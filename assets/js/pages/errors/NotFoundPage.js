import React from 'react';
import { Grid } from 'react-bootstrap';
import { FormattedMessage as FM } from '../../shims/ReactIntl';
import DocumentTitle from 'react-document-title';

import BaseComponent from '../../utils/BaseComponent';
import locals from '../../utils/locals';

export default class NotFoundPage extends BaseComponent {
  render() {
    return (
      <DocumentTitle title={`${locals.name} - ${this.formatMessage(this.getIntlMessage('notFound.title'))}`}>
        <Grid className='text-center prepend-xs-3 append-xs-3'>
          <h1 className='text-primary prepend-xs-none append-xs-2'>404</h1>
          <h3 className='append-xs-2'>
            <FM message={this.getIntlMessage('notFound.heading')} />
          </h3>
          <p className='text-muted'>
            <FM message={this.getIntlMessage('notFound.incorrect')} />
            <br/>
            <FM message={this.getIntlMessage('notFound.contactUs')} />
          </p>
        </Grid>
      </DocumentTitle>
    );
  }
}
