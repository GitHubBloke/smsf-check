import React from 'react';
import { Col, Grid, Row, Well } from 'react-bootstrap';
import { RouteHandler } from 'react-router';

import BaseComponent from '../utils/BaseComponent';
import locals from '../utils/locals';

export default class HomePage extends BaseComponent {
  render() {
    return (
      <Grid className='text-center prepend-xs-2 append-xs-3'>
        <h1>{locals.name}</h1>
        <h3>
          Welcome to the {locals.brand} {locals.name}.
          Compare your current fund to thousands of others
          SMSFs to see how your fund stacks up.
        </h3>

        <Row className='prepend-xs-2'>
          <Col md={4} className='append-xs-2'>
            <img src='http://placehold.it/100x100' width='100' />
            <h4>Know your data is safe with bank-level security.</h4>
          </Col>
          <Col md={4} className='append-xs-2'>
            <img src='http://placehold.it/100x100' width='100' />
            <h4>Provide as much or as little information as you like and still see results.</h4>
          </Col>
          <Col md={4} className='append-xs-2'>
            <img src='http://placehold.it/100x100' width='100' />
            <h4>Compare your fund to over 11,000 funds from ATO and {locals.brand} databases.</h4>
          </Col>
        </Row>

        <Well bsSize='large' className='text-center'>
          <RouteHandler {...this.props}/>
        </Well>
      </Grid>
    );
  }
}
