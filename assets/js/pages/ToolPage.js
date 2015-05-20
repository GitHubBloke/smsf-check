import React from 'react';
import { Col, Grid, ProgressBar, Row } from 'react-bootstrap';
import { RouteHandler } from 'react-router';

import { requireAuth } from '../utils/AuthUtils';
import BaseComponent from '../utils/BaseComponent';
import locals from '../utils/locals';

class ToolPage extends BaseComponent {
  render() {
    return (
      <div>
        <div>
          <Grid>
            <Row>
              <Col md={24}>
              </Col>
            </Row>
          </Grid>
        </div>
        <RouteHandler {...this.props}/>
      </div>
    );
  }
}

export default requireAuth(ToolPage);
