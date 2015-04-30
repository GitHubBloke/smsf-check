import React from 'react';
import DocumentTitle from 'react-document-title';

import BaseComponent from '../../utils/BaseComponent';
import locals from '../../utils/locals';

export default class MembersPage extends BaseComponent {
  render() {
    return (
      <DocumentTitle title={`${locals.name} - Member Details`}>
      </DocumentTitle>
    );
  }
}
