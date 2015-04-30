import React from 'react';
import DocumentTitle from 'react-document-title';

import { requireAuth } from '../../utils/AuthUtils';
import BaseComponent from '../../utils/BaseComponent';
import locals from '../../utils/locals';

class MembersPage extends BaseComponent {
  render() {
    return (
      <DocumentTitle title={`${locals.name} - Member Details`}>
      </DocumentTitle>
    );
  }
}

export default requireAuth(MembersPage);
