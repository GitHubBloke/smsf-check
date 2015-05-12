import React from 'react';
import { Grid } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';

import BaseComponent from '../../utils/BaseComponent';
import locals from '../../utils/locals';

export default class MembersPage extends BaseComponent {
  render() {
    return (
      <DocumentTitle title={`${locals.name} - Member Details`}>
        <div>
          <div className='bg-gray clearfix'>
            <Grid className='prepend-xs-1 append-xs-1'>
              <h2 className='prepend-xs-tiny'>
                <span className='label label-default'>1/10</span>
                &nbsp;
                Your SMSF Member Details
              </h2>
            </Grid>
          </div>
          <div>
            <Grid className='text-center prepend-xs-3 append-xs-3'>
              <p>Member details form will go here</p>
            </Grid>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}
