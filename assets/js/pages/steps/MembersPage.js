import React from 'react';
import DocumentTitle from 'react-document-title';

import BaseComponent from '../../utils/BaseComponent';
import locals from '../../utils/locals';

export default class MembersPage extends BaseComponent {
  render() {
    return (
      <DocumentTitle title={`${locals.name} - Member Details`}>
        <div>
          <div className='bg-gray clearfix'>
            <div className='container prepend-xs-1 append-xs-1'>
              <h2 className='prepend-xs-tiny'>
                <span className='label label-default'>1/10</span>
                &nbsp;
                Your SMSF Member Details
              </h2>
            </div>
          </div>
          <div>
            <div className='container text-center prepend-xs-3 append-xs-3'>
              <p>Member details form will go here</p>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}
