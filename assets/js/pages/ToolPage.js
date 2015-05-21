import React from 'react';
import { Col, Grid, Label, Row } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';
import { RouteHandler } from 'react-router';
import utils from 'keystone-utils';

import { requireAuth } from '../utils/AuthUtils';
import BaseComponent from '../utils/BaseComponent';
import locals from '../utils/locals';
import router from '../router';
import steps from '../constants/Steps';

class ToolPage extends BaseComponent {
  render() {
    const step = router.getCurrentPathname().substring(1);
    const stepNumber = steps.indexOf(step) + 1;
    const title = this.formatMessage(this.getIntlMessage(`${utils.keyToProperty(step)}.longTitle`));

    return (
      <DocumentTitle title={`${locals.name} - ${title}`}>
        <div className='survey'>
          <div className='survey__header'>
            <Grid className='prepend-xs-1 append-xs-1'>
              <Row>
                <Col md={24}>
                  <h3 className='text-primary prepend-xs-none append-xs-none'>
                    <Label bsStyle='primary' className='pull-left'>{stepNumber}/{steps.length}</Label>
                    &nbsp;&nbsp;
                    {title}
                  </h3>
                </Col>
              </Row>
            </Grid>
          </div>
          <RouteHandler {...this.props}/>
        </div>
      </DocumentTitle>
    );
  }
}

export default requireAuth(ToolPage);
