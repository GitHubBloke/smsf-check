import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { FormattedMessage as FM } from '../shims/ReactIntl';
import DocumentTitle from 'react-document-title';

import BaseComponent from '../utils/BaseComponent';
import locals from '../utils/locals';

export default class TermsPage extends BaseComponent {
  render() {
    return (
      <DocumentTitle title={`${locals.name} - ${this.formatMessage(this.getIntlMessage('terms.title'))}`}>
        <Grid className='prepend-xs-2 append-xs-2 prepend-sm-3 append-sm-3'>
          <h2 className='text-primary text-center prepend-xs-none append-xs-1 append-sm-2'>
            <FM message={this.getIntlMessage('terms.heading')} />
          </h2>

          <Row>
            <Col md={18} mdOffset={3}>
              <h4 className='text-primary'>SuperIQ website terms and conditions</h4>
              <p>The SuperIQ.com.au website ("this website") is owned by SuperIQ Pty Ltd (ABN 27 147 165 104). It is operated by SuperIQ Pty Ltd. Your access to this website is subject to these terms and conditions, the SuperIQ.com.au Privacy Statement, notices, disclaimers and any other terms and conditions or other statements contained on this website (referred to collectively as "Terms and Conditions"). By using this website you agree to be subject to the Terms and Conditions.</p>

              <h4 className='text-primary prepend-xs-2'>Access for persons from within Australia only</h4>
              <p>This website is for only for the use of persons accessing the website from within Australia. The products and services described in this website are only available to persons accessing the website from within Australia.</p>

              <h4 className='text-primary prepend-xs-2'>No investment advice provided to you</h4>
              <p>Unless otherwise expressly stated to the contrary, this website is not designed for the purpose of providing personal financial or investment advice. Information provided does not take into account your particular investment objectives, financial situation or investment needs.</p>
              <p>You should assess whether the information on this website is appropriate to your particular investment objectives, financial situation and investment needs. You should do this before making an investment decision on the basis of the information on this website. You can either make this assessment yourself or seek the assistance of any adviser.
              Unless otherwise expressly stated to the contrary, the information on this website is not a recommendation to invest in any investments, securities or financial products offered by SuperIQ or any associate of SuperIQ.</p>
            </Col>
          </Row>
        </Grid>
      </DocumentTitle>
    );
  }
}
