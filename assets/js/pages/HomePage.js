import React from 'react';
import { Col, Grid, Row, Well } from 'react-bootstrap';
import { FormattedMessage as FM } from '../shims/ReactIntl';
import { Link, RouteHandler } from 'react-router';

import BaseComponent from '../utils/BaseComponent';
import locals from '../utils/locals';

export default class HomePage extends BaseComponent {
  render() {
    return (
      <Grid className='text-center prepend-xs-2 append-xs-3'>
        <h1><Link to='app'>{locals.name}</Link></h1>
        <h3>
          <FM message={this.getIntlMessage('home.intro')}
            name={<strong>{locals.name}</strong>}
            brand={locals.brand} />
        </h3>

        <Row className='prepend-xs-2'>
          <Col md={4} className='append-xs-2'>
            <img src='http://placehold.it/100x100' width='100' />
            <h4><FM message={this.getIntlMessage('home.features.safeData')} /></h4>
          </Col>
          <Col md={4} className='append-xs-2'>
            <img src='http://placehold.it/100x100' width='100' />
            <h4><FM message={this.getIntlMessage('home.features.greatAdvice')} /></h4>
          </Col>
          <Col md={4} className='append-xs-2'>
            <img src='http://placehold.it/100x100' width='100' />
            <h4><FM message={this.getIntlMessage('home.features.compare')} /></h4>
          </Col>
        </Row>

        <Well bsSize='large' className='text-center'>
          <RouteHandler {...this.props}/>
        </Well>
      </Grid>
    );
  }
}
