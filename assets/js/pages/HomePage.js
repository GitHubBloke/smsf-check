import React from 'react';
import { Button, Col, Grid, Navbar, Row, Well } from 'react-bootstrap';
import { FormattedMessage as FM } from '../shims/ReactIntl';
import { Link, RouteHandler } from 'react-router';

import BaseComponent from '../utils/BaseComponent';
import locals from '../utils/locals';

export default class HomePage extends BaseComponent {
  render() {
    return (
      <div>
        <Navbar className='append-xs-none' brand={<span><span className='logo'>{locals.name}</span></span>} staticTop>
        </Navbar>
        <div className='hero text-inverse'>
          <Grid>
            <Row className='text-center clearfix'>
              <Col md={10} mdOffset={3} className='prepend-xs-5 append-xs-5'>
                <h1 className='prepend-xs-tiny'>{locals.name}</h1>
                <h3 className='text-normal'>
                  <FM message={this.getIntlMessage('home.intro')}
                    name={locals.name}
                    brand={locals.brand} />
                </h3>
                <div className='prepend-xs-1'>
                  <Button className='btn-clear btn--wide' bsSize='large'>Sign up</Button>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>

        <Grid>
          <Row className='text-center prepend-xs-3'>
            <Col md={4} mdOffset={2} className='append-xs-3'>
              <img src='http://placehold.it/100x100' width='100' />
              <div className='prepend-xs-2'><FM message={this.getIntlMessage('home.features.safeData')} /></div>
            </Col>
            <Col md={4} className='append-xs-3'>
              <img src='http://placehold.it/100x100' width='100' />
              <div className='prepend-xs-2'><FM message={this.getIntlMessage('home.features.greatAdvice')} /></div>
            </Col>
            <Col md={4} className='append-xs-3'>
              <img src='http://placehold.it/100x100' width='100' />
              <div className='prepend-xs-2'><FM message={this.getIntlMessage('home.features.compare')} /></div>
            </Col>
          </Row>

          <Row className=''>
            <Col md={12} mdOffset={2} className='append-xs-2'>
              <Well bsSize='large'>
                <RouteHandler {...this.props}/>
              </Well>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
