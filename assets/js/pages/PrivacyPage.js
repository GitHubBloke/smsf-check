import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { FormattedMessage as FM } from '../shims/ReactIntl';
import DocumentTitle from 'react-document-title';

import BaseComponent from '../utils/BaseComponent';
import locals from '../utils/locals';

export default class PrivacyPage extends BaseComponent {
  render() {
    return (
      <DocumentTitle title={`${locals.name} - ${this.formatMessage(this.getIntlMessage('privacy.title'))}`}>
        <Grid className='prepend-xs-2 append-xs-2 prepend-sm-3 append-sm-3'>
          <h2 className='text-primary text-center prepend-xs-none append-xs-1 append-sm-2'>
            <FM message={this.getIntlMessage('privacy.heading')} />
          </h2>

          <Row>
            <Col md={18} mdOffset={3}>
              <h4 className='text-primary'>Your privacy</h4>
              <p>SuperIQ Pty limited ("SuperIQ” has created this Privacy Policy to respect the confidentiality of information and the privacy of individuals. SuperIQ is bound by the Australian Privacy Principles contained in the Privacy Act 1988.</p>

              <p>SuperIQ’s Privacy Policy Statement will be reviewed from time to time to take account of new laws and technology, changes to our operations and practices and to make sure it remains appropriate to the changing environment. Any information we hold will be governed by the most current SuperIQ Privacy Policy Statement.</p>

              <p>This Privacy Policy does not apply to acts or practices of SuperIQ that are directly related to employee records of current or former employees.</p>

              <h4 className='text-primary prepend-xs-2'>What happens if you do not provide the information?</h4>
              <p>You may be adversely treated from a taxation point of view either from a trading point of view or when you commence to draw benefits from your superannuation fund.</p>
              <p>You may inadvertently make your superannuation fund non‐complying rendering it liable to non‐ concessionary tax rates and/or penalties.</p>
            </Col>
          </Row>
        </Grid>
      </DocumentTitle>
    );
  }
}
