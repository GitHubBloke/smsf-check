import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';

import BaseComponent from '../../utils/BaseComponent';
import locals from '../../utils/locals';

export default class MembersPage extends BaseComponent {
  render() {
    return (
      <DocumentTitle title={`${locals.name} - ${this.formatMessage(this.getIntlMessage('members.title'))}`}>
        <div>
          <Grid className='prepend-xs-2 append-xs-2'>
            <Row>
              <Col md={16}>
              </Col>
              <Col md={8}>
              </Col>
            </Row>
          </Grid>
        </div>
      </DocumentTitle>
    );
  }
}
